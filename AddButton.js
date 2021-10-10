

import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
 
 const AddButton = ({text, func, buttonChar}) => {
   console.log('func', func)
  return (
    <TouchableOpacity onPress={func} style={styles.view}>
        <View style={styles.listItem}>
            {/* <Text style={styles.header}>{buttonChar}</Text> */}
            <Text style={styles.subHeader}>{text}</Text>
        </View>
    </TouchableOpacity>
  );
 }

 const styles = StyleSheet.create({
   view: {
    alignSelf: 'flex-start',
    flex:1,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft:3,
    marginRight:3,
    height: "100%",
    //center of screen
    // justifyContent: 'center'
   },
     header: {
       borderRadius: 21,
      //  borderWidth: 2,
       fontSize: 30,
       alignSelf: 'center',
       paddingTop: 0,
       paddingLeft: 10,
       paddingRight: 10,
       margin: 10,
       minHeight: 40
   },
   subHeader: {
     fontSize: 18,
     alignSelf: 'center',
     textAlign: 'center',
     paddingBottom: 6
   }
 })
 
 export default AddButton;
 