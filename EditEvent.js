

import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
// import Icon from 'react-native-vector-icons/Fontisto';
// import { DeleteOutlined } from 'ant-design/icons'
import {styles} from './styles.js'


 const EditEvent = ({text, func, mainText, item, SetData, buttonType, modification, setModification, toggleForm, isModification, setIsModification, setNextForm, holdMod, setHoldMod}) => {

    const isEdit = () => {
        setNextForm('modification')
        setIsModification(true)
        toggleForm()
        setHoldMod(item)
    }

  return (
    <TouchableOpacity onPress={isEdit} style={{alignSelf: 'flex-start', flex: 1}}>
        <View style={styles.button}>
            <Text style={[styles.editButtonText, styles.buttonText]}>
                edit
                {/* <Icon name="arrow" size={30} color="#900" /> */}
            </Text>
        </View>
    </TouchableOpacity>
  );
 }
 
 export default EditEvent;
 