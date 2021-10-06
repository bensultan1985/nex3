

import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
 
 const AddButton = ({text, func, buttonChar}) => {
   console.log('func', func)
  return (
    <TouchableOpacity onPress={func} style={{alignSelf: 'flex-start' }}>
        <View style={styles.listItem}>
            <Text style={styles.header}>{buttonChar}</Text><Text style={styles.subHeader}> {text}</Text>
        </View>
    </TouchableOpacity>
  );
 }

 const styles = StyleSheet.create({
     header: {
       borderRadius: 21,
       borderWidth: 2,
       fontSize: 30,
       alignSelf: 'flex-start',
       padding: 0,
       paddingLeft: 10,
       paddingRight: 10,
       margin: 10
   },
   subHeader: {
     fontSize: 18
   }
 })
 
 export default AddButton;
 