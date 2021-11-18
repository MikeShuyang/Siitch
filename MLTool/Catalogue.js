import { // Native components
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    TextInput,
    Animated
} from "react-native";
import {styles} from "../Search/Style";
import * as React from "react";
import {useEffect, useState, useRef} from "react";
// Firebase
import firebase from "firebase";
// Used to display category images
import Profiles from "../ImageDB";
// Used to display search result images
import ResultImage from "./ResultImage";
// Searchbar
import {Searchbar} from "react-native-paper";
// Category list style leveraged from Ranking
import {CategoryIcon} from "../Ranking/CategoryIcon";
// Dropdown picker to pick category
import DropDownPicker from 'react-native-dropdown-picker';

const DeviceWidth = Dimensions.get('window').width;



// Leveraged from Search
export default function Catalogue ({navigation}){
    // Used to get the searchbar input
    const [keyword, setKeyword] = useState('');
    // Used to set the searching status
    const [searching, setSearching] = useState(false)
    // Temp item array, can hold 0 or more rows of up to three items each
    const itemArr = [];
    // The final 3 * x dimension search result list to render and display, will be equal to itemArr
    const [item, setItem] = useState([]);

    //Enter Item from Ben's code
    const [categories, showCategories] = useState(false);
    const [thankYou, showThankYou] = useState(false);
    const [newItem, addItem] = useState(null);
    const [itemCategory, setCategory] = useState("");
    const [categoryChosen, showSubmit] = useState(false);
    const [disableSubmit, toggleSubmit] = useState(false);
    //Animation for thank you button fade out
    const fadeAnim = useRef(new Animated.Value(1)).current;
    function fadeOut() {
        // Will change fadeAnim value to 0 in 2 seconds
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000
        }).start();
    };

    const keyboard = new Map([
        ['a', new Set(['q', 'w', 's', 'x', 'z', ' '])],
        ['b', new Set(['v', 'g', 'h', 'n', ' '])],
        ['c', new Set(['x', 'd', 'f', 'v', ' '])],
        ['d', new Set(['w', 'e', 'r', 'f', 'c', 'x', 's', ' '])],
        ['e', new Set(['w', 's', 'd', 'f', 'r', ' '])],
        ['f', new Set(['e', 'd', 'c', 'v', 'g', 't', 'r', ' '])],
        ['g', new Set(['r', 't', 'y', 'h', 'b', 'v', 'f', ' '])],
        ['h', new Set(['t', 'y', 'u', 'j', 'n', 'b', 'g', ' '])],
        ['i', new Set(['u', 'j', 'k', 'o', ' '])],
        ['j', new Set(['y', 'u', 'i', 'k', 'm', 'n', 'h', ' '])],
        ['k', new Set(['u', 'i', 'o', 'l', 'm', 'j', ' '])],
        ['l', new Set(['i', 'o', 'p', 'k', ' '])],
        ['m', new Set(['n', 'j', 'k', ' '])],
        ['n', new Set(['b', 'h', 'j', 'm', ' '])],
        ['o', new Set(['i', 'p', 'l', 'k', ' '])],
        ['p', new Set(['o', 'l', ' '])],
        ['q', new Set(['w', 's', 'a', ' '])],
        ['r', new Set(['t', 'g', 'f', 'd', 'e', ' '])],
        ['s', new Set(['e', 'd', 'x', 'z', 'a', 'w', ' '])],
        ['t', new Set(['y', 'h', 'g', 'f', 'r', ' '])],
        ['u', new Set(['y', 'i', 'j', 'h', ' '])],
        ['v', new Set(['c', 'f', 'g', 'b', ' '])],
        ['w', new Set(['q', 'e', 's', 'a', ' '])],
        ['x', new Set(['z', 's', 'd', 'c', ' '])],
        ['y', new Set(['u', 'j', 'h', 'g', 't', ' '])],
        ['z', new Set(['a', 's', 'x', ' '])],
        [' ', new Set()]
    ]);
    const optionsData = [
        {label:"Meat", value:"Meat"},
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
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    // Function called when user input changes
    const toDatabase = () => {
        if (keyword === '') { // Search bar is blank
            setItem([]) // Clear item
            setSearching(false)
        } else {
            let input =
                keyword.charAt(0).toUpperCase() +
                keyword.slice(1, keyword.length).toLowerCase();
            readData(input);
        }
    };

    // Function called to search the database using user input and update the screen
    const readData = input => {
        firebase
            .database()
            .ref(input)
            .on('value', get =>(
                    // Self refresh and render results
                    navigation.navigate('Catalogue', {name: input, value: get.val()})
                ),
            );
    };

    useEffect(() => {
        toDatabase()
        let index = 0;
        let arr;
        for (const [key, value] of Object.entries(ResultImage)) {
            const keyUpp = key.toUpperCase();

            if (!keyUpp.includes(keyword.toUpperCase())) {
                continue;
            }
            // Start a new array when it has 3 items
            if (index % 3 === 0) {
                arr = [];
                itemArr.push(arr);
            }
            let dict = {};
            dict['image'] = value;
            dict['name'] = key;
            arr.push(dict);
            index++;
        }
        setItem(itemArr);
    }, [keyword]); // When user input changes, update

    //Function to download a section of the current list and add the item to it
    function addEntry(item, category) {
        //Remove special characters and confirm the item isn't an empty string
        var cleanItem = item.replace(/[^\w\s]/gi, '').trim().toLowerCase(); //Remove Special Characters
        if (cleanItem.length === 0) return;

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
                        if (pastItem !== 'Total') {
                            freqMap.set(frequency[pastItem], idx);
                        }
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
                if (freqMap.has(1)) {
                    futureLibrary[freqMap.get(1)][`${cleanItem}`] = 1;
                } else {
                    futureLibrary.push({});
                    futureLibrary[futureLibrary.length-1][`${cleanItem}`] = 1;
                }
                
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
                let adjSet = (keyboard.get(word1.charAt(i-1)) != null ? keyboard.get(word1.charAt(i-1)) : new Set());
                if (word1.charAt(i-1) === word2.charAt(j-1))
                    dp[i][j] = dp[i-1][j-1];
                else
                    dp[i][j] = (adjSet.has(word2.charAt(j-1)) ? 1 : 3) + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            }
        }
        return dp[n][m];
    }


    const reset = () => {
        showThankYou(false);
        showCategories(false);
        setCategory("");
        showSubmit(false);
        toggleSubmit(false);
        fadeAnim.setValue(1);
    }

    const prepareForSubmit = (category) => {
        setCategory(category);
        if (category.length > 0) showSubmit(true);
        else showSubmit(false);
    }



    return(
        <ScrollView
            style={{backgroundColor: '#FFFFFF'}}
            contentContainerStyle={{alignItems: 'center'}}>
            <Text style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 20,
                marginBottom: 5,
            }}>Search or explore categories below</Text>
            <Searchbar
                placeholder="Search"
                onChangeText={text => {
                    setSearching(true)
                    setKeyword(text)
                }}
                onIconPress={toDatabase}
                style={{
                    borderColor: '#80CAFF',
                    shadowOpacity: 0,
                    marginTop: 20,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 20,
                    width: DeviceWidth * 0.7,
                    textAlign: 'center',
                    fontSize: 20,
                }} value={undefined}/>

            <Text style={{fontSize: 15, marginTop: 30, marginBottom: 10, marginHorizontal: 20, textAlign: 'left'}}>
                Can’t find your item? Let us know what we’re missing so we can add it in the future to improve our database.
            </Text>

            <View style={this_styles.container}>
                <TextInput style={this_styles.input}
                           placeholder="Enter item"
                           placeholderTextColor = '#757575'
                           maxLength={30}
                           value = {newItem}
                           onChangeText={item => { addItem(item); showCategories(true);} }/>
            </View>


            {categories && newItem !== "" &&
            <View style={{justifyContent: 'center', alignItems:'center', zIndex: 10}}>
                {/*<Text style={{fontSize: 22}}> Select Category </Text>*/}
                <DropDownPicker
                    items={optionsData}
                    placeholder="Select Category"
                    defaultValue={itemCategory}
                    zIndex={100}
                    placeholderStyle={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'lightgray',
                    }}
                    itemStyle={{
                        textAlign: 'center',
                        fontSize: 20,
                    }}
                    labelStyle={{
                        textAlign: 'center',
                        fontSize: 20,
                    }}
                    containerStyle={{
                        height: 60,
                        borderRadius: 20,
                    }}
                    style={{
                        backgroundColor: 'white',
                        width: DeviceWidth * 0.7,
                        height: 50,
                        marginTop: 10,
                        borderWidth: 2,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        borderColor: '#80CAFF',
                    }}
                    dropDownStyle={{
                        backgroundColor: 'white',
                        width: DeviceWidth * 0.7,
                        marginTop: 10,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        borderWidth: 2,
                        borderColor: '#80CAFF',
                    }}
                    onChangeItem={(itemValue) => {prepareForSubmit(itemValue["value"])}}
                />
            </View>
            }
            {categoryChosen && newItem !== "" &&
                <Animated.View style={{alignContent: 'center', justifyContent:'center', flex: 1, opacity: fadeAnim}}>
                    <TouchableOpacity
                        style={!thankYou ? this_styles.submit : this_styles.thankYou}
                        disabled={disableSubmit}
                        onPress={() => {
                            showThankYou(true);
                            addEntry(newItem, itemCategory);
                            addItem(null);
                            toggleSubmit(true);
                            setTimeout(reset, 2000);
                            fadeOut();
                        }}>
                        {!thankYou && <Text style={this_styles.submitTxt}> All done? </Text>}
                        {thankYou && <Text style={this_styles.thankYouTxt}> Thank you! </Text>}
                    </TouchableOpacity>
                </Animated.View>

                /*   
                
                {categoryChosen && newItem !== "" &&
                <View style={{alignContent: 'center', justifyContent:'center'}}>
                    <TouchableOpacity
                        style={this_styles.submit}
                        onPress={ () => {
                            showThankYou(true);
                            showCategories(false);
                            addEntry(newItem, itemCategory);
                            addItem(null);
                            setTimeout(reset, 2000);
                        }}>
                        <Image style={{
                            width: 40,
                            height: 40,
                        }} source={Profiles.arrow}/>
                    </TouchableOpacity>
                </View>
                }
                
                <Image style={{
                            width: 40,
                            height: 40,
                        }} source={Profiles.arrow}/>
                        
                                    {thankYou &&
            <View style={this_styles.thankYouBG}>
                <Text style={this_styles.thankYou}> Thank You </Text>
            </View>
            }
                        
                        */
            }


            {/* If there is no user input in the search bar, show categories */}
            {!searching && (
                <View style={{flexDirection: 'row', flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center',}}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Meats')} >
                            <CategoryIcon category='Meats' image={Profiles.meats} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.push('Everyday Foods')} >
                            <CategoryIcon category='Everyday Foods' image={Profiles.everyday_food} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Seeds')} >
                            <CategoryIcon category='Seeds' image={Profiles.seeds} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Drinks-All')} >
                            <CategoryIcon category='Drinks-All' image={Profiles.drinks_all} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Fruits')} >
                            <CategoryIcon category='Fruits' image={Profiles.Apples} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Everyday Items')} >
                            <CategoryIcon category='Everyday items' image={Profiles.everyday_items} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Grains')} >
                            <CategoryIcon category='Grains' image={Profiles.grains}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Drinks-Alcoholic')} >
                            <CategoryIcon category='Drinks-Alcoholic' image={Profiles.alcoholic_drinks} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Vegetables')} >
                            <CategoryIcon category='Vegetables' image={Profiles.vegetables} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Nuts, Beans')} >
                            <CategoryIcon category='Nuts, Beans' image={Profiles.Peanuts} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Oils')} >
                            <CategoryIcon category='Oils' image={Profiles['Olive oil']} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Drinks-NonAlcoholic')} >
                            <CategoryIcon category='Drinks-NonAlcoholic' image={Profiles.non_alcoholic_drinks} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* If there is user input in the search bar, show results */}
            {searching && item.map((row, i) => (
                <View key={i} style={styles.avatarView}>
                    {row.map(url => (
                        <TouchableHighlight
                            key={url.name}
                            onPress={() => navigation.push('Detail', {itemName: url.name})}
                            activeOpacity={1}
                            underlayColor="transparent"
                            style={{marginLeft: 10}}>
                            <View style={styles.eachAvatar}>
                                <Image
                                    source={ResultImage[url.name]}
                                    style={{
                                        backgroundColor: 'white',
                                        width: 60,
                                        height: 60,
                                        marginBottom: 10,
                                        marginTop: 10,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text style={{width: 90, textAlign: 'center'}}>
                                    {url.name}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                </View>
            ))}
            <View style={{marginBottom: 40}} />
        </ScrollView>
    )
}

const this_styles = StyleSheet.create({
    container: {
        //margin: 30,
        borderWidth: 2,
        borderRadius: 20,
        height: 50,
        borderColor: '#80CAFF',
        flexDirection: 'row',
        marginTop: 20,
        width: DeviceWidth * 0.7,
        textAlign: 'center',
        fontSize: 20,
    },
    input: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        flex:4
    },
    submit: {
        height: 50,
        width: DeviceWidth*.4,
        borderRadius: 40,
        backgroundColor: '#8DC73F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    submitTxt: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500'
    },
    thankYou: {
        height: 50,
        width: DeviceWidth*.4,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#8DC73F',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    thankYouTxt: {
        color: '#8DC73F',
        fontSize: 17,
        fontWeight: '500'
    }
});
