import React, { useEffect, useRef, useState, Component } from "react";
import { Picker, View, Text, TextInput, StyleSheet, Image } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Profiles from '../ImageDB.js';
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from 'firebase';

export default function MLToolScreen() {
  const [categories, showCategories] = useState(false);
  const [thankYou, showThankYou] = useState(false);
  const data = [
    {label: "Meat", value:"Meat"},
    {label:"Fruit", value:"Fruit"},
    {label:"Vegetable", value:"Vegetable"},
    {label:"Everyday, Food", value:"Everyday Food"},
    {label:"Everyday Item", value:"Everyday Item"},
    {label:"Nuts, Beans", value:"Nuts, Beans"},
    {label:"Seed", value:"Seeds"},
    {label:"Grains", value:"Grains"},
    {label:"Oils", value:"Oils"},
    {label:"Drink - Alcoholic", value:"Drink - Alcoholic"},
    {label:"Drink - NonAlcoholic", value:"Drink - NonAlcoholic"},
    {label:"Not Sure!", value:"Not Sure!"}
  ]
  const [newItem, addItem] = useState(null);

  //Global variable which holds all adjacent letters on a keybaord
  const keyboard = new Map([
    ['a', new Set(['q', 'w', 's', 'x', 'z'])], 
    ['b', new Set(['v', 'g', 'h', 'n'])], 
    ['c', new Set(['x', 'd', 'f', 'v'])], 
    ['d', new Set(['w', 'e', 'r', 'f', 'c', 'x', 's'])], 
    ['e', new Set(['w', 's', 'd', 'f', 'r'])], 
    ['f', new Set(['e', 'd', 'c', 'v', 'g', 't', 'r'])], 
    ['g', new Set(['r', 't', 'y', 'h', 'b', 'v', 'f'])], 
    ['h', new Set(['t', 'y', 'u', 'j', 'n', 'b', 'g'])], 
    ['i', new Set(['u', 'j', 'k', 'o'])], 
    ['j', new Set(['y', 'u', 'i', 'k', 'm', 'n', 'h'])], 
    ['k', new Set(['u', 'i', 'o', 'l', 'm', 'j'])], 
    ['l', new Set(['i', 'o', 'p', 'k'])], 
    ['m', new Set(['n', 'j', 'k'])], 
    ['n', new Set(['b', 'h', 'j', 'm'])], 
    ['o', new Set(['i', 'p', 'l', 'k'])], 
    ['p', new Set(['o', 'l'])], 
    ['q', new Set(['w', 's', 'a'])], 
    ['r', new Set(['t', 'g', 'f', 'd', 'e'])], 
    ['s', new Set(['e', 'd', 'x', 'z', 'a', 'w'])], 
    ['t', new Set(['y', 'h', 'g', 'f', 'r'])], 
    ['u', new Set(['y', 'i', 'j', 'h'])],
    ['v', new Set(['c', 'f', 'g', 'b'])],
    ['w', new Set(['q', 'e', 's', 'a'])],
    ['x', new Set(['z', 's', 'd', 'c'])],
    ['y', new Set(['u', 'j', 'h', 'g', 't'])],
    ['z', new Set(['a', 's', 'x'])]
  ]);

  const config = {
    apiKey: 'AIzaSyA0mAVUu-4GHPXCdBlqqVaky7ZloyfRARk',
    authDomain: 'siitch-6b176.firebaseapp.com',
    databaseURL: 'https://siitch-6b176.firebaseio.com',
    projectId: 'siitch-6b176',
    storageBucket: 'siitch-6b176.appspot.com',
    messagingSenderId: '282599031511',
    appId: '1:282599031511:web:bb4f5ca5c385550d8ee692',
    measurementId: 'G-13MVLQ6ZPF',
  };

  //Function to download a section of the current list and add the item to it
  function addEntry(item, category) {
    //Remove special characters and confirm the item isn't an empty string
    var cleanItem = item.replace(/[^\w\s]/gi, '').trim().toLowerCase(); //Remove Special Characters
    if (cleanItem.length == 0) return; 



    const freqMap = new Map();
    const sameItemThreshold = 4; //This is the threshold for how "different" a string can be before we consider it a different item
    
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    //Get the current "add later" list based on the first letter of the new item
    firebase
    .database()
    .ref('/Future Library/' + category)
    .once('value', data => { 
        const futureLibrary = data.val();
        let idx = 0;
        for (let frequency of futureLibrary) {
            //We already have this item
            for (let pastItem in frequency) {
                freqMap.set(frequency[pastItem], idx);
                if (editDistance(pastItem.toLowerCase(), cleanItem) <= sameItemThreshold) {
                    let freq = frequency[pastItem] + 1;
                    if (freqMap.has(freq)) {
                        futureLibrary[freqMap.get(freq)][`${pastItem}`] = freq;
                    } else {
                        futureLibrary.push({});
                        futureLibrary[futureLibrary.length-1][`${pastItem}`] = freq;
                    }
                    delete frequency[pastItem];
                    reUploadItems(futureLibrary, category);
                    return;
                }
            }
            idx += 1;
        }
        //We don't have this item yet, lets add it
        futureLibrary.push({});
        futureLibrary[futureLibrary.length-1][`${cleanItem}`] = 1;
        reUploadItems(futureLibrary, category);
    });
  }

  //This function sorts the new list based on occurrences and re-uploads it to the database
  function reUploadItems(updatedLibrary, category) {
    updatedLibrary[0]['Total'] += 1;

    //Sort based on frequencies
    updatedLibrary.sort(function (a, b) {
        return ( Object.values(b)[0] - Object.values(a)[0] );
    });
    
    //Upload updated list to firebase
    firebase.database().ref('/Future Library/' + category).set(updatedLibrary);
  }

  //DP Solution to solve the minimum edit distance between 2 strings in O(n*m) time complexity 
  function editDistance (word1, word2) {
    let n = word1.length;
    let m = word2.length;
    
    //Initialize 2D Array for Memoization
    const dp = new Array(n+1);
    for (let i=0; i<=n; ++i)
        dp[i] = new Array(m+1);
    
    //Initialize first col to dist if word2 was empty
    for (let i=0; i<=m; ++i)
        dp[0][i] = i;

    //Initialize first row to dist if word1 was empty    
    for (let j=0; j<=n; ++j)
        dp[j][0] = j;
    
    //Try all possible solutions, storing subproblem answers, to find ultimate minimum edit distance
    for (let i=1; i<=n; ++i) {
        for (let j=1; j<=m; ++j) {
            let adjSet = keyboard.get(word1.charAt(i-1));
            if (word1.charAt(i-1) == word2.charAt(j-1))
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = (adjSet.has(word2.charAt(j-1)) ? 1 : 3) + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
    }
    return dp[n][m];
  }




  const reset = () => {
    showThankYou(false);
  }

  return (
    <View style = {{marginTop: 200}}>
      <View style={styles.container}>
          <TextInput style={styles.input}
            placeholder="Enter item"
            maxLength={30}
            value = {newItem}
            onChangeText={addItem}
          />
          <View style={{alignContent: 'center', justifyContent:'center'}}>
            <TouchableOpacity style={styles.submit} onPress={ () => showCategories(true) }>
              <Image source={Profiles.arrow}/>
            </TouchableOpacity>
          </View>
      </View>
      {categories && 
        <View style={{justifyContent: 'center', alignItems:'center'}}>
          <Text style={{fontSize: 22}}> Select Category </Text>
           <Picker
            prompt="Select Category"
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => {showThankYou(true); showCategories(false); addEntry(newItem, itemValue); setTimeout(reset, 2000);}}>
            <Picker.Item label="Meat" value="Meat" />
            <Picker.Item label="Fruit" value="Fruit" />
            <Picker.Item label="Vegetable" value="Vegetable" />
            <Picker.Item label="Everyday Food" value="Everyday Food" />
            <Picker.Item label="Everyday Item" value="Everyday Item" />
            <Picker.Item label="Nuts, Beans" value="Nuts, Beans" />
            <Picker.Item label="Seed" value="Seeds" />
            <Picker.Item label="Grains" value="Grains" />
            <Picker.Item label="Oils" value="Oils" />
            <Picker.Item label="Drink - Alcoholic" value="Drink - Alcoholic" />
            <Picker.Item label="Drink - NonAlcoholic" value="Drink - NonAlcoholic" />
            <Picker.Item label="Not Sure!" value="Not Sure!" />
          </Picker>
        </View>
      }
      {thankYou && 
        <View style={styles.thankYouBG}>
          <Text style={styles.thankYou}> Thank You </Text>
        </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: '#00ADEF',
    flexDirection: 'row'
  },
  input: {
    marginLeft: 50,
    fontSize: 20,
    textAlign: 'center',
    flex:4
  },
  submit: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#00ADEF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3
  },
  thankYouBG: {
    justifyContent: 'center', 
    alignItems:'center', 
    backgroundColor: '#00ADEF', 
    borderRadius: 10,
    margin: 50,
    height: 50
  },
  thankYou: {
    fontSize: 22,
    color: 'white',
  }
});

const MLToolStack = createStackNavigator();

//Tab navigator from LandingPage.js leads us here.
//We need to decide what will be on this page.
export const mltoolScreen = () => (
    //Create a stack to store user's browse history
    <MLToolStack.Navigator>
      <MLToolStack.Screen
          name="Camera"
          //Here comes our tool
          component={MLToolScreen}
          //Set to true to see difference
          options={{headerShown: false}}
      />
    </MLToolStack.Navigator>
);