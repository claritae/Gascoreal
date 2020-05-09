import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Boxres2 extends React.Component {
  render() {
    let name = `${this.props.first}`
    if(name.length > 20) {
      name = `${name.slice(0, 20)}...`
    }
    return (
 
       <View style={styles.box}>
       <View>
       <Image
                source={this.props.im}
                style={{width:RW(10), height:RH(10), marginLeft:RW(5)}}
                resizeMode="contain"
              />
              </View>
              <View style={{}}>
                <View style={{flexDirection:'row'}}>
      <Text style={styles.h1}> {name} </Text>
      </View>
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
    
   alignItems:'center', 
  flexDirection:'row',
  marginBottom:RH(2)
 
  },
   h1:{
 fontSize:RF(12),
 marginLeft:RW(5),
fontWeight:'bold',
color:'#6A6A77'

 },
 h3:{
 fontSize:RF(10),
 marginLeft:RW(5),
 color:'#9EA4AF'

 },
 h13:{
  fontSize:RF(12),
  marginLeft:RW(1),
 fontWeight:'bold',
 color:'#6A6A77'
 
  },
 
}); 
