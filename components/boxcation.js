import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Boxcation extends React.Component {
  render() {
    return (

       <View style={styles.box}>
       <View>
       <Image
                source={require('../img/cation.png')} 
                style={{width:RW(10), height:RH(10), marginLeft:RW(5)}}
                resizeMode="contain"
              />
              </View>
              <View style={{}}>
      <Text style={styles.h1}> {this.props.txh} </Text>

         <Text style={styles.h3}> {this.props.tx} </Text>
         
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
 fontSize:RF(13),
marginLeft:RW(3),
fontWeight:'bold',

 },
 h3:{
 fontSize:RF(10),
color:'#9EA4AF',
marginLeft:RW(3),

 },

 h4:{
  fontSize:RF(10),
 color:'#9EA4AF',
 marginLeft:RW(40),
 
  }
 
}); 
