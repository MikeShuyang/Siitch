import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Dimensions, Linking, TouchableHighlight, TouchableOpacity } from 'react-native';
import Counter from 'react-native-counters'
import { styles } from './Styles';
import firebase from 'firebase';
import { images } from '../ImageURL';
import {ImageIcon} from '../ImageIcon';
import Profiles from '../ImageDB.js';
const DeviceWidth = Dimensions.get('window').width;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { lessThan, onChange } from 'react-native-reanimated';
import { isLiteralExpression } from 'typescript';
import { globalAveragePooling1d } from '@tensorflow/tfjs-layers/dist/exports_layers';

let fetchedData = {};
let p1 = {};
let p2 = {};
let p3 = {};
let p4 = {};
let p5 = {};
let p6 = {};
let f1 = {};
let f2 = {};
let f3 = {};
let f4 = {};
let f5 = {};
let f6 = {};

export const comparePage = ({route}) => {
    const { prodarray } = route.params;
    const prod1 = prodarray[0];
    const prod2 = prodarray[1];
    const prod3 = prodarray[2];
    const prod4 = prodarray[3];
    const prod5 = prodarray[4];
    const prod6 = prodarray[5];


    const [fetched1, handleFetch1] = useState(false);
    const [fetched2, handleFetch2] = useState(false);
    const [fetched3, handleFetch3] = useState(false);
    const [fetched4, handleFetch4] = useState(false);
    const [fetched5, handleFetch5] = useState(false);
    const [fetched6, handleFetch6] = useState(false);

    const [currentprod1, changeprod1] = useState('');
    const [currentprod2, changeprod2] = useState('');
    const [currentprod3, changeprod3] = useState('');
    const [currentprod4, changeprod4] = useState('');
    const [currentprod5, changeprod5] = useState('');
    const [currentprod6, changeprod6] = useState('');

    const [isProduct3Present, setIsProduct3Present] = useState(false);
    const [isProduct4Present, setIsProduct4Present] = useState(false);
    const [isProduct5Present, setIsProduct5Present] = useState(false);
    const [isProduct6Present, setIsProduct6Present] = useState(false);

    const [unit, setUnit] = useState('G');

    const [prod1Total, changeProd1Total] = useState(1);
    const [prod2Total, changeProd2Total] = useState(1);
    const [prod3Total, changeProd3Total] = useState(1);
    const [prod4Total, changeProd4Total] = useState(1);
    const [prod5Total, changeProd5Total] = useState(1);
    const [prod6Total, changeProd6Total] = useState(1);

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

    const fetchData1 = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        firebase
            .database()
            .ref('/')
            .once('value', data => {
                fetchedData = data.val();
                for (var item in fetchedData) {
                    if(item === prod1) {
                        p1[item] = fetchedData[item];
                        f1 = p1[prod1]
                    }
                }
                handleFetch1(true);
            });
    }

    const fetchData2 = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        firebase
            .database()
            .ref('/')
            .once('value', data => {
                fetchedData = data.val();
                for (var item in fetchedData) {
                    if(item === prod2) {
                        p2[item] = fetchedData[item];
                        f2 = p2[prod2]
                    }
                }
                handleFetch2(true);
            });
    }

    const fetchData3 = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        firebase
            .database()
            .ref('/')
            .once('value', data => {
                fetchedData = data.val();
                for (var item in fetchedData) {
                    if(item === prod3) {
                        p3[item] = fetchedData[item];
                        f3 = p3[prod3]
                    }
                }
                handleFetch3(true);
            });
    }

    const fetchData4 = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        firebase
            .database()
            .ref('/')
            .once('value', data => {
                fetchedData = data.val();
                for (var item in fetchedData) {
                    if(item === prod4) {
                        p4[item] = fetchedData[item];
                        f4 = p4[prod4]
                    }
                }
                handleFetch4(true);
            });
    }

    const fetchData5 = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        firebase
            .database()
            .ref('/')
            .once('value', data => {
                fetchedData = data.val();
                for (var item in fetchedData) {
                    if(item === prod5) {
                        p5[item] = fetchedData[item];
                        f5 = p5[prod5]
                    }
                }
                handleFetch5(true);
            });
    }

    const fetchData6 = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        firebase
            .database()
            .ref('/')
            .once('value', data => {
                fetchedData = data.val();
                for (var item in fetchedData) {
                    if(item === prod6) {
                        p6[item] = fetchedData[item];
                        f6 = p6[prod6]
                    }
                }
                handleFetch6(true);
            });
    }

    if(!fetched1) {
        fetchData1();
    }

    if(prod1 !== currentprod1) {
        changeprod1(prod1);
        handleFetch1(false);
        p1 = {};
        f1 = {};
    }

    if(!fetched2) {
        fetchData2();
    }

    if(prod2 !== currentprod2) {
        changeprod2(prod2);
        handleFetch2(false);
        p2 = {};
        f2 = {};
    }

    if(prod3 && !fetched3) {
        fetchData3();
    }

    if(prod3 && prod3 !== currentprod3) {
        setIsProduct3Present(true)
        changeprod3(prod3);
        handleFetch3(false);
        p3 = {};
        f3 = {};
    }

    if(prod4 && !fetched4) {
        fetchData4();
    }

    if(prod4 && prod4 !== currentprod4) {
        setIsProduct4Present(true)
        changeprod4(prod4);
        handleFetch4(false);
        p4 = {};
        f4 = {};
    }

    if(prod5 && !fetched5) {
        fetchData5();
    }

    if(prod5 && prod5 !== currentprod5) {
        setIsProduct5Present(true)
        changeprod5(prod5);
        handleFetch5(false);
        p5 = {};
        f5 = {};
    }

    if(prod6 && !fetched6) {
        fetchData6();
    }

    if(prod6 && prod6 !== currentprod6) {
        setIsProduct6Present(true)
        changeprod6(prod6);
        handleFetch6(false);
        p6 = {};
        f6 = {};
    }

    const setMetric = (obj) => {
        if (obj){
            if (unit == 'G'){
                if (obj['Single item   Gal'] != ""){
                    return 'Single item   Gal'
                }
                else if (obj['Global Gallon p lb'] != ""){
                    return 'Global Gallon p lb'
                }
                else{
                    return 'Time to decompose'
                }
            }
            else if (unit == 'L'){
                if (obj['Single item   L'] != ""){
                    return 'Single item   L'
                }
                else if (obj['Global Liters p kg'] != ""){
                    return 'Global Liters p kg'
                }
                else{
                    return 'Time to decompose'
                }
            }
        }
    }

    const selectedcategory1 = setMetric(f1)
    const selectedcategory2 = setMetric(f2)
    const selectedcategory3 = setMetric(f3)
    const selectedcategory4 = setMetric(f4)
    const selectedcategory5 = setMetric(f5)
    const selectedcategory6 = setMetric(f6)

    const setMetricblue = () => {
        if (unit == 'G'){
            return 'Global Imperial Blue Gal p lb'
        }
        else if (unit == 'L'){
            return 'Global Blue L p kg'
        }
    }

    const setMetricgreen = () => {
        if (unit == 'G'){
            return 'Global Imperial Green Gal p lb'
        }
        else if (unit == 'L'){
            return 'Global Green L p kg'
        }
    }

    const setMetricgray = () => {
        if (unit == 'G'){
            return 'Global Imperial Gray Gal p lb'
        }
        else if (unit == 'L'){
            return 'Global Gray L p kg'
        }
    }



    const selectedcategoryblue = setMetricblue()
    const selectedcategorygreen = setMetricgreen()
    const selectedcategorygray = setMetricgray()

    const setMetricdisplay = () => {
        if (unit == 'G'){
            return 'Metric to display'
        }
        else if (unit == 'L'){
            return 'Metric to display L'
        }
    }

    const setMetricmeasurement = () => {
        if (unit == 'G'){
            return 'Measurement1'
        }
        else if (unit == 'L'){
            return 'Measurement L'
        }
    }

    const setMetricsize = () => {
        if (unit == 'G'){
            return 'Size'
        }
        else if (unit == 'L'){
            return 'Size L'
        }
    }

    const selectedmetrictodisplay= setMetricdisplay()
    const selectedmeasurement = setMetricmeasurement()
    const selectedsize = setMetricsize()

    const setMetrictext = () => {
        if (unit == 'G'){
            return 'The gallons of water used to make the items above, or (if applicable) the years it takes to decompose.'
        }
        else if (unit == 'L'){
            return 'The liters of water used to make the items above, or (if applicable) the years it takes to decompose.'
        }
    }

    const selectedtext = setMetrictext()

    const getMinValue = () => {
        let prod1Val = selectedcategory1.localeCompare('Time to decompose') != 0 ? parseInt(f1[selectedcategory1]*prod1Total) : Number.MAX_VALUE;
        let prod2Val = selectedcategory2.localeCompare('Time to decompose') != 0 ? parseInt(f2[selectedcategory2]*prod2Total) : Number.MAX_VALUE;
        let prod3Val = selectedcategory3.localeCompare('Time to decompose') != 0 ? parseInt(f3[selectedcategory3]*prod3Total) : Number.MAX_VALUE;
        let prod4Val = selectedcategory4.localeCompare('Time to decompose') != 0 ? parseInt(f4[selectedcategory4]*prod4Total) : Number.MAX_VALUE;
        let prod5Val = selectedcategory5.localeCompare('Time to decompose') != 0 ? parseInt(f5[selectedcategory5]*prod5Total) : Number.MAX_VALUE;
        let prod6Val = selectedcategory6.localeCompare('Time to decompose') != 0 ? parseInt(f6[selectedcategory6]*prod6Total) : Number.MAX_VALUE;

        if(prod3 && !prod4 && !prod5 && !prod6) {
            return Math.min(prod1Val, prod2Val, prod3Val);
        }
        else if (!prod3 && prod4 && !prod5 && !prod6) {
            return Math.min(prod1Val, prod2Val, prod4Val);
        }
        else if (!prod3 && !prod4 && prod5 && !prod6) {
            return Math.min(prod1Val, prod2Val, prod5Val);
        }
        else if (!prod3 && !prod4 && !prod5 && prod6) {
            return Math.min(prod1Val, prod2Val, prod6Val);
        }
        else if(prod3 && prod4 && !prod5 && !prod6) {
            return Math.min(prod1Val, prod2Val, prod3Val, prod4Val);
        }
        else if(prod3 && !prod4 && prod5 && !prod6) {
            return Math.min(prod1Val, prod2Val, prod3Val, prod5Val);
        }
        else if(prod3 && !prod4 && !prod5 && prod6) {
            return Math.min(prod1Val, prod2Val, prod3Val, prod6Val);
        }
        else if(!prod3 && prod4 && prod5 && !prod6) {
            return Math.min(prod1Val, prod2Val, prod4Val, prod5Val);
        }
        else if(!prod3 && prod4 && !prod5 && prod6) {
            return Math.min(prod1Val, prod2Val, prod4Val, prod6Val);
        }
        else if(!prod3 && !prod4 && prod5 && prod6) {
            return Math.min(prod1Val, prod2Val, prod5Val, prod6Val);
        }
        else if(prod3 && prod4 && prod5 && !prod6) {
            return Math.min(prod1Val, prod2Val, prod3Val, prod4Val, prod5Val);
        }
        else if(prod3 && !prod4 && prod5 && prod6) {
            return Math.min(prod1Val, prod2Val, prod3Val, prod5Val, prod6Val);
        }
        else if(prod3 && prod4 && !prod5 && prod6) {
            return Math.min(prod1Val, prod2Val, prod3Val, prod4Val, prod6Val);
        }
        else if(!prod3 && prod4 && prod5 && prod6) {
            return Math.min(prod1Val, prod2Val, prod4Val, prod5Val, prod6Val);
        }
        else if(prod3 && prod4 && prod5 && prod6) {
            console.log("-------")
            console.log(prod1Val)
            console.log(prod2Val)
            console.log(prod3Val)
            console.log(prod4Val)
            console.log(prod5Val)
            console.log(prod6Val)
            return Math.min(prod1Val, prod2Val, prod3Val, prod4Val, prod5Val, prod6Val);
        }
        return Math.min(prod1Val, prod2Val);
    }

    const numberWithCommas = (x) => {
        if(isNaN(x)){
            return "NA"
        }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <ScrollView style={{backgroundColor:'white'}}>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', width: DeviceWidth*.9, marginTop: '3%'}}>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: '5%',
                            marginLeft: 20,
                            borderColor: '#00ADEF',
                            borderWidth: 2,
                            borderRadius: 10,
                            width: 65,
                            paddingLeft: 10,
                            paddingRight: 10,
                            height: 40
                        }}>
                            <TouchableOpacity onPress={() => {handleFetch1(false);handleFetch2(false);handleFetch3(false);handleFetch4(false);handleFetch5(false);handleFetch6(true); setUnit('G');}} >
                                <Text style={{ color: unit === 'G' ? '#00ADEF' : 'black', paddingTop: 5, fontSize: 20, fontWeight: unit === 'G' ? 'bold' : 'normal' }}>G</Text>
                            </TouchableOpacity>
                            <Text style={{ paddingTop: 5, fontSize: 20 }}> / </Text>
                            <TouchableOpacity onPress={() => {handleFetch1(false);handleFetch2(false);handleFetch3(false);handleFetch4(false);handleFetch5(false);handleFetch6(true); setUnit('L'); }}>
                                <Text style={{ color: unit === 'L' ? '#00ADEF' : 'black', paddingTop: 5, fontSize: 20, fontWeight: unit === 'L' ? 'bold' : 'normal' }}>L</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Total Gallons Component */}
                        <View style = {{
                            flexDirection: 'row',
                            marginTop: '5%',
                            justifyContent: 'flex-end',
                            width: DeviceWidth*.9-65
                        }}>
                            <Image style={{width: 20, height: 20, marginTop: '3%'}} source={Profiles.water}/>
                            <Text style={{fontSize: 25, marginTop: '1%'}}> Total: {
                                ((selectedcategory1.localeCompare('Time to decompose') != 0 && parseInt(f1[selectedcategory1])*prod1Total) +
                                (selectedcategory2.localeCompare('Time to decompose') != 0 && parseInt(f2[selectedcategory2])*prod2Total) +
                                ((selectedcategory3.localeCompare('Time to decompose') != 0 && isProduct3Present) ? parseInt(f3[selectedcategory3])*prod3Total : 0) +
                                ((selectedcategory4.localeCompare('Time to decompose') != 0 && isProduct4Present) ? parseInt(f4[selectedcategory4])*prod4Total : 0) +
                                ((selectedcategory5.localeCompare('Time to decompose') != 0 && isProduct5Present) ? parseInt(f5[selectedcategory5])*prod5Total : 0) +
                                ((selectedcategory6.localeCompare('Time to decompose') != 0 && isProduct6Present) ? parseInt(f6[selectedcategory6])*prod6Total : 0))
                                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                                {unit == 'G' ? ' gal.' : ' li.'} </Text>
                        </View>
                    </View>
                    {/* <View style={{flexDirection:'column',alignItems:'center',marginTop:'5%', marginBottom: '5%', width: DeviceWidth*0.7}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}> {prod1} </Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>vs. {prod2}</Text>
          {
            isProduct3Present &&
            <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>vs. {prod3}</Text>
            </View>
          }
          {
            isProduct4Present &&
            <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>vs. {prod4}</Text>
            </View>
          }
          {
            isProduct5Present &&
            <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>vs. {prod5}</Text>
            </View>
          }
          {
            isProduct6Present &&
            <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>vs. {prod6}</Text>
            </View>
          }
        </View> */}
                    <View style={{
                        flexDirection: 'row',
                        marginTop: '0%',
                        marginRight: 20,
                        //borderColor: '#80CAFF',
                        //borderWidth: 1,
                        //borderRadius: 20,
                        width: DeviceWidth*0.20,
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 20,
                        height: 60
                    }}>
                    </View>
                </View>
                <View style={{flex: 6,flexDirection:'column',alignItems:'center', marginBottom:0, paddingLeft: 10, paddingRight: 10}}>
                    <View style={{flex:2, flexDirection:'row',justifyContent:'space-between'}}>
                        <View center style={getTextStyle(parseInt(f1[selectedcategory1]*prod1Total), getMinValue())}>

                            {(selectedcategory1.localeCompare('Time to decompose') != 0  &&
                                <View style={styles.counterView}>
                                    <Counter
                                        buttonStyle={{ borderWidth: 0 }}
                                        buttonTextStyle={{ color: '#0e0f0f', fontSize: 25, fontWeight: '500'}}
                                        countTextStyle={{ color: '#0e0f0f', fontSize: 21}} start={1}  onChange={(len, type) => {
                                        changeProd1Total(prod1Total + (type == "+" ? 1 : -1));
                                        /* These firebase calls reset the Future Library by pressing + on the item1 counter in the compare tool*/
                                        /*
                                        firebase.database().ref(`/Future Library/Meat`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Fruit`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Vegetable`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Everyday Food`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Everyday Item`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Nuts, Beans`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Seeds`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Grains`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Oils`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Drink - Alcoholic`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Drink - NonAlcoholic`).set([{"Total" : 0}]);
                                        firebase.database().ref(`/Future Library/Not Sure!`).set([{"Total" : 0}]);
                                        */
                                    }}/>
                                </View>) ||  <Text style={{marginBottom: 23}}>  </Text>}

                            <Image source = {Profiles[prod1]}
                                   style = {{width: 180, height: 180, alignItems:'center'}}
                                   resizeMode="contain"/>
                            <Text style={styles.boldTextFormatCompare}>{prod1}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                {<Image
                                    style={selectedcategory1.localeCompare('Time to decompose') != 0 && {width: 20, height: 20, marginTop: '3%'} || {width: 28, height: 28, marginTop: '1%'}}
                                    source={selectedcategory1.localeCompare('Time to decompose') != 0 && Profiles.water || Profiles.clock}
                                /> }
                                <Text style={selectedcategory1.localeCompare('Time to decompose') != 0 && styles.boldTextFormatBlueCompare || styles.boldTextFormatRedCompare}>{numberWithCommas(parseInt(f1[selectedcategory1])*prod1Total)} {f1[selectedmetrictodisplay]}</Text>
                            </View>
                            <Text style={styles.textFormatCompare}>{prod1Total == 1 ? f1[selectedmeasurement] : "total"}</Text>
                            <Text style={styles.textFormatCompare}>{f1[selectedsize]}</Text>
                        </View>
                        <View center style={getTextStyle(parseInt(f2[selectedcategory2]*prod2Total), getMinValue())}>

                            {(selectedcategory2.localeCompare('Time to decompose') != 0  &&
                                <View style={styles.counterView}>
                                    <Counter
                                        buttonStyle={{ borderWidth: 0 }}
                                        buttonTextStyle={{ color: '#0e0f0f', fontSize: 25, fontWeight: '500'}}
                                        countTextStyle={{ color: '#0e0f0f', fontSize: 21}} start={1}  onChange={(len, type) => {
                                        changeProd2Total(prod2Total + (type == "+" ? 1 : -1))
                                    }}/>
                                </View>) ||  <Text style={{marginBottom: 23}}>  </Text>}
                            <Image source = {Profiles[prod2]}
                                   style = {{width: 180, height: 180, alignItems:'center'}}
                                   resizeMode="contain"/>
                            <Text style={styles.boldTextFormatCompare}>{prod2}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                {<Image
                                    style={selectedcategory2.localeCompare('Time to decompose') != 0 && {width: 20, height: 20, marginTop: '3%'} || {width: 28, height: 28, marginTop: '1%'}}
                                    source={selectedcategory2.localeCompare('Time to decompose') != 0 && Profiles.water || Profiles.clock}
                                /> }
                                <Text style={selectedcategory2.localeCompare('Time to decompose') != 0 && styles.boldTextFormatBlueCompare || styles.boldTextFormatRedCompare}>{numberWithCommas(parseInt(f2[selectedcategory2])*prod2Total)} {f2[selectedmetrictodisplay]}</Text>
                            </View>
                            <Text style={styles.textFormatCompare}>{prod2Total == 1 ? f2[selectedmeasurement] : "total"}</Text>
                            <Text style={styles.textFormatCompare}>{f2[selectedsize]}</Text>
                        </View>
                    </View>
                    {
                        (isProduct3Present || isProduct4Present) &&
                        <View  style={{flex: 2, flexDirection:'row',justifyContent:'space-between'}}>
                            {
                                isProduct3Present &&
                                <View center style={getTextStyle(parseInt(f3[selectedcategory3]*prod3Total), getMinValue())}>
                                    {(selectedcategory3.localeCompare('Time to decompose') != 0  &&
                                        <View style={styles.counterView}>
                                            <Counter
                                                buttonStyle={{ borderWidth: 0 }}
                                                buttonTextStyle={{ color: '#0e0f0f', fontSize: 25, fontWeight: '500'}}
                                                countTextStyle={{ color: '#0e0f0f', fontSize: 21}}
                                                start={1}  onChange={(len, type) => {
                                                changeProd3Total(prod3Total + (type == "+" ? 1 : -1))
                                            }}/>
                                        </View>) ||  <Text style={{marginBottom: 23}}>  </Text>}
                                    <Image source = {Profiles[prod3]}
                                           style = {{width: 180, height: 180, alignItems:'center'}}
                                           resizeMode="contain"/>
                                    <Text style={styles.boldTextFormatCompare}>{prod3}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        {<Image
                                            style={selectedcategory3.localeCompare('Time to decompose') != 0 && {width: 20, height: 20, marginTop: '3%'} || {width: 28, height: 28, marginTop: '1%'}}
                                            source={selectedcategory3.localeCompare('Time to decompose') != 0 && Profiles.water || Profiles.clock}
                                        /> }
                                        <Text style={selectedcategory3.localeCompare('Time to decompose') != 0 && styles.boldTextFormatBlueCompare || styles.boldTextFormatRedCompare}>{numberWithCommas(parseInt(f3[selectedcategory3])*prod3Total)} {f3[selectedmetrictodisplay]}</Text>
                                    </View>
                                    <Text style={styles.textFormatCompare}>{prod3Total == 1 ? f3[selectedmeasurement] : "total"}</Text>
                                    <Text style={styles.textFormatCompare}>{f3[selectedsize]}</Text>
                                </View>
                            }
                            {
                                isProduct4Present &&
                                <View center style={getTextStyle(parseInt(f4[selectedcategory4]*prod4Total), getMinValue())}>

                                    {(selectedcategory4.localeCompare('Time to decompose') != 0  &&
                                        <View style={styles.counterView}>
                                            <Counter
                                                buttonStyle={{ borderWidth: 0 }}
                                                buttonTextStyle={{ color: '#0e0f0f', fontSize: 25, fontWeight: '500'}}
                                                countTextStyle={{ color: '#0e0f0f', fontSize: 21}}
                                                start={1}  onChange={(len, type) => {
                                                changeProd4Total(prod4Total + (type == "+" ? 1 : -1))
                                            }}/>
                                        </View>) ||  <Text style={{marginBottom: 23}}>  </Text>}

                                    <Image source = {Profiles[prod4]}
                                           style = {{width: 180, height: 180, alignItems:'center'}}
                                           resizeMode="contain"/>
                                    <Text style={styles.boldTextFormatCompare}>{prod4}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        {<Image
                                            style={selectedcategory4.localeCompare('Time to decompose') != 0 && {width: 20, height: 20, marginTop: '3%'} || {width: 28, height: 28, marginTop: '1%'}}
                                            source={selectedcategory4.localeCompare('Time to decompose') != 0 && Profiles.water || Profiles.clock}
                                        /> }
                                        <Text style={selectedcategory4.localeCompare('Time to decompose') != 0 && styles.boldTextFormatBlueCompare || styles.boldTextFormatRedCompare}>{numberWithCommas(parseInt(f4[selectedcategory4])*prod4Total)} {f4[selectedmetrictodisplay]}</Text>
                                    </View>
                                    <Text style={styles.textFormatCompare}>{prod4Total == 1 ? f4[selectedmeasurement] : "total"}</Text>
                                    <Text style={styles.textFormatCompare}>{f4[selectedsize]}</Text>
                                </View>
                            }
                        </View>
                    }
                    {
                        (isProduct5Present || isProduct6Present) &&
                        <View  style={{flex: 2, flexDirection:'row',justifyContent:'space-between'}}>
                            {
                                isProduct5Present &&
                                <View center style={getTextStyle(parseInt(f5[selectedcategory5]*prod5Total), getMinValue())}>
                                    {(selectedcategory5.localeCompare('Time to decompose') != 0  &&
                                        <View style={styles.counterView}>
                                            <Counter
                                                buttonStyle={{ borderWidth: 0 }}
                                                buttonTextStyle={{ color: '#0e0f0f', fontSize: 25, fontWeight: '500'}}
                                                countTextStyle={{ color: '#0e0f0f', fontSize: 21}}
                                                start={1}  onChange={(len, type) => {
                                                changeProd5Total(prod5Total + (type == "+" ? 1 : -1))
                                            }}/>
                                        </View>) ||  <Text style={{marginBottom: 23}}>  </Text>}
                                    <Image source = {Profiles[prod5]}
                                           style = {{width: 180, height: 180, alignItems:'center'}}
                                           resizeMode="contain"/>
                                    <Text style={styles.boldTextFormatCompare}>{prod5}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        {<Image
                                            style={selectedcategory5.localeCompare('Time to decompose') != 0 && {width: 20, height: 20, marginTop: '3%'} || {width: 28, height: 28, marginTop: '1%'}}
                                            source={selectedcategory5.localeCompare('Time to decompose') != 0 && Profiles.water || Profiles.clock}
                                        /> }
                                        <Text style={selectedcategory5.localeCompare('Time to decompose') != 0 && styles.boldTextFormatBlueCompare || styles.boldTextFormatRedCompare}>{numberWithCommas(parseInt(f5[selectedcategory5])*prod5Total)} {f6[selectedmetrictodisplay]}</Text>
                                    </View>
                                    <Text style={styles.textFormatCompare}>{prod5Total == 1 ? f5[selectedmeasurement] : "total"}</Text>
                                    <Text style={styles.textFormatCompare}>{f5[selectedsize]}</Text>
                                </View>
                            }
                            {
                                isProduct6Present &&
                                <View center style={getTextStyle(parseInt(f6[selectedcategory6]*prod6Total), getMinValue())}>

                                    {(selectedcategory6.localeCompare('Time to decompose') != 0  &&
                                        <View style={styles.counterView}>
                                            <Counter
                                                buttonStyle={{ borderWidth: 0 }}
                                                buttonTextStyle={{ color: '#0e0f0f', fontSize: 25, fontWeight: '500'}}
                                                countTextStyle={{ color: '#0e0f0f', fontSize: 21}}
                                                start={1}  onChange={(len, type) => {
                                                changeProd6Total(prod6Total + (type == "+" ? 1 : -1))
                                            }}/>
                                        </View>) ||  <Text style={{marginBottom: 23}}>  </Text>}

                                    <Image source = {Profiles[prod6]}
                                           style = {{width: 180, height: 180, alignItems:'center'}}
                                           resizeMode="contain"/>
                                    <Text style={styles.boldTextFormatCompare}>{prod6}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        {<Image
                                            style={selectedcategory6.localeCompare('Time to decompose') != 0 && {width: 20, height: 20, marginTop: '3%'} || {width: 28, height: 28, marginTop: '1%'}}
                                            source={selectedcategory6.localeCompare('Time to decompose') != 0 && Profiles.water || Profiles.clock}
                                        /> }
                                        <Text style={selectedcategory6.localeCompare('Time to decompose') != 0 && styles.boldTextFormatBlueCompare || styles.boldTextFormatRedCompare}>{numberWithCommas(parseInt(f6[selectedcategory6])*prod6Total)} {f6[selectedmetrictodisplay]}</Text>
                                    </View>
                                    <Text style={styles.textFormatCompare}>{prod6Total == 1 ? f6[selectedmeasurement] : "total"}</Text>
                                    <Text style={styles.textFormatCompare}>{f6[selectedsize]}</Text>
                                </View>
                            }
                        </View>
                    }
                </View>
            </View>



            <View style={{marginTop: 0, alignItems: 'center', marginBottom:'10%'}}>
                {
                    (f1['Notes to appear'] != "" )&&
                    <View style={{width: DeviceWidth/1.2}}>
                        <Text style={{fontSize:18, textAlign: 'left'}}>{f1['Notes to appear']}</Text>
                    </View>
                }

                {
                    (f2['Notes to appear'] != "" )&&
                    <View style={{width: DeviceWidth/1.2}}>
                        <Text style={{fontSize: 18, textAlign: 'left'}}>{f2['Notes to appear']}</Text>
                    </View>
                }

                {
                    (isProduct3Present && f3['Notes to appear'] != "") &&
                    <View style={{width: DeviceWidth/1.2}}>
                        <Text style={{fontSize:18, textAlign: 'left'}}>{f3['Notes to appear']}</Text>
                    </View>
                }
                {
                    (isProduct4Present && f4['Notes to appear'] != "") &&
                    <View style={{width: DeviceWidth/1.2}}>
                        <Text style={{fontSize:18, textAlign: 'left'}}>{f4['Notes to appear']}</Text>
                    </View>
                }
                {
                    (isProduct5Present && f5['Notes to appear'] != "") &&
                    <View style={{width: DeviceWidth/1.2}}>
                        <Text style={{fontSize:18, textAlign: 'left'}}>{f5['Notes to appear']}</Text>
                    </View>
                }
                {
                    (isProduct6Present && f6['Notes to appear'] != "") &&
                    <View style={{width: DeviceWidth/1.2}}>
                        <Text style={{fontSize:18, textAlign: 'left'}}>{f6['Notes to appear']}</Text>
                    </View>
                }
                <Collapse style={{ marginTop: '5%', width: DeviceWidth/1.2}}>
                    <CollapseHeader style={{alignItems:'center',padding:10,backgroundColor:'#FFD359', width: DeviceWidth / 1.2,borderColor: '#FFD359', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize: 20}}>Breakdown</Text>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{padding: 10, borderColor: '#FFD359',borderWidth: 2, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <View>
                            <Text>{selectedtext}</Text>

                            <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between", marginTop:'5%'}}>
                                <View style={{width:DeviceWidth/6}}><Text></Text></View>
                                <View style={{width:DeviceWidth/6}}>
                                    <Image
                                        source = {Profiles['green water']}
                                        style = {{width: 15, height: 15,alignItems:'center'}}
                                        resizeMode="contain"/>
                                </View>
                                <View style={{width:DeviceWidth/6}}>
                                    <Image
                                        source = {Profiles['blue water']}
                                        style = {{width: 15, height: 15,alignItems:'center'}}
                                        resizeMode="contain"/>
                                </View>
                                <View style={{width:DeviceWidth/6}}>
                                    <Image
                                        source = {Profiles['gray water']}
                                        style = {{width: 15, height: 15,alignItems:'center'}}
                                        resizeMode="contain"/>
                                </View>
                                <View style={{width:DeviceWidth/6}}><Text style={{fontWeight:'bold'}}>Total</Text></View>
                            </View>
                            <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
                                <View style={{width:DeviceWidth/6}}><Text>{prod1}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f1[selectedcategorygreen]))}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f1[selectedcategoryblue]))}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f1[selectedcategorygray]))}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text style={{fontWeight:'bold'}}>{numberWithCommas(parseInt(f1[selectedcategory1]))}</Text></View>
                            </View>
                            <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
                                <View style={{width:DeviceWidth/6}}><Text>{prod2}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f2[selectedcategorygreen]))}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f2[selectedcategoryblue]))}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f2[selectedcategorygray]))}</Text></View>
                                <View style={{width:DeviceWidth/6}}><Text style={{fontWeight:'bold'}}>{numberWithCommas(parseInt(f2[selectedcategory2]))}</Text></View>
                            </View>
                            {
                                isProduct3Present &&
                                <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
                                    <View style={{width:DeviceWidth/6}}><Text>{prod3}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f3[selectedcategorygreen]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f3[selectedcategoryblue]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f3[selectedcategorygray]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text style={{fontWeight:'bold'}}>{numberWithCommas(parseInt(f3[selectedcategory3]))}</Text></View>
                                </View>
                            }
                            {
                                isProduct4Present &&
                                <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
                                    <View style={{width:DeviceWidth/6}}><Text>{prod4}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f4[selectedcategorygreen]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f4[selectedcategoryblue]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f4[selectedcategorygray]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text style={{fontWeight:'bold'}}>{numberWithCommas(parseInt(f4[selectedcategory4]))}</Text></View>
                                </View>
                            }
                            {
                                isProduct5Present &&
                                <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
                                    <View style={{width:DeviceWidth/6}}><Text>{prod5}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f5[selectedcategorygreen]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f5[selectedcategoryblue]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f5[selectedcategorygray]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text style={{fontWeight:'bold'}}>{numberWithCommas(parseInt(f5[selectedcategory5]))}</Text></View>
                                </View>
                            }
                            {
                                isProduct6Present &&
                                <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
                                    <View style={{width:DeviceWidth/6}}><Text>{prod6}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f6[selectedcategorygreen]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f6[selectedcategoryblue]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text>{numberWithCommas(parseInt(f6[selectedcategorygray]))}</Text></View>
                                    <View style={{width:DeviceWidth/6}}><Text style={{fontWeight:'bold'}}>{numberWithCommas(parseInt(f6[selectedcategory6]))}</Text></View>
                                </View>
                            }
                        </View>
                    </CollapseBody>
                </Collapse>

                <Collapse style={{ borderColor:'#70BF41', marginTop: '2%',width: DeviceWidth/1.2}}>
                    <CollapseHeader style={{alignItems:'center',padding:10,backgroundColor:'#70BF41', width: DeviceWidth / 1.2,borderColor: '#70BF41', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize: 20}}>Rain</Text>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{padding: 10, borderColor: '#70BF41',borderWidth: 2, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <View>
                            <Text style={{fontWeight:'bold'}}>Rain water (Green water): </Text>
                            <Text>The amount of rainwater required to make an item</Text>
                        </View>
                    </CollapseBody>
                </Collapse>

                <Collapse style={{ borderColor:'#00ADEF', marginTop: '2%', width: DeviceWidth/1.2}}>
                    <CollapseHeader style={{alignItems:'center',padding:10,backgroundColor:'#00ADEF', width: DeviceWidth / 1.2,borderColor: '#00ADEF', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize: 20}}>Irrigation</Text>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{padding: 10, borderColor: '#00ADEF',borderWidth: 2, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <View>
                            <Text style={{fontWeight:'bold'}}>Irrigated water (Blue water): </Text>
                            <Text>The amount of surface water and groundwater required to produce an item</Text>
                        </View>
                    </CollapseBody>
                </Collapse>

                <Collapse style={{ borderColor:'#C2C2C2', marginTop: '2%', width: DeviceWidth/1.2}}>
                    <CollapseHeader style={{alignItems:'center',padding:10,backgroundColor:'#C2C2C2', width: DeviceWidth / 1.2,borderColor: '#C2C2C2', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize: 20}}>Cleaning</Text>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{padding: 10, borderColor: '#C2C2C2',borderWidth: 2, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <View>
                            <Text style={{fontWeight:'bold'}}>Cleaning water (Gray water): </Text>
                            <Text>The amount of freshwater required to dilute the wastewater generated in manufacturing, in order to maintain water quality, as determined by state and local standards </Text>
                            <Text style={{textAlign: 'left', marginTop: '3%'}}>Definitions: <Text onPress={() => Linking.openURL('https://www.watercalculator.org')} style={{color: '#00ADEF'}}>www.watercalculator.org</Text></Text>
                        </View>
                    </CollapseBody>
                </Collapse>
            </View>
        </ScrollView>
    );
}


function getTextStyle(val1, val2) {
    console.log(val1, val2)
    if(val1 === val2) {
        return {
            flex: 1,
            borderColor: '#6dbd64',
            borderRadius: 40,
            borderWidth: 5,
            width: DeviceWidth*0.3,
            height: DeviceWidth*0.85,
            alignItems:'center',
            transform: [{scale: 0.8}],
            justifyContent: 'center'
        }
    } else {
        return {
            flex: 1,
            width: DeviceWidth*0.3,
            height: DeviceWidth*0.85,
            alignItems:'center',
            transform: [{scale: 0.8}],
            justifyContent: 'center'
        }
    }
}


export default comparePage;
