

import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
// import Icon from 'react-native-vector-icons/Fontisto';
// import { DeleteOutlined } from 'ant-design/icons'


 const DelEvent = ({text, func, mainText, item, SetData}) => {
    const delEvent = async (item) => {
        SetData('delete', item);
        console.log('deleting event...')
        // SetData();
      }
  return (
    <TouchableOpacity onPress={() => {delEvent(item)}} style={{alignSelf: 'flex-end' }}>
        <View style={styles.listItem}>
            <Text style={styles.buttonText}>
                remove
                {/* <Icon name="arrow" size={30} color="#900" /> */}
            </Text>
        </View>
    </TouchableOpacity>
  );
 }

 const styles = StyleSheet.create({
     listItem: {
       borderRadius: 21,
       borderWidth: 2,
       fontSize: 20,
       alignSelf: 'flex-start',
       alignSelf: 'flex-end',
       padding: 0,
    //    paddingLeft: 6,
    //    paddingRight: 6,
       margin: 4,
       borderColor: 'gray'
   },
   buttonText: {
    fontSize: 20,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'gray'
   }
 })
 
 export default DelEvent;
 