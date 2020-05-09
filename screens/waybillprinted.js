import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Image } from 'react-native';
import { RH, RW, RF } from '../resize';
import Success from '../components/success';




export default class Waybillprinted extends React.Component {
  render() { 
    return (
      <View style={styles.container}>
      <Success
       label='Waybill Printed !'
       but='Continue'
       t1='Please check your printer for copies'
      
      
       nav='Home'
      />
  </View>
     
     
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
   
    backgroundColor: '#FFFFFF',
  
  },
 
});
