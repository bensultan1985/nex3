
///// to run: react-native run-ios
//// author: Benjamin Sultan
/// v 1.0.0
// notes:

import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList} from 'react-native'
import ListItem from './ListItem.js'
import AddButton from './AddButton.js'
import AddForm from './AddForm.js'
import EditForm from './EditForm.js'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
_init = true;
_nextForm = false;

 
 const App = () => {
  function getItemLayout(data, index) {
    return { length: styles.listItem.height, offset: styles.listItem.height * index, index };
  }

  const setNextForm = (status) => {
    _nextForm = status
  }

  const SetData = async (type, thisItem, form) => {
    if (type == 'add' && form) setItems(items => [...items, form]);
    if (type == 'delete') {
      var newArr = [];
      items.forEach(item => {
        if (item.key != thisItem.key)
        newArr.push(item)
      })
      setItems(prev => newArr)
      }
    if (type == 'modification') {
      var newArr = [];
      items.forEach(item => {
        console.log(item, thisItem, 'COMPARISON SETDATA')
        if (item.key != thisItem.key) newArr.push(item)
      })
      newArr.push(form)
      console.log(newArr, 'NEW ARR')
      setItems(prev => newArr)
      setNextForm(false)
      // setModification(false)
    }
    if (type == 'completed') {
      var newArr = [];
      items.forEach(item => {
        console.log(item.key, thisItem.key)

        console.log(item, thisItem, 'COMPARISON SETDATA')
        if (item.key != thisItem.key) newArr.push(item)
      })
      thisItem.completed = true;
      newArr.push(thisItem)
      console.log(newArr, 'NEW ARR')
      setItems(prev => newArr)
      console.log(items)
      setNextForm(false)
      // setModification(false)
    }
  }
  //effect sets store - learn why
  useEffect(() => {
    console.log('updating store')
    SetStore()
  })

  const SetStore = async () => {
    try {
      let jsonStr = JSON.stringify({items});
      await AsyncStorage.setItem(
        'nexItems',
        jsonStr
      );
      return;
      // GetData()
    } catch (error) {
      // Error saving datacn
      console.log(error)

    }
  };


  const GetData = async () => {
    try {
      if (!_init) return;
      const value = await AsyncStorage.getItem('nexItems');
      console.log('data received from phone: ', value)
      // if (typeof value != null && value != '') {
        parVal = JSON.parse(value)
        SetItemsArr(parVal.items, true)
      // }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  };

  const DataReturned = (str) => {
console.log('returned', str)
  }

  const SetItemsArr =(value, fromApp) => {
    console.log('attempting to update data...')
    console.log(value, items)
    let match = true;
    let longerArr = [];
    if (value.length >= items.length) longerArr = value.length; else longerArr = items.length;
    for (let i =0; i < longerArr.length; i++) {
      if (value[i].key != items[i].key) match = false;
    }
    // console.log('2 attemps', value, match)
    if ((value != null && match == false) || _init == true) {
      // console.log('ADDED NEW DATA', value, match, _init)
      _init = false;
      setItems(value)
    }
  }

  const [scrollRef, setScrollRef] = useState({})
  const [indexOfNext, setIndexOfNext] = useState(0);
  //the event to be modified
  //states if "add" or "edit" window opens
  const [isModification, setIsModification] = useState(false)
  const [holdMod, setHoldMod] = useState({})
  const [showList, setShowList] = useState("default")
  const [rerender, setRerender] = useState({render:true})
  const [items, setItems] = useState(
    [
    //  {key: 230874309, date: 1633095600000, title: 'Harvest Interview', details: 'Second interview'},
    //  {key: 345867024, date: 1631289600000, title: 'Get Groceries', details: 'Need eggs and pizza'},
    //  {key: 348506850, date: 1633201200000, title: 'Psychiatrist Appt', details: 'with doctor'}
   ]
   )
  //  SetData()
  if (_init) GetData()

  const [_openForm, setOpenForm] = useState(false)
  // const [_nextForm, setNextForm] = useState(false)

  const toggleForm = (next) => {
    console.log('TOGGLE', _openForm, _nextForm)
    if (_openForm == _nextForm && _openForm != false && _openForm != 'modification') {
      console.log('1')
      setOpenForm(false);
    } else if (_nextForm == 'add') {
      console.log('2')
      if (_openForm == 'add') setOpenForm(false); else
      setOpenForm('add')
    } else if (_nextForm == 'modification') {
      console.log('3')

      // if (_openForm == 'modification') setOpenForm(false); else
      setOpenForm('modification')
    } else if (_nextForm == false) {
      console.log('4')

      setOpenForm(false)
    }
  }
  function SortItems(items) {
    items.sort(function (a, b) {
     return a.date - b.date;
     });
   return items
  }

  function FindIndexOfNext(sortedItems) {
    let now = new Date().getTime();
    for (let i = 0; i < sortedItems.length; i++) {
      if (now <= sortedItems[i].date) {
        return i
      }
    }
   }
  

   let formView = <Text></Text>;
   if (_openForm == 'add') {
     formView = <View><AddForm setItems={setItems} items={items} SetData={SetData} toggleForm={toggleForm}></AddForm></View>
   } else if (_openForm == 'modification') {
    formView = <View><EditForm setItems={setItems} items={items} SetData={SetData} toggleForm={toggleForm} holdMod={holdMod} setHoldMod={setHoldMod}></EditForm></View>

   }
   
   function GetShowList(listItems) {
     let retList = [];
      if (showList == 'default') {
        console.log('default')
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].completed == false || listItems[i].completed == null) {
          retList.push(listItems[i])
        }
      }
    } else if (showList == 'completed') {
      console.log('complete')
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].completed == true) {
          retList.push(listItems[i])
        }
      }
    }
    console.log(retList, showList)
    return retList
   }

   let completeButton = '';
   let listTitle = "next up:"
   let pageHeading = '';
   if (showList == "default") {
    listTitle = "next up:"
     completedButton = <AddButton text={"completed"} buttonChar={"\u2713"} toSet={false} setNextForm={setNextForm} func={toggleForm} showList={showList} setShowList={setShowList} currentList={"default"}></AddButton>;
     pageHeading = <Text style={styles.header}>NEX{'\u2191'}</Text>;
    } else if (showList == "completed") {
    listTitle = "completed:"
     completedButton = <AddButton text={"next"} buttonChar={"\u2713"} toSet={false} setNextForm={setNextForm} func={toggleForm} showList={showList} setShowList={setShowList} currentList={"completed"}></AddButton>;
     pageHeading = <Text style={[styles.header, styles.headerCompleted]}>Completed</Text>
    }


  return (
    <SafeAreaView style={styles.safe}>
      {/* <Text style={styles.header}>CalBase</Text> */}
      {pageHeading}
      <View style={{flexDirection: "row", marginTop: 4}}>
       <AddButton isModification={isModification} setIsModification={setIsModification} text="add event" func={toggleForm} buttonChar={"\u002B"} _nextForm={_nextForm} setNextForm={setNextForm} toSet={"add"} showList={showList} showList={showList} currentList={"add"}></AddButton>
       {completedButton}
       <AddButton text="settings" buttonChar={"\u2630"} toSet={false} setNextForm={setNextForm} func={toggleForm}></AddButton>
       {/* <AddButton text="add event" modification={modification} setModification={setModification} func={toggleForm} buttonChar={"\u002B"}></AddButton>
       <AddButton text="completed events" buttonChar={"\u2713"}></AddButton>
       <AddButton text="settings" buttonChar={"\u2630"}></AddButton> */}
       {/* 21Fx */}
       {/*\u2699 */}


      </View>
      {formView}
      <Text style={styles.subHeading}>{listTitle}</Text>
      {<FlatList style={styles.eventList}
        // data = {RemoveItemsBeforeToday(SortItems(items))}
        onScrollToTop={this.ref
      }
      
        onScrollToIndexFailed={error => {
          this.flatListRef.scrollToOffset({
              offset: error.averageItemLength * error.index,
              animated: true,
          });
          
      }}
      data = {GetShowList(SortItems(items))}
      
      ref={(ref) => this.flatListRef = ref}
      // data={DATA}



      renderItem = {({item, data}) =>
      <ListItem toggleForm={toggleForm} FindIndexOfNext={FindIndexOfNext} SortItems={SortItems} SetData={SetData} item={item} data={data} setScrollRef={setScrollRef}  items={SortItems(items)} rerender={rerender} setRerender={setRerender} indexOfNext={indexOfNext} setIndexOfNext={setIndexOfNext} isModification={isModification} setIsModification={setIsModification} setNextForm={setNextForm} holdMod={holdMod} setHoldMod={setHoldMod} showList={showList} setShowList={setShowList}/>}
      keyExtractor={(item) => item.key}
      getItemLayout={this.getItemLayout}
      // scrollToView={200}
      />}
    </SafeAreaView>
  );
 }

 const styles = StyleSheet.create({
   header: {
     color: 'white',
     textAlign: 'center',
     backgroundColor: 'green',
     fontSize: 24
   },
   eventList: {
    flexGrow: 0,
    height: '100%'
   },
   safe: {
    //  backgroundColor: 'orange',
     height: '100%'
   },
   subHeading: {
     fontSize: 24,
     padding: 4
   },
   headerCompleted: {
    backgroundColor: '#1A80D2'
   }
 })


 function RemoveItemsBeforeToday(items) {
   let now = new Date().getTime();
   let futureDates = [];
    for (let i = 0; i < items.length; i++) {
      if (now < items[i].date) {
        futureDates.push(items[i]);
      }
    }
    return futureDates
 }
 
 export default App;
 