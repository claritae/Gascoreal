import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class Bigboxyellow extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Image
          source={require('../img/cation.png')}
          style={{width: RW(8), height: RH(8), marginLeft: RW(5)}}
          resizeMode="contain"
        />

        <Text style={styles.h1}> {this.props.txh} </Text>
        <View>
          <Text style={styles.h3}> {this.props.tx} </Text>
          <Text style={styles.h3}> {this.props.tx1} </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0, 146, 27, 0.1)',
            height: RH(4),
            width: RW(40),
            borderRadius: 100 / 2,
            marginTop: RH(6),
            justifyContent: 'center',
            marginLeft: RW(5),
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: RW(5),
              height: RH(3),
              backgroundColor: '#F9A000',
              justifyContent: 'center',
              borderRadius: 100 / 2,
              alignItems: 'center',
              marginTop: RH(0.5),
            }}>
            <Text style={styles.h5}> {this.props.number} </Text>
          </View>
          <Text style={styles.h6}> Pending Payment </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: RH(30),
    width: RW(90),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: 'grey',
    marginLeft: RW(5),
    marginTop: RH(3),
  },
  h1: {
    fontSize: RF(15),

    marginLeft: RW(5),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: RF(10),
    marginLeft: RW(5),

    color: '#868A94',
  },
  h5: {
    fontSize: RF(10),
    color: 'rgb(255,255,255)',
    marginLeft: RW(-0.7),
  },
  h6: {
    fontSize: RF(10),
    color: '#868A94',
    marginTop: RH(0.5),
  },
});
