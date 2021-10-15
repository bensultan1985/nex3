

import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
// import Icon from 'react-native-vector-icons/Fontisto';
// import { DeleteOutlined } from 'ant-design/icons'


 const EditEvent = ({text, func, mainText, item, SetData, buttonType, modification, setModification, toggleForm, isModification, setIsModification, setNextForm, holdMod, setHoldMod}) => {

    const isEdit = () => {
        setNextForm('modification')
        setIsModification(true)
        toggleForm()
        console.log('this item', item)
        setHoldMod(item)
    }

  return (
    <TouchableOpacity onPress={isEdit} style={{alignSelf: 'flex-start', flex: 1}}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>
                edit
                {/* <Icon name="arrow" size={30} color="#900" /> */}
            </Text>
        </View>
    </TouchableOpacity>
  );
 }

 const styles = StyleSheet.create({
     button: {
      //  borderRadius: 21,
       borderWidth: 2,
       fontSize: 20,
      //  alignSelf: 'flex-start',
      //  alignSelf: 'flex-end',
       padding: 0,
    //    paddingLeft: 6,
    //    paddingRight: 6,
    //    margin: 4,
       borderBottomWidth: 0,
       borderRightWidth: 0,
       borderLeftWidth: 0,
      //  width: "50%",
       borderColor: 'gray',
   },
   buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'gray'
   }
 })
 
 export default EditEvent;
 