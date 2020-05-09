import * as React from 'react';
import { Text, View, StyleSheet, Image,Switch } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Switcher extends React.Component {
  state = {switchValue:false}

   toggleSwitch = (value) => {
      //onValueChange of the switch this function will be called
      this.setState({switchValue: value})
      //state changes according to switch
      //which will result in re-render the text
   }
  render() {
    return (

       <View style={styles.box}>
      
              <View style={{width:RW(70)}}>
      <Text style={styles.h111}> {this.props.txh} </Text>

       
       </View> 
       <Switch
       trackColor={{ true: '#00921B', false:'grey'}} 
       thumbColor={['white']} 
          style={{color:'blue',object: {false:"grey", true:'green'}}}
          onValueChange = {this.toggleSwitch}
          value = {this.state.switchValue}/>
</View>  

     
    ); 
  }   
}
 
const styles = StyleSheet.create({
  
  box:{
     height:RH(10),     
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
marginLeft:RW(3),
 fontWeight:'bold',
color:'#737A91'
 },
 h3:{
 fontSize:RF(10),



 }
 
}); 
