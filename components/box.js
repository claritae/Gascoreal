import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Box extends React.Component {
  render() {
    let address = `${this.props.tx}`
    if(address.length > 40) {
      address = `${address.slice(0, 40)}...`
    }

    let name=`${this.props.txh}`
    if(name.length > 40) {
      name=`${name.slice(0, 40)}...`
    }
    return (

       <View style={styles.box}>
       <View>
       <Image
                source={require('../img/greenhome.png')} 
                style={{width:RW(10), height:RH(10), marginLeft:RW(5)}}
                resizeMode="contain"
              />
              </View>
              <View style={{marginLeft:RW(3)}}>
      <Text style={styles.h1}> {name} </Text>

         <Text style={styles.h3}> {address} </Text>
       </View>
</View>  

     
    ); 
  }   
}
 
const styles = StyleSheet.create({
  
  box:{
     height:RH(8),     
   width:RW(90),    
    backgroundColor:'white', 
    borderRadius:5,
    borderWidth:0.3,
    borderColor:'grey',
    marginLeft:RW(5),
    marginTop:RH(3),
   alignItems:'center', 
  flexDirection:'row',
 
  },
   h1:{
 fontSize:RF(11),

 
fontWeight:'bold',

 },
 h3:{
 fontSize:RF(8),



 }
 
}); 
