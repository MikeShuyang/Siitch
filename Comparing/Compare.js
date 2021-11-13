import 'react-native-gesture-handler';
import firebase from 'firebase';
import {useState, useEffect} from 'react';
import * as React from 'react';
import {Searchbar, Avatar} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {styles} from './Styles';
import {createStackNavigator} from '@react-navigation/stack';
import {comparePage} from './ComparePage';
import {Dimensions} from 'react-native';
import {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Counter from "react-native-counters";


const {width, height} = Dimensions.get('screen');

import {
    Alert,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Button,
    StatusBar,
    Linking,
    TextInput,
    Pressable,
    TouchableHighlight,
} from 'react-native';

import RNPicker from 'rn-modal-picker';
import {color} from 'react-native-reanimated';
import Profiles from '../ImageDB';

function getdata() {
    itemsList = [];
    config = {
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
    firebase
        .database()
        .ref('/')
        .once('value', data => {
            fetchedData = data.val();
            for (var item in fetchedData) {
                if (item == 'Future Library') continue;
                this.itemsList.push({
                    name: item,
                });
            }
        });
        
        
        //delete this.itemsList.libKey;
}

export default class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeHolderText: '',
            selectedText: '',
            product1: '',
            product2: '',
            product3: '',
            product4: '',
            product5: '',
            product6: '',
            productarray: [],
            isProduct3: false,
            isProduct4: false,
            isProduct5: false,
            isProduct6: false,
        };
        getdata();
    }
    _setProduct1(item) {
        this.setState({product1: item});
    }

    _setProduct2(item) {
        this.setState({product2: item});
    }

    _setProduct3(item) {
        this.setState({product3: item});
    }

    _setProduct4(item) {
        this.setState({product4: item});
    }

    _setProduct5(item) {
        this.setState({product5: item});
    }

    _setProduct6(item) {
        this.setState({product6: item});
    }

    _addProduct(boolValue) {
        if (!this.state.isProduct3) {
            this.setState({isProduct3: boolValue});
        } else if (!this.state.isProduct4) {
            this.setState({isProduct4: boolValue});
        } else if (!this.state.isProduct5) {
            this.setState({isProduct5: boolValue});
        } else {
            this.setState({isProduct6: boolValue});
        }
    }

    _deleteProduct3() {
        this.setState({product3: ''});
        this.setState({isProduct3: false});
    }

    _deleteProduct4() {
        this.setState({product4: ''});
        this.setState({isProduct4: false});
    }

    _deleteProduct5() {
        this.setState({product5: ''});
        this.setState({isProduct5: false});
    }

    _deleteProduct6() {
        this.setState({product6: ''});
        this.setState({isProduct6: false});
    }

    checkEmpty() {
        return (
            this.state.product1 == "" ||
            this.state.product2 == "" ||
            (this.state.isProduct3 && this.state.product3 == "" ) ||
            (this.state.isProduct4 && this.state.product4 == "" ) ||
            (this.state.isProduct5 && this.state.product5 == "" ) ||
            (this.state.isProduct6 && this.state.product6 == "" )
        );
    }

    makearray(productarr){
        resarray = []
        for (item in productarr){
            if (productarr[item] != ""){
                resarray.push(productarr[item])
            }
        }
        return resarray
    }

    checkDuplicates() {
        return (
            this.state.product1 == this.state.product2 ||
            (this.state.isProduct3 && this.state.product1 == this.state.product3) ||
            (this.state.isProduct4 && this.state.product1 == this.state.product4) ||
            (this.state.isProduct5 && this.state.product1 == this.state.product5) ||
            (this.state.isProduct6 && this.state.product1 == this.state.product6) ||
            (this.state.isProduct3 && this.state.product2 == this.state.product3) ||
            (this.state.isProduct4 && this.state.product2 == this.state.product4) ||
            (this.state.isProduct5 && this.state.product2 == this.state.product5) ||
            (this.state.isProduct6 && this.state.product2 == this.state.product6) ||
            (this.state.isProduct3 &&
                this.state.isProduct4 &&
                this.state.product3 == this.state.product4) ||
            (this.state.isProduct3 &&
                this.state.isProduct5 &&
                this.state.product3 == this.state.product5) ||
            (this.state.isProduct3 &&
                this.state.isProduct6 &&
                this.state.product3 == this.state.product6) ||
            (this.state.isProduct4 &&
                this.state.isProduct5 &&
                this.state.product4 == this.state.product5) ||
            (this.state.isProduct4 &&
                this.state.isProduct6 &&
                this.state.product4 == this.state.product6) ||
            (this.state.isProduct5 &&
                this.state.isProduct6 &&
                this.state.product5 == this.state.product6)
        );
    }

    render() {
        return (
            <View style={styles.rankingPage}>
                <ScrollView>
                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: '25%',
                            marginBottom: '15%',
                        }}>
                        <Text style={styles.title}>Compare</Text>
                        <Text
                            style={styles.selectItemText}>
                            Select Item 1
                        </Text>
                        <View style={styles.container}>
                            <View
                                style={{
                                    width: 200,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                }}>
                                <RNPicker
                                    dataSource={itemsList}
                                    dummyDataSource={itemsList}
                                    defaultValue={false}
                                    pickerTitle={'Search Items'}
                                    showSearchBar={true}
                                    disablePicker={false}
                                    changeAnimation={'fade'}
                                    searchBarPlaceHolder={'Search.....'}
                                    showPickerTitle={true}
                                    searchBarContainerStyle={styles.searchBarContainerStyle}
                                    pickerStyle={styles.pickerStyle}
                                    itemSeparatorStyle={styles.itemSeparatorStyle}
                                    pickerItemTextStyle={styles.listTextViewStyle}
                                    selectedLabel={this.state.product1}
                                    placeHolderLabel={this.state.placeHolderText}
                                    selectLabelTextStyle={styles.selectLabelTextStyle}
                                    placeHolderTextStyle={styles.placeHolderTextStyle}
                                    dropDownImageStyle={styles.dropDownImageStyle}
                                    selectedValue={(index, item) => this._setProduct1(item.name)}
                                />
                            </View>
                        </View>
                        <Text
                            style={styles.selectItemText}>
                            Select Item 2
                        </Text>
                        <View
                            style={{width: 200, flexDirection: 'row', alignItems: 'center'}}>
                            <RNPicker
                                dataSource={itemsList}
                                dummyDataSource={itemsList}
                                defaultValue={false}
                                pickerTitle={'Search Items'}
                                showSearchBar={true}
                                disablePicker={false}
                                changeAnimation={'fade'}
                                searchBarPlaceHolder={'Search.....'}
                                showPickerTitle={true}
                                searchBarContainerStyle={styles.searchBarContainerStyle}
                                pickerStyle={styles.pickerStyle}
                                itemSeparatorStyle={styles.itemSeparatorStyle}
                                pickerItemTextStyle={styles.listTextViewStyle}
                                selectedLabel={this.state.product2}
                                placeHolderLabel={this.state.placeHolderText}
                                selectLabelTextStyle={styles.selectLabelTextStyle}
                                placeHolderTextStyle={styles.placeHolderTextStyle}
                                dropDownImageStyle={styles.dropDownImageStyle}
                                selectedValue={(index, item) => this._setProduct2(item.name)}
                            />
                        </View>
                        {this.state.isProduct3 && (
                            <View style={{alignItems: 'center'}}>
                                <Text
                                    style={styles.selectItemText}>
                                    Select Item 3
                                </Text>
                                <View
                                    style={{
                                        width: 200,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <RNPicker
                                        dataSource={itemsList}
                                        dummyDataSource={itemsList}
                                        defaultValue={false}
                                        pickerTitle={'Search Items'}
                                        showSearchBar={true}
                                        disablePicker={false}
                                        changeAnimation={'fade'}
                                        searchBarPlaceHolder={'Search.....'}
                                        showPickerTitle={true}
                                        searchBarContainerStyle={styles.searchBarContainerStyle}
                                        pickerStyle={styles.pickerStyle}
                                        itemSeparatorStyle={styles.itemSeparatorStyle}
                                        pickerItemTextStyle={styles.listTextViewStyle}
                                        selectedLabel={this.state.product3}
                                        placeHolderLabel={this.state.placeHolderText}
                                        selectLabelTextStyle={styles.selectLabelTextStyle}
                                        placeHolderTextStyle={styles.placeHolderTextStyle}
                                        dropDownImageStyle={styles.dropDownImageStyle}
                                        selectedValue={(index, item) => this._setProduct3(item.name)}
                                    />
                                    <MaterialCommunityIcons
                                        name="close"
                                        color={'gray'}
                                        size={40}
                                        style={{marginLeft: -18}}
                                        onPress={() => {
                                            this._deleteProduct3();
                                        }}
                                    />
                                </View>
                            </View>
                        )}

                        {this.state.isProduct4 && (
                            <View style={{alignItems: 'center'}}>
                                <Text
                                    style={styles.selectItemText}>
                                    Select Item 4
                                </Text>
                                <View
                                    style={{
                                        width: 200,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <RNPicker
                                        dataSource={itemsList}
                                        dummyDataSource={itemsList}
                                        defaultValue={false}
                                        pickerTitle={'Search Items'}
                                        showSearchBar={true}
                                        disablePicker={false}
                                        changeAnimation={'fade'}
                                        searchBarPlaceHolder={'Search.....'}
                                        showPickerTitle={true}
                                        searchBarContainerStyle={styles.searchBarContainerStyle}
                                        pickerStyle={styles.pickerStyle}
                                        itemSeparatorStyle={styles.itemSeparatorStyle}
                                        pickerItemTextStyle={styles.listTextViewStyle}
                                        selectedLabel={this.state.product4}
                                        placeHolderLabel={this.state.placeHolderText}
                                        selectLabelTextStyle={styles.selectLabelTextStyle}
                                        placeHolderTextStyle={styles.placeHolderTextStyle}
                                        dropDownImageStyle={styles.dropDownImageStyle}
                                        selectedValue={(index, item) => this._setProduct4(item.name)}
                                    />
                                    <MaterialCommunityIcons
                                        name="close"
                                        color={'gray'}
                                        size={40}
                                        style={{marginLeft: -18}}
                                        onPress={() => {
                                            this._deleteProduct4();
                                        }}
                                    />
                                </View>
                            </View>
                        )}

                        {this.state.isProduct5 && (
                            <View style={{alignItems: 'center'}}>
                                <Text
                                    style={styles.selectItemText}>
                                    Select Item 5
                                </Text>
                                <View
                                    style={{
                                        width: 200,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <RNPicker
                                        dataSource={itemsList}
                                        dummyDataSource={itemsList}
                                        defaultValue={false}
                                        pickerTitle={'Search Items'}
                                        showSearchBar={true}
                                        disablePicker={false}
                                        changeAnimation={'fade'}
                                        searchBarPlaceHolder={'Search.....'}
                                        showPickerTitle={true}
                                        searchBarContainerStyle={styles.searchBarContainerStyle}
                                        pickerStyle={styles.pickerStyle}
                                        itemSeparatorStyle={styles.itemSeparatorStyle}
                                        pickerItemTextStyle={styles.listTextViewStyle}
                                        selectedLabel={this.state.product5}
                                        placeHolderLabel={this.state.placeHolderText}
                                        selectLabelTextStyle={styles.selectLabelTextStyle}
                                        placeHolderTextStyle={styles.placeHolderTextStyle}
                                        dropDownImageStyle={styles.dropDownImageStyle}
                                        selectedValue={(index, item) => this._setProduct5(item.name)}
                                    />
                                    <MaterialCommunityIcons
                                        name="close"
                                        color={'gray'}
                                        size={40}
                                        style={{marginLeft: -18}}
                                        onPress={() => {
                                            this._deleteProduct5();
                                        }}
                                    />
                                </View>
                            </View>
                        )}

                        {this.state.isProduct6 && (
                            <View style={{alignItems: 'center'}}>
                                <Text
                                    style={styles.selectItemText}>
                                    Select Item 6
                                </Text>
                                <View
                                    style={{
                                        width: 200,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <RNPicker
                                        dataSource={itemsList}
                                        dummyDataSource={itemsList}
                                        defaultValue={false}
                                        pickerTitle={'Search Items'}
                                        showSearchBar={true}
                                        disablePicker={false}
                                        changeAnimation={'fade'}
                                        searchBarPlaceHolder={'Search.....'}
                                        showPickerTitle={true}
                                        searchBarContainerStyle={styles.searchBarContainerStyle}
                                        pickerStyle={styles.pickerStyle}
                                        itemSeparatorStyle={styles.itemSeparatorStyle}
                                        pickerItemTextStyle={styles.listTextViewStyle}
                                        selectedLabel={this.state.product6}
                                        placeHolderLabel={this.state.placeHolderText}
                                        selectLabelTextStyle={styles.selectLabelTextStyle}
                                        placeHolderTextStyle={styles.placeHolderTextStyle}
                                        dropDownImageStyle={styles.dropDownImageStyle}
                                        selectedValue={(index, item) => this._setProduct6(item.name)}
                                    />
                                    <MaterialCommunityIcons
                                        name="close"
                                        color={'gray'}
                                        size={40}
                                        style={{marginLeft: -18}}
                                        onPress={() => {
                                            this._deleteProduct6();
                                        }}
                                    />
                                </View>
                            </View>
                        )}

                        <View>
                            <TouchableOpacity
                                style={{
                                    width: width / 6,
                                    height: 60,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                }}
                                onPress={() => {
                                    this._addProduct(true);
                                }}>
                                <View style={styles.center}>
                                    <Text
                                        style={{
                                            fontSize: 30,
                                            color: 'gray',
                                            textAlignVertical: 'center',
                                            fontWeight: 'bold',
                                        }}>
                                        +
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{
                                    width: width / 2,
                                    height: 50,
                                    borderRadius: 30,
                                    backgroundColor: '#70BF41',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                }}
                                onPress={() => {
                                    this.checkEmpty()
                                        ? Alert.alert('Please select an item')
                                        : this.checkDuplicates()
                                            ? Alert.alert('Please select different items')
                                            : this.props.navigation.navigate('Compare Details', {
                                                prodarray : this.makearray([this.state.product1, this.state.product2, this.state.product3, this.state.product4, this.state.product5, this.state.product6])
                                            });
                                }}>
                                <View style={{alignItems: 'center'}}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: 'white',
                                            alignItems: 'center',
                                            fontWeight: 'bold',
                                        }}>
                                        Compare
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{
                                    width: width / 2,
                                    height: 50,
                                    borderRadius: 30,
                                    backgroundColor: '#EAAD28',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                }}
                                onPress={() => {this._setProduct1("");this._setProduct2("");this._setProduct3("");this._setProduct4("");this._setProduct5("");this._setProduct6(""); this.state.isProduct3=false;
                                    this.state.isProduct4=false;this.state.isProduct5=false;this.state.isProduct6=false;
                                }}>
                                <View style={{alignItems: 'center'}}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: 'white',
                                            alignItems: 'center',
                                            fontWeight: 'bold',
                                        }}>
                                        Clear
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const compareStack = createStackNavigator();

export const compareScreen = () => (
    <compareStack.Navigator>
        <compareStack.Screen
            name="Compare"
            component={Compare}
            options={{headerShown: false}}
        />
        <compareStack.Screen name="Compare Details" component={comparePage} />
    </compareStack.Navigator>
);
