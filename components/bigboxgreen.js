import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Bigboxgreen extends React.Component {
  render() {
    return (

       <View style={styles.box}> 
       
<Image 
                 source={require('../img/bluekey.png')} 
                style={{width:RW(8), height:RH(8),marginLeft:RW(5)}}
                resizeMode="contain"
              />

<Text style={styles.h1}> {this.props.txh} </Text>
<View>
<Text style={styles.h3}> {this.props.tx} </Text>
<Text style={styles.h3}> {this.props.tx1} </Text>
<Text style={styles.h3}> {this.props.tx2} </Text>
</View>
   
</View> 


      
    ); 
  }   
}
  
const styles = StyleSheet.create({
  
  box:{ 
     height:RH(30),
   width:RW(90),    
    backgroundColor:'white',
    borderRadius:10,
    borderWidth:0.3,
    borderColor:'grey',
    marginLeft:RW(5),
    marginTop:RH(3),


 
  },
   h1:{
 fontSize:RF(15),

 marginLeft:RW(5),
fontWeight:'bold',

 },
 h3:{
 fontSize:RF(10),
 marginLeft:RW(5),

color:'#868A94'
 },
 h5:{
 fontSize:RF(10),  
color:'rgb(255,255,255)',

 alignSelf:'center'
 },
 h6:{
 fontSize:RF(10),
 color:'#868A94',
 marginTop:RH(0.5)
 },
 
}); 
