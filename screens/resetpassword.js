import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import Header1 from '../components/header1';
import AsyncStorage from '@react-native-community/async-storage';

export default class Resetpassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmpassword: '',
      isloading: false,
      error: '',
      email: '',
      pin: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 />
        <View style={styles.box1}>
          <Text style={styles.h1}>Reset Your Password </Text>

          <Text style={{color: 'grey', marginTop: RH(5), marginLeft: RW(5)}}>
            {' '}
            New Password{' '}
          </Text>

          <TextInput
            style={styles.textinput}
            onChangeText={password => this.setState({password})}
            placeholder=" Enter Password "
          />

          <Text style={{color: 'grey', marginTop: RH(5), marginLeft: RW(5)}}>
            {' '}
            Confirm Password{' '}
          </Text>

          <TextInput
            style={styles.textinput}
            onChangeText={confirmpassword => this.setState({confirmpassword})}
            placeholder=" Confirm Password "
          />

          <View style={{marginTop: RH(5)}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Passwordreset')}>
              <Button tx="Reset Password " />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isloading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}
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
    height: RH(90),
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },
  h1: {
    fontSize: RF(15),
    alignSelf: 'center',
    marginTop: RH(5),
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
  textinput: {
    borderWidth: 1,
    marginLeft: RW(5),
    width: RW(90),
    height: RH(6),
    borderRadius: 5,
    borderColor: '#058BC5',
    padding: 8,
  },
});
