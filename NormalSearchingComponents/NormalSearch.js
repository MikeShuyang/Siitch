import React, {useState, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Linking,
  TextInput,
  Pressable,
  TouchableHighlight,
} from 'react-native';

const Heart = ({name, inputData}) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};
export default Heart;
