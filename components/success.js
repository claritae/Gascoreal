import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from './button';
import Header1 from './header1';

export default class Success extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header1 />
        <View style={styles.box1}>
          <Text style={styles.h1}>{this.props.label}</Text>

          <Image
            source={require('../img/Illustration.png')}
            style={{
              width: RW(35),
              height: RH(20),
              alignSelf: 'center',
              marginTop: '2%',
            }}
            resizeMode="contain"
          />

          <View style={{marginTop: '10%'}}>
            <Text style={{fontSize: RF(10), alignSelf: 'center'}}>
              {this.props.t1}{' '}
            </Text>
            <Text style={styles.h3}>{this.props.t2}</Text>
            <Text style={styles.h3}>{this.props.t3}</Text>
            <Text style={styles.h3}>{this.props.t4}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  box1: {
    height: RH(60),
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },
  h1: {
    fontSize: RF(15),
    alignSelf: 'center',
    marginTop: RH(4),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: RF(10),
    alignSelf: 'center',
  },
  name: {
    fontSize: RF(25),
    fontFamily: 'name',
    color: '#00921B',
    alignSelf: 'center',
    marginTop: '2%',
  },
});
