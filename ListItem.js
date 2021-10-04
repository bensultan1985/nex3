

import React from 'react';
 import {View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
  import DelEvent from './DelEvent.js'
  const ListItem = ({item, data, SetData}) => {
   return (
     <TouchableOpacity>
         <View style={[styles.listItem, styles.shadowProp]}>
         <Text style={styles.time}>{FormatDate(item.date)}</Text>
            <ItemHead item={item}/>
            <Text style={styles.body}>{item.details}</Text>
            <DelEvent mainText="delete" item={item} SetData={SetData} style={styles.del}/>
         </View>
     </TouchableOpacity>
   );
  }
 
  const styles = StyleSheet.create({
      listItem: {
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'green',
        borderRadius: 18,
        borderWidth: 2,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 6,
        marginBottom: 8,
        backgroundColor: 'white'

      },
      time: {
        // marginTop: 10,
      color: 'black',
      // backgroundColor: 'lightgray',
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
          // marginTop: 10,
        color: 'white',
        fontWeight: "900",
        // backgroundColor: 'lightgray',
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
    }
  })

  function FormatDate(timestamp) {
    let dt = new Date(timestamp)
    return `${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getDate().toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}`
  }

  const ItemHead = ({item}) => {
 return (
   <View style={styles.head}>
      <Text style={styles.header}>{item.title}</Text>
   </View>
 );
}
  
  export default ListItem;
  