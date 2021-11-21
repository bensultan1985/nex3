

import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
// import Icon from 'react-native-vector-icons/Fontisto';
// import { DeleteOutlined } from 'ant-design/icons'
import {styles} from './styles.js';


 const DelEvent = ({text, func, mainText, item, SetData}) => {
    const delEvent = async (item) => {
        SetData('delete', item);
        console.log('deleting event...')
        // SetData();
      }
  return (
    <TouchableOpacity onPress={() => {delEvent(item)}} style={{alignSelf: 'flex-end', flex: 1}}>
        <View style={styles.button}>
            <Text style={[styles.delButtonText,styles.buttonText]}>
                remove
                {/* <Icon name="arrow" size={30} color="#900" /> */}
            </Text>
        </View>
    </TouchableOpacity>
  );
 }
 
 export default DelEvent;
 