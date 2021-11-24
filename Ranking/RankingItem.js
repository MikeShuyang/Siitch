import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import * as Progress from 'react-native-progress';

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export const RankingItem = ({ max, cost, item, image, unit, category, displayUnit }) => {

    const percentage = 1-(max-parseInt(cost))/max < 0.01 ? 0.01 : 1-(max-parseInt(cost))/max;

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const sliceItem = (category, item) => {
        return (
            <Text style={rankStyles.itemTxt}>
                {item}
            </Text>
        )
    }

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={rankStyles.modalView}>
                    <Text>Hello</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text> Close Me</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style = {rankStyles.container}>
                <View style={rankStyles.itemCol}>
                    <Image
                        style={rankStyles.itemImg}
                        source={image}
                    />
                    { sliceItem(category, item) }
                </View>
                <View style={rankStyles.progressCol}>
                    <Progress.Bar
                        progress={percentage}
                        width={DeviceWidth*0.70}
                        height={12}
                        borderWidth={1}
                        borderRadius={50}
                        borderColor="#b5b5b5"
                        color="#81CAFF"
                    />
                    <Text style={rankStyles.progressTxt}>
                        {numberWithCommas(cost)} {`${unit === 'L' ? 'Liters' : 'Gallons'} ${displayUnit}`}
                        {/*
                        <TouchableOpacity onPress={() => setModalVisible(true)} >
                            <View style={rankStyles.infoBtn}>
                                <Text style={{textAlign: "center", color:"darkgray"}}>i</Text>
                            </View>
                        </TouchableOpacity>*/}
                    </Text>
                    
                </View>
            </View>
        </View>
    )
}

const rankStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    //Item Picture and Name
    itemCol: {
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 10,
        width: DeviceWidth*.2,
        alignItems: 'center',
    },
    itemTxt: {
       fontSize: 14,
       fontWeight: '600',
       textAlign: 'center', 
       color: '#000000'
   },
   itemImg: {
       height: DeviceWidth*.15, 
       width: DeviceWidth*.15,
   },
   //Progress Bar and Total
   progressCol: {
       flexDirection: 'column',
       height: DeviceHeight*.12,
       alignItems: 'flex-start',
       justifyContent: 'center',
       marginLeft: 10,
   },
   progressTxt: {
        fontSize: 20,
        fontWeight: '500',
        color: 'dimgrey',
        marginRight: 20,
   },
   infoBtn: {
       borderWidth: 2,
       borderColor: "darkgray",
       borderRadius: 50,
       marginLeft: 5,
       width: 20,
       height: 20,
       alignContent: "center",
   },
   modalView: {
       width: DeviceWidth*.8,
       margin: 50,
       backgroundColor: "white",
       borderWidth: 2,
       borderRadius: 5,
       borderColor: "darkgray"
   }
});