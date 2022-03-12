

import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import DelEvent from './DelEvent.js'
import EditEvent from './EditEvent.js'
import CompleteEvent from './CompleteEvent.js'
import {styles, styles2} from './styles.js';

// init = true;
possibleNext = 0;
firstPresent = true;
var listStyle = styles;



  const ListItem = ({item, data, SetData, setScrollRef, flatlistOnLoad, items, SortItems, FindIndexOfNext, indexOfNext, setIndexOfNext, toggleForm, modification, setModification, isModification, setIsModification, setNextForm, holdMod, setHoldMod, showList, setShowList}) => {
    if (showList == "completed") listStyle = styles2; else listStyle = styles;

    let scheme = FindScheme(item);
    // console.log('item', item)
    if (item.key == items[items.length-1].key) {
      // setShowList(showList)
    setTimeout(flatlistOnLoad, 10)
    }

    function flatlistOnLoad() {
      let sortedDates = SortItems(items)
      possibleNext = FindIndexOfNext(sortedDates)
      // console.log(sortedDates, possibleNext)
      console.log('THIS IS NEXT:', possibleNext)
      if (typeof possibleNext ==  'number' && possibleNext > 0) setIndexOfNext(possibleNext);
      // console.log(showList, possibleNext, typeof possibleNext, 'check')
      if (showList == 'default') {
      if (this.flatListRef) {
        // console.log('FLATLISTREF MAIN', this.flatListRef)
        console.log('pass')
        console.log(this.flatListRef.scrollToIndex)
        if (this.flatListRef.scrollToIndex) {
          console.log('pass2')
          // console.log(this.ref)
          console.log(this.scrollToIndex)
          console.log(this.flatListRef.scrollToIndex, 'flatlistRef')
          this.flatListRef.scrollToIndex({ index: indexOfNext });
            // init = false;
                  // setTimeout(() => {setShowList(showList)}, 20);

          }
        }
      }
      }

      let completeButton = <CompleteEvent buttonType={'complete'} mainText="complete" item={item} SetData={SetData} style={styles[scheme].del}/>
      ;
      if (showList == 'completed') {
        completeButton = <Text></Text>
      };
    
  
   return (
     <TouchableOpacity>
         <View          
         ref={ref => {
          this.flatListRef = ref;
          // console.log('REF', this.flatListRef)
          let thisScheme = FindScheme(item)
          if (thisScheme == 'present' && firstPresent) {
            setScrollRef(this.flatListRef)
            firstPresent = false;
          }
          // console.log('1', setModification)
        }} style={[listStyle[scheme].listItem, listStyle[scheme].shadowProp, listStyle[scheme].highlight]}>
         <Text style={listStyle[scheme].time}>{FormatDateDisplay(item.date)}</Text>
            <ItemHead item={item} style={listStyle[scheme]}/>
            <Text style={listStyle[scheme].body}>{item.details}</Text>
            <View style={{flexDirection:"row"}}>
            <EditEvent isModification={isModification} setIsModification={setIsModification} modification={modification} setModification={setModification} toggleForm={toggleForm} buttonType={'modification'} mainText="edit" item={item} SetData={SetData} style={listStyle[scheme].del} setNextForm={setNextForm} holdMod={holdMod} setHoldMod={setHoldMod}/>
            <DelEvent buttonType={'delete'} mainText="remove" item={item} SetData={SetData} style={listStyle[scheme].del}/>
            {completeButton}
            </View>

         </View>
     </TouchableOpacity>
   );
  }
 


  function FormatDate(timestamp) {
    let dt = new Date(timestamp)
    return `${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getDate().toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}`
  }

  function FormatDateDisplay(timestamp) {
    let dt = new Date(timestamp)
      var month = (dt.getMonth()+1).toString().padStart(2, '0')
      var day = dt.getDate().toString().padStart(2, '0')
      var year = dt.getFullYear().toString().padStart(4, '0')
      var currentYear = new Date().getFullYear()
      var hours = dt.getHours().toString().padStart(2, '0')
      var minutes = dt.getMinutes().toString().padStart(1, '0')
      var ampm = hours >= 12 ? 'pm' : 'am';
      var hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct','Nov', 'Dec']
      var ret = months[month-1] + '. ' + day + ' ' + hours + ':' + minutes + ampm 
      if (currentYear != year) ret += ' (' + year + ')'
      return ret;
    }

  const ItemHead = ({item, style}) => {
 return (
   <View style={style.head}>
      <Text style={style.header}>{item.title}</Text>
   </View>
 );
}

function FindScheme(item) {
  let now = new Date().getTime();
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow = new Date(tomorrow).getTime();
  // console.log(now, item.date, tomorrow, 'dates')

  if (now < item.date && tomorrow > item.date) {
    return 'present'
  } else if (now > item.date) {
    return 'past'
  } else {
    return 'future'
  }
}
  
  export default ListItem;
  