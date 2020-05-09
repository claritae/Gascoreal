import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import Header1 from '../components/header1';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      errors: '',
      isloading: false,
      firstname: '',
      api_token: '',
      user: [],
      invalid: '',
      firstName: '',
      lastName: '',
    };
  }

  time = () => {
    this.setState({isloading: false});
  };

  // updatePhoto=(new_url)=>{
  //   user = this.state.user;
  //   user.photo_uri = new_url;
  //   this.setState({user:user});
  // }

  storeData2 = async res => {
    try {
      console.warn('token', res);
      await AsyncStorage.setItem('token', res);
      console.warn('>>>>', 'saved2');
    } catch (e) {
      // saving error
    }
  };

  storeData3 = async res => {
    try {
      console.warn('userid', res);
      await AsyncStorage.setItem('userid', res);
      console.warn('>>>>', 'saved2');
    } catch (e) {
      // saving error
    }
  };
  storeData4 = async res => {
    try {
      console.warn('firstname', res);
      await AsyncStorage.setItem('firstname', res);
      console.warn('>>>>', 'saved2');
    } catch (e) {
      // saving error
    }
  };
  storeData5 = async res => {
    try {
      console.warn('lastname', res);
      await AsyncStorage.setItem('lastname', res);
      console.warn('>>>>', 'saved2');
    } catch (e) {
      // saving error
    }
  };

  storeData6 = async res => {
    try {
      console.warn('loginId', res);
      await AsyncStorage.setItem('loginId', res);
      console.warn('username', 'saved2');
    } catch (e) {
      // saving error
    }
  };

  submit = async () => {
    const {email, password, isloading} = this.state;

    if (email == '' || password == '') {
      alert('all fields are required');
    } else {
      this.setState({isloading: true});
      axios
        .post(`${endPoint}/login`, {
          loginId: email,
          password: password,
        })
        .then(res => {
          this.setState({isloading: false});
          this.storeData2(res.headers.authorization);
          this.storeData3(res.data.id);
          this.storeData4(res.data.firstName);
          this.storeData5(res.data.lastName);
          this.storeData6(res.data.loginId);
          console.warn(res);

          if (res.status === 200) {
            this.props.navigation.navigate('Dashboard');
          }
        })
        .catch(error => {
          console.warn('trtyd', error);
          if (error == 'Error: Request failed with status code 401') {
            this.setState({invalid: 'Invalid Login Details'});
            console.warn(this.state.errors);
            this.setState({isloading: false});
          } else {
            this.setState({isloading: false});
            Snackbar.show({
              title: 'Error Loading Data. Please Check internet Connectivity.',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header1 />

        <View style={styles.box1}>
          <ScrollView>
            <Text style={styles.h1}> Welcome </Text>

            <Text style={styles.h3}> Enter your details below to access </Text>
            <Text style={styles.h3}> your account </Text>

            <Text style={{color: 'red', marginTop: '5%', alignSelf: 'center'}}>
              {this.state.invalid}
            </Text>
            <Text
              style={{
                color: '#737A91',
                marginTop: RH(4),
                marginLeft: RW(5),
                marginBottom: RH(1),
              }}>
              {' '}
              User Id
            </Text>

            <TextInput
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.Password.focus();
              }}
              blurOnSubmit={false}
              style={styles.textinput}
              onChangeText={email => this.setState({email})}
              placeholder="  Email address"
            />

            <Text
              style={{
                color: '#737A91',
                marginTop: RH(5),
                marginLeft: RW(5),
                marginBottom: RH(1),
              }}>
              {' '}
              Password{' '}
            </Text>

            <TextInput
              ref={input => {
                this.Password = input;
              }}
              secureTextEntry={true}
              style={styles.textinput}
              onChangeText={password => this.setState({password})}
              placeholder=" Password"
            />

            <View style={{marginTop: RH(6)}}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Button tx="Login" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Forgotpword')}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: RH(7),
                    color: '#737A91',
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {this.state.isloading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#058BC5" />
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
    height: '90%',
    width: '100%',
    backgroundColor: '#FAFAFA',
  },

  h1: {
    fontSize: RF(15),
    alignSelf: 'center',
    marginTop: '10%',
    fontWeight: 'bold',
    marginBottom: RH(3),
  },
  h3: {
    fontSize: RF(10),
    alignSelf: 'center',
    color: '#737A91',
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: RF(25),
    fontFamily: 'name',
    color: '#00921B',
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
