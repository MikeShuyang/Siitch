import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export const RankingItem = ({ max, cost, item, image, unit, category }) => {

    const percentage = 1-(max-parseInt(cost))/max < 0.01 ? 0.01 : 1-(max-parseInt(cost))/max;
    const unitSet = new Set(['Butter', 'Cheese', 'Sugar cane', 'Tofu', 'Rice', 'Pasta', 'Bread', 'Soy sauce', 'Tomato ketchup']);
    const paramPrint = () => {
        if (category === "EDF") {
            if (unitSet.has(item)) return (unit === 'L' ? 'p/kg' : 'p/lb');
            if (item === 'Greek yogurt' || item === 'Yogurt') return 'p/container';
            if (item === 'Toast') return 'p/slice';
        }
        return "";
    }

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

    return (
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
                    {numberWithCommas(cost)} {`${unit === 'L' ? 'Liters' : 'Gallons'} ${paramPrint()}`}
                </Text>
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
   }
});