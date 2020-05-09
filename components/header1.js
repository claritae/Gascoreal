import * as React from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class Header1 extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Image
          source={require('../img/logo.png')}
          style={{width: RW(30), height: RH(20)}}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: RH(8),
    width: RW(100),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RH(3),
  },
});
