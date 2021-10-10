

import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import DelEvent from './DelEvent.js'
import EditEvent from './EditEvent.js'
import CompleteEvent from './CompleteEvent.js'
// init = true;
possibleNext = 0;
firstPresent = true;




  const ListItem = ({item, data, SetData, setScrollRef, flatlistOnLoad, items, SortItems, FindIndexOfNext, indexOfNext, setIndexOfNext, toggleForm, modification, setModification}) => {

    let scheme = FindScheme(item);
    if (item.key == items[items.length-1].key) {
    setTimeout(flatlistOnLoad, 10)
    }

    function flatlistOnLoad() {
      let sortedDates = SortItems(items)
      possibleNext = FindIndexOfNext(sortedDates)
      // console.log('THIS IS NEXT:', possibleNext)
      if (typeof possibleNext == 'number' && possibleNext > 0) setIndexOfNext(possibleNext);
      if (this.flatListRef.scrollToIndex) {
        this.flatListRef.scrollToIndex({ index: indexOfNext });
          init = false;
        }
      }

    
  
   return (
     <TouchableOpacity>
         <View          ref={ref => {
          this.flatListRef = ref;
          // console.log('REF', this.flatListRef)
          let thisScheme = FindScheme(item)
          if (thisScheme == 'present' && firstPresent) {
            setScrollRef(this.flatListRef)
            firstPresent = false;
          }
          console.log('1', setModification)
        }} style={[styles[scheme].listItem, styles[scheme].shadowProp, styles[scheme].highlight]}>
         <Text style={styles[scheme].time}>{FormatDate(item.date)}</Text>
            <ItemHead item={item} style={styles[scheme]}/>
            <Text style={styles[scheme].body}>{item.details}</Text>
            <View style={{flexDirection:"row"}}>
            <EditEvent modification={modification} setModification={setModification} toggleForm={toggleForm} buttonType={'modification'} mainText="edit" item={item} SetData={SetData} style={styles[scheme].del}/>
            <DelEvent buttonType={'delete'} mainText="remove" item={item} SetData={SetData} style={styles[scheme].del}/>
            <CompleteEvent buttonType={'complete'} mainText="complete" item={item} SetData={SetData} style={styles[scheme].del}/>

            </View>

         </View>
     </TouchableOpacity>
   );
  }
 
  const styles = StyleSheet.create(
  {
    past: {
      listItem: {
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'gray',
        borderRadius: 18,
        borderWidth: 2,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 6,
        marginBottom: 8,
        backgroundColor: 'white'

      },
      time: {
        color: 'black',
        fontSize: 20,
        marginTop: 2,
        marginBottom: 2,
        fontWeight: 'normal'
      },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      head: {
        marginTop: 4,
        color: 'black',
        backgroundColor: 'gray',
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 18,
        fontSize: 20,
        padding: 4,
        paddingLeft: 10
      },
      header: {
        color: 'white',
        fontWeight: "900",
        fontSize: 20
      },
      body: {
        padding: 4,
        paddingLeft: 26,
        color: 'black',
        backgroundColor: 'white',
        margin: 6,
        marginBottom: 2,
        borderColor: 'white',
        borderWidth: 1,
        fontSize: 20
      },
      del: {
        borderColor: 'gray'
      },
      highlight: {
        borderColor: 'gray',
        borderWidth: 4,
      }
    },
    present: {
      listItem: {
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'purple',
        borderRadius: 18,
        borderWidth: 2,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 6,
        marginBottom: 8,
        backgroundColor: 'white'

      },
      time: {
        color: 'black',
        fontSize: 20,
        marginTop: 2,
        marginBottom: 2,
        fontWeight: 'normal'
      },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      head: {
        marginTop: 4,
        color: 'black',
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 0,
        borderRadius: 18,
        fontSize: 20,
        padding: 4,
        paddingLeft: 10
      },
      header: {
        color: 'white',
        fontWeight: "900",
        fontSize: 20
      },
      body: {
        padding: 4,
        paddingLeft: 26,
        color: 'black',
        backgroundColor: 'white',
        margin: 6,
        marginBottom: 2,
        borderColor: 'white',
        borderWidth: 1,
        fontSize: 20
      },
      del: {
        borderColor: 'green'
      },
      highlight: {
        borderColor: 'green',
        borderWidth: 4,
      }
    },
    future: {
      listItem: {
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'purple',
        borderRadius: 18,
        borderWidth: 2,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 6,
        marginBottom: 8,
        backgroundColor: 'white'

      },
      time: {
        color: 'black',
        fontSize: 20,
        marginTop: 2,
        marginBottom: 2,
        fontWeight: 'normal'
      },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      head: {
        marginTop: 4,
        color: 'black',
        backgroundColor: 'purple',
        borderColor: 'purple',
        borderWidth: 0,
        borderRadius: 18,
        fontSize: 20,
        padding: 4,
        paddingLeft: 10
      },
      header: {
        color: 'white',
        fontWeight: "900",
        fontSize: 20
      },
      body: {
        padding: 4,
        paddingLeft: 26,
        color: 'black',
        backgroundColor: 'white',
        margin: 6,
        marginBottom: 2,
        borderColor: 'white',
        borderWidth: 1,
        fontSize: 20
      },
      del: {
        borderColor: 'purple'
      },
      highlight: {
        borderColor: 'purple',
        borderWidth: 4,
      }
    }
  }
)

  function FormatDate(timestamp) {
    let dt = new Date(timestamp)
    return `${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getDate().toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}`
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
  