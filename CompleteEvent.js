

import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
// import Icon from 'react-native-vector-icons/Fontisto';
// import { DeleteOutlined } from 'ant-design/icons'
import {styles} from './styles.js'


 const EditEvent = ({text, func, mainText, item, SetData}) => {
    const completeEvent = async () => {
        SetData('completed', item);
        console.log('deleting event...')
        // SetData();
      }
  return (
    <TouchableOpacity onPress={() => {completeEvent(item)}} style={{alignSelf: 'flex-start', flex: 1}}>
        <View style={styles.button}>
            <Text style={[styles.completeButtonText, styles.buttonText]}>
                complete
                {/* <Icon name="arrow" size={30} color="#900" /> */}
            </Text>
        </View>
    </TouchableOpacity>
  );
 }

 
 export default EditEvent;
 