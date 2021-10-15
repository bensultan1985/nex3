

import React from 'react';
import {Platform, TextInput, Button, Pressable} from 'react-native';
import {useState} from 'react'
// import {Button, withTheme} from 'react-native-elements'
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {setForm} from 'react'


 const AddForm = ({setItems, items, SetData, toggleForm, buttonType, setIsModification, isModification, setNextForm}) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      toSetForm(currentDate, 'date')
    };
    
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    
    const showDatepicker = () => {
      showMode('date');
    };
    
    const showTimepicker = () => {
      showMode('time');
    };

    const addEvent = async item => {
      toSetForm('', 'id');
      SetData('add', item, addForm);
      console.log('adding event...')
      setNextForm('add')
      toggleForm();
      // SetData();
    }

    const GetRand = () => {
      let num =  Math.floor(Math.random() * 239487589);
      return num;
    }

    let firstKey = GetRand();
    const [addForm, setForm] = useState({
      title: '',
      details: '',
      date: '',
      key: firstKey
    })

    function toSetForm(text, type) {
      //  console.log(type)
      switch(type) {
        case 'title': {
          setForm({...addForm, title: text});
          return
        }
        case 'details': {
          setForm({...addForm, details: text});
          return
        }
        case 'date': {
          var date = new Date(text).getTime();
          setForm({...addForm, date: date});
          return
        }
        case 'id': {
          let text = GetRand();
          setForm({...addForm, key: text});
          return;
        }
      }
     }
  


  return (
    <TouchableOpacity>
        <View style={styles.addForm}>
            <TextInput
              style={styles.textInput}
              placeholder="title"
              returnKeyType = 'done'
              onChangeText={(text) => {
                // console.log(addForm)
                toSetForm(text, 'title')
                }}
              />
            <TextInput style={styles.textInput}
            placeholder="details"
            returnKeyType = 'done'
            onChangeText={(text) => {
              // console.log(addForm)
              toSetForm(text, 'details')
              }}
              />
            <DateTimePicker
            testID="dateTimePicker"
          value={date}
          mode={'datetime'}
          is24Hour={true}
          minuteInterval = {5}
          display="spinner"
          onChange={onChange}/>
          <Pressable title="done" style={styles.button} onPress={addEvent}
          ><Text style={styles.buttonText}>done</Text></Pressable>
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
   textInput: {
       fontSize: 24,
       marginBottom: 12,
       padding: 8,
       borderBottomWidth: 1,
        borderColor: 'gray',
        marginLeft: 16,
        marginRight: 16
   },
   addForm: {
       marginTop: 18
   },
   button: {
       fontSize: 24,
       color: 'green',
       textAlign: 'center',
       backgroundColor: 'white',
       borderColor: 'green',
       borderWidth: 1,
       alignSelf: 'center',
       padding: 10,
       paddingLeft: 16,
       paddingRight: 16,
       borderRadius: 25
   },
   buttonText : {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
   }
 })
 
 export default AddForm;
 