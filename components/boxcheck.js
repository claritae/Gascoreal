import * as React from 'react';
import { Text, View, StyleSheet, Image,CheckBox } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Boxcheck extends React.Component {
  render() {
    return (

       <View style={styles.box}>
            <CheckBox  checkBoxColor='red' value={this.props.val} />
       <View>
      
       <Image
                source={require('../img/greenhome.png')} 
                style={{width:RW(10), height:RH(10), marginLeft:RW(1.5)}}
                resizeMode="contain"
              />
              </View>
              <View style={{marginLeft:RW(3)}}>
                  
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
 fontSize:RF(11),

 
fontWeight:'bold',

 },
 h3:{
 fontSize:RF(8),



 }
 
}); 
