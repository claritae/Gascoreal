import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Boxnoimage extends React.Component {
  render() {
    let address = `${this.props.tx}`
    if(address.length > 30) {
      address = `${address.slice(0, 30)}...`
    }

    let name=`${this.props.txh}`
    if(name.length > 30) {
      name=`${name.slice(0, 20)}...`
    }
    return (

       <View style={styles.box}>
      
      
<Text style={styles.h1}> {name} </Text>

<Text style={styles.h3}> {address} </Text>
</View>


     
    ); 
  }   
} 
 
const styles = StyleSheet.create({
  
  box:{
     height:RH(8),
   width:RW(90),    
    backgroundColor:'#FFFFFF',
    borderRadius:5,
    borderWidth:0.3,
    borderColor:'grey',
    marginLeft:RW(5),
    marginBottom:RH(3),
     justifyContent:'center', 

 
  },
   h1:{
 fontSize:RF(12),

 marginLeft:RW(3),


 }, 
 h3:{
 fontSize:RF(10),
 marginLeft:RW(3),


 }
 
}); 
