import React, {useState,setState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {styles} from '../Comparing/Styles';
import Profiles from '../ImageDB.js';
import firebase from 'firebase';
import {CalculateTotal} from './CalculateTotal';
import RNPicker from 'rn-modal-picker';
import { cos } from 'react-native-reanimated';

// var pages=[];
var itemNameList=[];
var itemQuantityList=[];
var itemFrequencyList=[];
var itemCostList=[];
var itemYearlyCostList=[];

var itemName;
var itemQuantity;
var itemFrequency;
var itemCost;
var itemYearlyCost;

const DeviceWidth = Dimensions.get('window').width;

const frequency_values = {
  per_day: 365,
  per_week: 52,
  per_month: 12,
  per_year: 1,
};

const Quantity_values ={
  1:1,
  2:2,
  3:3,
  4:4,
  5:5,
  6:6,
  7:7,
  8:8,
  9:9,
  10:10,
  20:20,
  30:30,
  40:40,
  50:50,
}

let fetchedData = {};

function CalculateScreen() {
  let itemsList = [];
  var selectedItem = [];

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

  var individual_sum = 0;
  
  const [pages,setPages] = useState([]);
  const [frequency, setFrequency] = useState('');
  const [quantity, setQuantity] = useState('');
  const [item, setItem] = useState('');
  const [computed, setComputed] = useState(false);
  const [showlist, setShowlist] = useState(false);
  const [context, setContext] = useState(false);
  const [selectOpened, setSelect] = useState(false);
  const [sOpened,setSelectopen] = useState(false);
  const [sOutputOpened,setOutputOpened] = useState(false);
  const [individual_total, setIndividualTotal] = useState();
  const [error, setError] = useState({status: false, message: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [unit, setUnit] = useState('G');
  const [reallyOutputs,setReallyOutput] = useState(0);
  var [yearlyCostTotal, setYearlyCostTotal] = useState(0);
  var [mixCostTotal, setMixCostTotal] = useState(0); 
  var [itemOpenList,setItemOpenList] = useState([]);


  const updateReallyOutput = (currentUnit) =>{
    if(currentUnit=="yearly")
    {
      setReallyOutput(yearlyCostTotal);
    }
    else if(currentUnit=="monthly")
    {
      setReallyOutput(~~(yearlyCostTotal/12));
    }
    else if(currentUnit=="weekly")
    {
      setReallyOutput(~~(yearlyCostTotal/56));
    }
    else
    {
      setReallyOutput(~~(yearlyCostTotal/365));
    }
  }

  const updateYearlyCostTotal = () =>{
    var sum=0;
    for(var i=0;i<itemYearlyCostList.length;i++)
    {
      sum+=itemYearlyCostList[i];
    }
    setYearlyCostTotal(sum)
  }

  const updateMixCostTotal =()=>{
    var sum=0;
    for(var i=0;i<itemCostList.length;i++)
    {
      sum+=itemCostList[i]*itemQuantityList[i];
    }
    setMixCostTotal(sum)  
  }

  const waterParameter = (id) => {
    if (unit === 'L') {
      if (id === 'EDI') {
        return 'Single item   L';
      } else {
        return 'Global Liters p kg';
      }
    } else if (unit === 'G') {
      if (id === 'EDI') {
        return 'Single item   Gal';
      } else {
        return 'Global Gallon p lb';
      }
    }
  };

  const deleteItemFromList = (index) => {
    console.log(index)
    setMixCostTotal(mixCostTotal-itemCostList[index]*itemQuantityList[index])
    setYearlyCostTotal(yearlyCostTotal-itemYearlyCostList[index])

    itemNameList.splice(index,1);
    itemCostList.splice(index,1);
    itemFrequencyList.splice(index,1);
    itemQuantityList.splice(index,1);
    itemYearlyCostList.splice(index,1);



    console.log("mixCostTotal",mixCostTotal);
    console.log("itemNameList",itemNameList)
    console.log("itemQuantityList",itemQuantityList)
    console.log("itemFrequencyList",itemFrequencyList)
    console.log("itemCostList",itemCostList)
    upgradePages();
  }

  const fetchList = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    firebase
      .database()
      .ref('/')
      .once('value', (data) => {
        fetchedData = data.val();

        for (let item in fetchedData) {
          if (item == 'Future Library') continue;
          itemsList.push({
            name: item,
          });
        }
      });
  };

  fetchList();

  const fetchData = (item) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    firebase
      .database()
      .ref('/')
      .once('value', (data) => {
        fetchedData = data.val();

        for (let item in fetchedData) {
          itemsList.push({
            name: item,
          });
        }

        if (item in fetchedData) {
          id = fetchedData[item]['Category'];
        }
        itemName=item;

        if (!(item in fetchedData)) {
          setError({status: true, message: 'This item does not exist'});
        } else if (!fetchedData[item][waterParameter(id)]) {
          setError({
            status: true,
            message: 'Water unit does not exist. Try the compare tool.',
          });
        } else if (
          item in fetchedData &&
          fetchedData[item][waterParameter(id)]
        ) {
          setIndividualTotal(fetchedData[item][waterParameter(id)]);
          itemCost=fetchedData[item][waterParameter(id)];
          addtoList(fetchedData[item][waterParameter(id)]);
          setError({status: false, message: ''});
          setComputed(true);
        }
      });
  };

  const calculate = (item, frequency) => {
    if (!item) {
      setError({status: true, message: 'Please select an item'});
    } else if (!frequency) {
      setError({status: true, message: 'Please select a frequency'});
    } else {
      fetchData(item, frequency);
    }
  };

  const upgradePages =() =>{
    // pages=[]
    // setPages([]);
    var temppages=[];
    for(var i=0;i<itemFrequencyList.length;i++)
    {
      temppages.push(
        <Text>abc</Text>
      );
    }

    setPages(temppages);
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  const addtoList = (cost) => {
    individual_sum = individual_sum + cost;
  }

  const minusfromList = (cost) => {
    individual_sum = individual_sum - cost;
  } 


  const clearElements = () => {
    setComputed(false);
    setInputValue('');
    setItem('');
    setIndividualTotal(null);
    setShowlist(false);


    itemNameList=[];
    itemQuantityList=[];
    itemFrequencyList=[];
    itemCostList=[];
    itemYearlyCostList=[];
    upgradePages();
    console.log("------------")

    DropDownPicker.value = null;
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '21%',
            marginLeft: 20,
            borderColor: '#00ADEF',
            borderWidth: 2,
            borderRadius: 10,
            width: 65,
            height: 44,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setUnit('G');
              if (individual_total) {
                setIndividualTotal(
                  fetchedData[item][
                    id === 'EDI' ? 'Single item   Gal' : 'Global Gallon p lb'
                  ],
                );
              } else {
                calculate(item, frequency);
              }
            }}>
            <Text
              style={{
                color: unit === 'G' ? '#00ADEF' : 'black',
                paddingTop: 5,
                fontSize: 20,
                fontWeight: unit === 'G' ? 'bold' : 'normal',
              }}>
              G
            </Text>
          </TouchableOpacity>
          <Text style={{paddingTop: 5, fontSize: 20}}> / </Text>
          <TouchableOpacity
            onPress={() => {
              setUnit('L');
              if (individual_total) {
                setIndividualTotal(
                  fetchedData[item][
                    id === 'EDI' ? 'Single item   L' : 'Global Liters p kg'
                  ],
                );
              } else {
                calculate(item, frequency);
              }
            }}>
            <Text
              style={{
                color: unit === 'L' ? '#00ADEF' : 'black',
                paddingTop: 5,
                fontSize: 20,
                fontWeight: unit === 'L' ? 'bold' : 'normal',
              }}>
              L
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              marginTop: '21%',
              paddingTop: 30,
              paddingLeft: 50,
              paddingRight: 10,
              paddingBottom: 10,
            }}>
            Calculator
          </Text>
        </View>
      </View>
      <View style={styles.rankingPage}>
        <Image
          style={{
            width: 100,
            height: 100,
            marginLeft: DeviceWidth * 0.38,
            marginTop: 20,
            marginBottom: 30,
          }}
          source={
            computed && Profiles[item] ? Profiles[item] : Profiles.calculator
          }
          resizeMode="contain"
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: '500'}}>Select Item</Text>
          <View style={styles.container}>
            <View
              style={{
                width: DeviceWidth * 0.9,
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
                selectedLabel={item}
                searchBarContainerStyle={styles.searchBarContainerStyle}
                pickerStyle={styles.calculatePickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectLabelTextStyle={styles.calculateLabelTextStyle}
                placeHolderLabel={'Select'}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                selectedValue={(index, currentItem) => {
                  setInputValue(currentItem.name);
                  setComputed(false);
                  setItem(currentItem.name);
                  setError({status: false, message: ''});
                }}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',
         justifyContent: 'space-between',

         marginLeft:20,
         marginRight:20}}>
          <View style={{marginRight:50}}>
            <Text style={{fontSize: 25, marginTop: 30, fontWeight: '500',marginLeft:15}}>
              Quantity
            </Text>
            <DropDownPicker
              items={[
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
                {label: '4', value: '4'},
                {label: '5', value: '5'},
                {label: '6', value: '6'},
                {label: '7', value: '7'},
                {label: '8', value: '8'},
                {label: '9', value: '9'},
                {label: '10', value: '10'},
                {label: '20', value: '20'},
                {label: '30', value: '30'},
                {label: '40', value: '40'},
                {label: '50', value: '50'},
              ]}
              placeholder="Select"
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
              defaultNull
              containerStyle={{
                height: 60,
                borderRadius: 20,
              }}
              style={{
                backgroundColor: 'white',
                width: DeviceWidth * 0.35,
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
                width: DeviceWidth * 0.35,
                marginTop: 10,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderWidth: 2,
                borderColor: '#80CAFF',
              }}
              onChangeItem={(currentQuantity) => {
                setComputed(false);
                itemQuantity=currentQuantity.label;
                setQuantity(currentQuantity.value);
              }}
              onOpen={() => {
                setComputed(false);
                setSelect(true);
                setError({status: false, message: ''});
              }}
              onClose={() => {
                setSelect(false);
              }}
            />
          </View>
          <View>
          <Text style={{fontSize: 25, marginTop: 30, fontWeight: '500',marginLeft:20}}>
            Frequency
          </Text>
          <DropDownPicker
            items={[
              {label: 'a day', value: 'per_day'},
              {label: 'a week', value: 'per_week'},
              {label: 'a month', value: 'per_month'},
              {label: 'a year', value: 'per_year'},
            ]}
            placeholder="Select"
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
            defaultNull
            containerStyle={{
              height: 60,
              borderRadius: 20,
            }}
            style={{
              backgroundColor: 'white',
              width: DeviceWidth * 0.35,
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
              width: DeviceWidth * 0.35,
              marginTop: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 2,
              borderColor: '#80CAFF',
            }}
            onChangeItem={(currentFrequency) => {
              setComputed(false);
              itemFrequency=currentFrequency.value;
              setFrequency(currentFrequency.value);
            }}
            onOpen={() => {
              setComputed(false);
              setSelect(true);
              setError({status: false, message: ''});
            }}
            onClose={() => {
              setSelect(false);
            }}
          />
          </View>
        </View>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}>
              {!context && (
            <View style={styles.modalView}>
              <Text style={{textAlign: 'center', marginTop: 30}}>
                Challenges specific to the item
              </Text>
              <Text style={{marginBottom: 15, textAlign: 'center'}}>
                to appear in the future.
              </Text>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#70BF41'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
              </TouchableHighlight>
            </View>
            )}
            {context && (
              <ScrollView style={{backgroundColor: 'white'}}>
              <View style={{
                margin: '3%',
                paddingHorizontal: '3%',
                marginTop: '8%',
                paddingBottom: '5%',
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}>
              <Text style={{textAlign: 'center', marginTop: 30}}>
                Each person on average in the US{'\n'}
                uses about 1,800 gallons (6,820 Liters) of virtual water per day.
              </Text>
              <Text style={{marginBottom: 15, textAlign: 'center'}}>
                Or over 657,000 gallons (2.48M Liters) per year.
              </Text>
          <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              width: 300,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2%',
            }}>
              <Text style={{fontSize: 20, marginRight: '12%', color: 'black',}}>
              {' '}80 gal.{'\n'}(302 L.)
            </Text>
            <Image
              source={require('./../images2/80Gal.jpeg')}
              style={{width: 150, height: 150, marginTop: 2}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: 300,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2%',
            }}>
              <Text style={{fontSize: 20, marginRight: '10%', color: 'black',}}>
              2,000 gal.{'\n'}(7,570 L.)
            </Text>
            <Image
              source={require('./../images2/2000Gal.jpeg')}
              style={{width: 160, height: 160, marginTop: 2}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: 300,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2%',
            }}>
              <Text style={{fontSize: 20, marginRight: '10%', color: 'black',}}>
              12,000 gal.{'\n'}(45,425 L.)
            </Text>
            <Image
              source={require('./../images2/12000Gal.jpeg')}
              style={{width: 180, height: 180, marginTop: 2}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: 300,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2%',
            }}>
             <Text style={{fontSize: 20, marginRight: '10%', color: 'black',}}>
              100,000 gal.{'\n'}(378,541 L.)
            </Text>
            <Image
              source={require('./../images2/100000Gal.jpeg')}
              style={{width: 175, height: 175, marginTop: 2}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: 300,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2%',
            }}>
              <Text style={{fontSize: 20, marginRight: '10%', marginLeft: '-2%', color: 'black',}}>
              660,000 gal.{'\n'}{'  '}(2.5 mil L.){'\n'}Olympic Pool
            </Text>
            <Image
              source={require('./../images2/660000Gal.jpeg')}
              style={{width: 160, height: 160, marginTop: 2}}
              resizeMode="contain"
            />
          </View>
        </View>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#70BF41'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
              </TouchableHighlight>
            </View>
            </ScrollView>
            )}
          </View>
        </Modal>

        {computed && (
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '500',
                color: 'black',
                marginTop: 30,
              }}>
              Individual Total
            </Text>
            <CalculateTotal
              value={individual_total}
              unit={unit}
              id={id}
              type="individual"
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: '500',
                color: 'black',
                marginTop: 30,
              }}>
              Yearly Total
            </Text>
            <CalculateTotal
              value={individual_total * frequency_values[frequency]*Quantity_values[quantity]}
              unit={unit}
              id={id}
              type="yearly"
            />
          </View>
        )}

        {error.status && Alert.alert(error.message)}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: selectOpened ? 160 : 20,
            marginBottom: 10,
          }}>

          { !computed && (
            <View>
            <TouchableOpacity
              onPress={() => {calculate(item, frequency);

              }}
              style={{
                padding: 15,
                borderRadius: 30,
                backgroundColor: 'orange',
                marginLeft: '19%',
                marginRight: '19%',
                marginBottom: '10%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:'#70BF41',
              }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'white',
                      alignItems: 'center',
                    }}>
                    Calculate
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        )}

          {computed && (
          <View>
            <TouchableOpacity
              onPress={() => {
                computed ? clearElements() : calculate(item, frequency);
                // calculate(item,frequency);
              }}
              style={{
                padding: 15,
                borderRadius: 30,
                backgroundColor: 'orange',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: computed ? 90 : DeviceWidth * 0.4,
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'white',
                    alignItems: 'center',
                  }}>
                  Clear
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          )}

          {computed && (
            <View>
              <TouchableOpacity
                onPress={() => {setContext(false), 
                  setModalVisible(true);
                }}
                style={{
                  padding: 15,
                  borderRadius: 30,
                  marginLeft: 10,
                  backgroundColor: '#29A3FE',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'white',
                      alignItems: 'center',
                    }}>
                    Challenge
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: selectOpened ? 160 : 20,
            marginBottom: 20,
          }}>
            {computed && (
            <View>
              <TouchableOpacity
                onPress={() => {setContext(true), 
                  setModalVisible(true);
                }}
                style={{
                  padding: 15,
                  borderRadius: 30,
                  marginLeft: 10,
                  backgroundColor: '#404040',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'white',
                      alignItems: 'center',
                    }}>
                    Context
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {computed && (
            <View>
              <TouchableOpacity
                onPress={() => {setShowlist(true);

                  setComputed(false);
                  selectedItem.push(item);
                  // console.log("itemlist:",selectedItem);
                  // console.log("itemlist[0]", selectedItem[0]);
                  // console.log(typeof selectedItem[0]);
                  // console.log("item:",item);
                  // console.log(typeof item);

                  //Add those
                  itemNameList.push(itemName);
                  itemFrequencyList.push(frequency);
                  itemQuantityList.push(quantity);
                  itemCostList.push(itemCost);
                  
                  itemYearlyCost = individual_total * frequency_values[frequency]*Quantity_values[quantity];
                  itemYearlyCostList.push(itemYearlyCost);
                  itemOpenList.push(false);
                  setYearlyCostTotal(yearlyCostTotal+itemYearlyCost);
                  setMixCostTotal(mixCostTotal+itemCost*Quantity_values[quantity]);

                  console.log("itemQuantity",quantity)
                  console.log("itemFrequency",frequency)
                  console.log("itemNameList",itemNameList)
                  console.log("itemQuantityList",itemQuantityList)
                  console.log("itemFrequencyList",itemFrequencyList)
                  console.log("itemCostList",itemCostList)
                  console.log("itemYearlyCostList",itemYearlyCostList)
                  console.log("itemYearlyCost",itemYearlyCost)
                  console.log("yearlyCostTotal",yearlyCostTotal)
                  // console.log("mixCostTotal",mixCostTotal)
                  upgradePages();

                }}
                style={{
                  padding: 15,
                  borderRadius: 30,
                  marginLeft: 10,
                  backgroundColor: '#70BF41',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'white',
                      alignItems: 'center',
                    }}>
                    Add to Running Total
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {showlist && (
          <View style={{flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(198, 198, 198, 0.2)',
          height:40,
          marginTop: 20,
          marginBottom: 20
          }}>
            <Text style={{fontSize: 23, fontWeight: '500',marginLeft:20,marginTop:7}}>Running Total</Text>
              <Image
                style={{width: 30, height: 30,marginRight:75,marginTop:5}}
                source={require('./../images/water_drop_150px_wide2.png')}
              />
          </View>
          )}

          <View>
            { pages.map((elem,index)=>{
              var i =index
              return (<View>
                <View style={{flexDirection: 'row',
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft:20,
                  marginRight:10,}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    source={
                      Profiles[itemNameList[index]]
                    }
                  />
                  <Text style={{fontSize: 20, fontWeight: '400',marginLeft:15,marginTop:10}}>{itemNameList[index]}</Text>
                </View>
      
                <View style={{flexDirection: 'row',
                  marginBottom: 5,
                  marginLeft:20,
                  marginRight:10}}>
                  {/* <Text style={{fontSize: 20, fontWeight: '400',marginLeft:10}}>{itemQuantityList[i]}</Text> */}
                  <DropDownPicker defaultValue={itemQuantityList[index]}
                    items={[
                      {label: '1', value: '1'},
                      {label: '2', value: '2'},
                      {label: '3', value: '3'},
                      {label: '4', value: '4'},
                      {label: '5', value: '5'},
                      {label: '6', value: '6'},
                      {label: '7', value: '7'},
                      {label: '8', value: '8'},
                      {label: '9', value: '9'},
                      {label: '10', value: '10'},
                      {label: '20', value: '20'},
                      {label: '30', value: '30'},
                      {label: '40', value: '40'},
                      {label: '50', value: '50'},
                    ]}
                    placeholder="Select"
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
                    defaultNull
                    containerStyle={{
                      height: 50,
                      borderRadius: 20,
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: DeviceWidth * 0.2,
                      marginTop: 0,
                      borderWidth: 2,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      borderColor: '#80CAFF',
                    }}
                    dropDownStyle={{
                      backgroundColor: 'white',
                      opacity: 1,
                      width: DeviceWidth * 0.2,
                      marginTop: 0,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      borderWidth: 2,
                      borderColor: '#80CAFF',
                    }}
                    setValue={itemQuantityList[i]}
      
                    onChangeItem={(currentQuantity) => {
                      itemQuantityList[index] = currentQuantity.label;
                      itemYearlyCostList[index]= itemCostList[index] * frequency_values[itemFrequencyList[index]]*Quantity_values[itemQuantityList[index]]
                      
                      updateYearlyCostTotal();
                      updateMixCostTotal();
                    }}
                    onOpen={() => {
                      // setComputed(false);
                      setSelectopen(true);
                      itemOpenList[index]=true;
                      setError({status: false, message: ''});
                    }}
                    onClose={() => {
                      setSelectopen(false);
                      itemOpenList[index]=false;
                    }}
                  />
      
                  {/* <Text style={{fontSize: 20, fontWeight: '400',marginLeft:10}}>{itemFrequencyList[i]}</Text> */}
                  <DropDownPicker defaultValue={itemFrequencyList[index]}
                    items={[
                      {label: 'D', value: 'per_day'},
                      {label: 'W', value: 'per_week'},
                      {label: 'M', value: 'per_month'},
                      {label: 'Y', value: 'per_year'},
                    ]}
                    placeholder="Select"
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
                    defaultNull
                    containerStyle={{
                      height: 50,
                      borderRadius: 20,
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: DeviceWidth * 0.2,
                      marginTop: 0,
                      marginLeft:10,
                      borderWidth: 2,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      borderColor: '#80CAFF',
                    }}
                    dropDownStyle={{
                      backgroundColor: 'white',
                      width: DeviceWidth * 0.2,
                      marginLeft:10,
                      marginTop: 0,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      borderWidth: 2,
                      borderColor: '#80CAFF',
                    }}
                    onChangeItem={(currentFrequency) => {
                      itemFrequencyList[index]=currentFrequency.value;
                      itemYearlyCostList[index]= itemCostList[index] * frequency_values[itemFrequencyList[index]]*Quantity_values[itemQuantityList[index]]
                      updateYearlyCostTotal();
                    }}
                    onOpen={() => {
                      // setComputed(false);
                      setSelectopen(true);
                      setError({status: false, message: ''});
                      itemOpenList[index]=true;
                    }}
                    onClose={() => {
                      setSelectopen(false);
                      itemOpenList[index]=false;
                    }}
                  />
                  <Text style={{fontSize: 20, fontWeight: '400',width:100,textAlign:'right',marginLeft:50,marginTop:10}}>{itemCostList[i]*itemQuantityList[i]}</Text>
                  
                  <TouchableHighlight  onPress={(i) => deleteItemFromList(index)}>
                    <Image                 
                      style={{
                        width: 25,
                        height: 25,
                        marginLeft:15,
                        marginTop:10
                      }}
                      source={require('./../images/red_x.png')}/>
                  </TouchableHighlight>
                </View>            
                  <View
                    style={{
                      borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                      borderBottomWidth: 1,
                      marginTop: (sOpened&&itemOpenList[index]) ? 160 : 1,
                    }}
                  />
              </View>);
            })}
          </View>

        {showlist && (
          <View style={{flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20,
          marginLeft:20,
          marginRight:20}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Total</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                style={{width: 20, height: 20}}
                source={require('./../images/water_drop_150px_wide2.png')}
              />
              <Text style={{fontSize: 20, fontWeight: '500'}}>{numberWithCommas(mixCostTotal)} Gal</Text>
            </View>
          </View>
          )}

        {showlist && (
          <View style={{
            marginLeft: '19%',
            marginRight: '19%',
            marginBottom: '10%',
            alignItems: 'center',
            justifyContent: 'center',}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 30, height: 30,marginLeft:10,marginRight:10,marginTop:5}}
                source={require('./../images/water_drop_150px_wide2.png')}
              />
              <Text style={{fontSize: 30, fontWeight: '600'}}>Impact</Text>
            </View>

            <DropDownPicker defaultValue='yearly'
                  items={[
                    {label: 'Daily', value: 'daily'},
                    {label: 'Weekly', value: 'weekly'},
                    {label: 'Monthly', value: 'monthly'},
                    {label: 'Yearly', value: 'yearly'},
                  ]}
                  placeholder="Select"
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
                  defaultNull
                  containerStyle={{
                    height: 50,
                    borderRadius: 20,
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: DeviceWidth * 0.8,
                    marginTop: 5,
                    borderWidth: 2,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderColor: '#80CAFF',
                  }}
                  dropDownStyle={{
                    backgroundColor: 'white',
                    width: DeviceWidth * 0.8,
                    marginTop: 5,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderWidth: 2,
                    borderColor: '#80CAFF',
                  }}
                  onChangeItem={(currentUnit) => {
                    updateReallyOutput(currentUnit.value)
                  }}
                  onOpen={() => {
                    // setComputed(false);
                    setError({status: false, message: ''});
                    setOutputOpened(true)
                  }}
                  onClose={() => {
                    setOutputOpened(false)
                  }}
                />     

              <Text style={{fontSize: 30, fontWeight: '500',marginTop: sOutputOpened ? 160 : 20,}}>{(reallyOutputs!=0)?numberWithCommas(reallyOutputs):numberWithCommas(yearlyCostTotal)} Gal</Text>
          </View>
          )}

        {showlist &&(
            <View>
              <TouchableOpacity
                onPress={() => {setShowlist(false);
                  clearElements();
                }}
                style={{
                  padding: 15,
                  borderRadius: 30,
                  backgroundColor: 'orange',
                  marginLeft: '19%',
                  marginRight: '19%',
                  marginBottom: '10%',
                  backgroundColor: 'orange',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'white',
                      alignItems: 'center',
                    }}>
                    Clear Total
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        )}
      </View>
    </ScrollView>
  );
}

const CalculateStack = createStackNavigator();

export const CalculateStackScreen = () => (
  <CalculateStack.Navigator>
    <CalculateStack.Screen
      name="Ranking"
      component={CalculateScreen}
      options={{headerShown: false}}
    />
  </CalculateStack.Navigator>
);
