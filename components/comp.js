import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { RH, RW, RF } from '../resize';

export default class Comp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.box}>
<Image 
                source={this.props.im}
                style={{width:RW(15), height:RH(15) }}
                resizeMode="contain"
              />

<Text> {this.props.tx} </Text>
</View>


      </View>
    );
  }   
}

const styles = StyleSheet.create({
  container: {
   height:RH(20),
   width:RW(35),

     
      
  }, 
  box:{
     height:RH(20),
   width:RW(35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    position:'absolute',
    borderRadius:15,
  }
 
}); 
