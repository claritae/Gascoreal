import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Image } from 'react-native';
import { RH, RW, RF } from '../resize';
import Success from '../components/success';




export default class Profileupdated extends React.Component {
  render() { 
    return (
      <View style={styles.container}>
      <Success
       label='Profile Updated !'
       but='Continue'
       t1='Your profile has been successfully '
       t2='updated'
      
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
