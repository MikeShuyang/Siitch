import React, { useEffect, useRef, useState, Component } from "react";
import { Picker, View, TextInput, StyleSheet, Image } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Profiles from '../ImageDB.js';
import { TouchableOpacity } from "react-native-gesture-handler";
//import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

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
  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);



  return (
    <View style = {{marginTop: 200}}>
      <View style={styles.container}>
          <TextInput style={styles.input}
            placeholder="Enter item"
            maxLength={30}
          />
          <View style={{alignContent: 'center', justifyContent:'center'}}>
            <TouchableOpacity style={styles.submit} onPress={ () => showCategories(true) }>
              <Image source={Profiles.arrow}/>
            </TouchableOpacity>
          </View>
      </View>
      {categories && 
        <View style = {styles.container1}>
           
         
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
  container1: {
    //margin: 50,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: 200,
    borderColor: '#00ADEF'
    //flexDirection: 'row'
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
/*
 <Picker style = {styles.container1}
            prompt="Select Category"
            //style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => console.log('hello')}>
            {label="Meat" value="Meat" />
            {label="Fruit" value="Fruit" />
            {label="Vegetable" value="Vegetable" />
            {label="Everyday Food" value="Everyday Food" />
            {label="Everyday Item" value="Everyday Item" />
            {label="Nuts, Beans" value="Nuts, Beans" />
            {label="Seed" value="Seeds" />
            {label="Grains" value="Grains" />
            {label="Oils" value="Oils" />
            {label="Drink - Alcoholic" value="Drink - Alcoholic" />
            {label="Drink - NonAlcoholic" value="Drink - NonAlcoholic" />
            {label="Not Sure!" value="Not Sure!" />
          </Picker>
*/