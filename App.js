
//to run: react-native run-ios

import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList} from 'react-native'
import ListItem from './ListItem.js'
import AddButton from './AddButton.js'
import AddForm from './AddForm.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
_init = true;

 
 const App = () => {
  function getItemLayout(data, index) {
    return { length: styles.listItem.height, offset: styles.listItem.height * index, index };
  }

  // useEffect(() => {{

  // })

  const SetData = async (type, thisItem, addForm) => {
    if (type == 'add' && addForm) setItems(items => [...items, addForm]);
    if (type == 'delete') {
      var newArr = [];
      items.forEach(item => {
        if (item.key != thisItem.key)
        newArr.push(item)
      })
      setItems(prev => newArr)
      }
    if (type == 'modify') {
      var newArr = [];
      items.forEach(item => {
        if (item.key != thisItem.key) newArr.push(item)
      })
      newArr.push(addForm)
      setItems(prev => newArr)
      setModification(false)
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
  const [modification, setModification] = useState({});
  const [isModification, setIsModification] = useState(false)



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

  const [_openAddForm, setOpenAddForm] = useState(false)

  const toggleForm = () => {
    setOpenAddForm(!_openAddForm);
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
   if (_openAddForm == true) {
     formView = <View><AddForm setItems={setItems} items={items} SetData={SetData} toggleForm={toggleForm} modification={modification}></AddForm></View>
   }
   




  return (
    <SafeAreaView style={styles.safe}>
      {/* <Text style={styles.header}>CalBase</Text> */}
      <Text style={styles.header}>NEX{'\u2191'}</Text>
      <View style={{flexDirection: "row", marginTop: 4}}>
       <AddButton text="add event" modification={modification} setModification={setModification} func={toggleForm} buttonChar={"\u002B"}></AddButton>
       <AddButton text="completed" buttonChar={"\u2713"}></AddButton>
       <AddButton text="settings" buttonChar={"\u2630"}></AddButton>
       {/* <AddButton text="add event" modification={modification} setModification={setModification} func={toggleForm} buttonChar={"\u002B"}></AddButton>
       <AddButton text="completed events" buttonChar={"\u2713"}></AddButton>
       <AddButton text="settings" buttonChar={"\u2630"}></AddButton> */}
       {/* 21Fx */}
       {/*\u2699 */}


      </View>
      {formView}
      <Text style={styles.subHeading}>Next Up:</Text>
      <FlatList style={styles.eventList}
        // data = {RemoveItemsBeforeToday(SortItems(items))}
        onScrollToTop={this.ref
      }
      
        onScrollToIndexFailed={error => {
          this.flatListRef.scrollToOffset({
              offset: error.averageItemLength * error.index,
              animated: true,
          });
          
      }}
      data = {SortItems(items)}
      
      ref={(ref) => this.flatListRef = ref}
      // data={DATA}



      renderItem = {({item, data}) =>
      <ListItem toggleForm={toggleForm} FindIndexOfNext={FindIndexOfNext} SortItems={SortItems} SetData={SetData} item={item} data={data} setScrollRef={setScrollRef}  items={SortItems(items)} rerender={rerender} setRerender={setRerender} indexOfNext={indexOfNext} setIndexOfNext={setIndexOfNext} modification={modification} setModification={setModification}/>}
      keyExtractor={(item) => item.key}
      getItemLayout={this.getItemLayout}
      // scrollToView={200}
      />
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
 