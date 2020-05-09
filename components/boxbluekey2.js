import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Boxbluekey2 extends React.Component {
  render() {

    
    let name=`${this.props.txh}`
    if(name.length > 20) {
      name=`${name.slice(0, 20)}...`
    }

    let price=`${this.props.price}`
    if(price.length > 8) {
      price=`${price.slice(0, 8)}...`
    }

    let date=`${this.props.tx}`
    if(date.length > 10) {
      date=`${date.slice(0, 10)}`
    }
    return (

       <View style={styles.box}>
       <View>
       <Image
                source={require('../img/bluekey.png')} 
                style={{width:RW(10), height:RH(10), marginLeft:RW(5)}}
                resizeMode="contain"
              />
              </View>
              <View style={{width:'65%'}}>
      <Text style={styles.h1}>{name}</Text>

         <Text style={styles.h3}>Created Date:{date}</Text>
       </View>

       <View style={{marginTop:'5%',marginLeft:'-9%'}}>

         <Text style={styles.h4}>{"\u20A6"}{price}</Text>
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
 fontSize:RF(12),
marginLeft:RW(2),
 
fontWeight:'bold',

 },
 h3:{
 fontSize:RF(10),
marginLeft:RW(2),
 },
  h4:{
 fontSize:RF(9),
marginLeft:RW(5),
marginTop:RH(1),
color:'red'
 }
}); 
