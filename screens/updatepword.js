import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import Header1 from '../components/header1';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class Updatepword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmpassword: '',
      isloading: false,
      error: '',
      email: '',
      pin: '',
      currentPassword: '',
      api_token: '',
      userid: '',
      loginId: '',
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.warn('vvvvv', 'token');
        console.warn('value', value);
        this.setState({api_token: value});
      }
    } catch (e) {
      // error reading value
    }
  };

  getData2 = async () => {
    try {
      const value = await AsyncStorage.getItem('loginId');
      if (value !== null) {
        console.warn('vvvvv', 'loginId');
        console.warn('loginId', value);
        this.setState({loginId: value});
      }
    } catch (e) {
      // error reading value
    }
  };
  async componentDidMount() {
    await this.getData();
    await this.getData2();
    console.warn('...', this.state.api_token);
  }

  submit = async () => {
    const {
      email,
      password,
      isloading,
      confirmpassword,
      currentPassword,
    } = this.state;
    console.warn('loginid', this.state.loginId);
    console.warn('current', this.state.currentPassword);
    console.warn('confirm', this.state.confirmpassword);
    console.warn('newpword', this.state.password);
    if (password == '' || confirmpassword == '' || currentPassword == '') {
      alert('all fields are required');
    } else {
      this.setState({isloading: true});
      console.warn('yyyyyy', this.state.currentPassword);
      try {
        let res = await axios({
          method: 'PUT',
          url: `${endPoint}/users/${this.state.loginId}/password`,
          data: {
            loginId: `${this.state.loginId}`,
            currentPassword: 'password', //`${this.state.currentPassword}`,
            newPassword: this.state.password,
            newPasswordVerify: `${this.state.confirmpassword}`,
          },
          headers: {Authorization: `${this.state.api_token}`},
        });
        if (res) {
          this.setState({isloading: false});
          console.warn('res', res);
        }
      } catch (e) {
        this.setState({isloading: false});
        console.warn(e);
        if (e.response) {
          console.warn('error message', e.response);
        }
      }

      // axios
      //   .put(
      //     `${endPoint}/users/${this.state.loginId}/password`,
      //     {
      //       loginId:`${this.state.loginId}`,
      //       currentPassword: `${this.state.currentPassword}`,
      //       newPassword: `${this.state.password}`,
      //       newPasswordVerify: this.state.confirmpassword,
      //     },
      //     {
      //       headers: {
      //         Authorization: `${this.state.api_token}`,
      //       },
      //     },
      //   )
      //   .then(res => {
      //     this.setState({isloading: false});
      //     this.storeData2(res.headers.authorization);
      //     console.warn(res);
      //     alert(res.headers.authorization);
      //     if (res.status === 200) {
      //       this.props.navigation.navigate('Dashboard', {});
      //     } else if (res.status == 401) {
      //       this.setState({errors: Object.values(res.data.response.message)});
      //       console.warn(this.state.errors);
      //     }

      //     //  else (res.data.response.status==500);{
      //     //   this.setState({errors:Object.values(res.data.response.message)});
      //     //   console.warn(this.state.errors);
      //     //  }
      //   })
      //   .catch(error => {
      //     console.warn(error.response);

      //     this.setState({isloading: false});
      //     Snackbar.show({
      //       title: 'Error Loading Data. Please Check internet Connectivity.',
      //       duration: Snackbar.LENGTH_SHORT,
      //     });
      //   });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{width: '80%', flexDirection: 'row'}}>
            <Image
              source={require('../img/back.png')}
              style={{
                width: RW(3),
                height: RH(3),
                marginLeft: RW(5),
                marginTop: RH(2),
              }}
              resizeMode="contain"
            />

            <Text style={styles.h11}>Update Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box2}>
          <Text style={{color: 'grey', marginTop: RH(5), marginLeft: RW(5)}}>
            Current Password
          </Text>

          <TextInput
            style={styles.textinput}
            onChangeText={currentPassword => this.setState({currentPassword})}
            placeholder="Enter Current Password"
          />

          <Text style={{color: 'grey', marginTop: RH(5), marginLeft: RW(5)}}>
            New Password
          </Text>

          <TextInput
            style={styles.textinput}
            onChangeText={password => this.setState({password})}
            placeholder="Enter New Password"
          />

          <Text style={{color: 'grey', marginTop: RH(5), marginLeft: RW(5)}}>
            Confirm New Password
          </Text>

          <TextInput
            style={styles.textinput}
            onChangeText={confirmpassword => this.setState({confirmpassword})}
            placeholder="Confirm New Password"
          />

          <View style={{marginTop: RH(5)}}>
            <TouchableOpacity onPress={() => this.submit()}>
              <Button tx="Update Password" />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isloading ? (
          <View style={styles.popUp}>
            <Image
              source={require('../img/l4.gif')}
              style={{width: RW(20), height: RH(20)}}
              resizeMode="contain"
            />
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
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    elevation: 2,
    alignItems: 'center',
  },
  box2: {
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
  h11: {
    fontSize: RF(13),
    marginLeft: RW(5),
    marginTop: RH(2),
    fontWeight: 'bold',
  },

  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textinput: {
    borderWidth: 1,
    marginLeft: RW(5),
    width: RW(90),
    height: RH(6),
    borderRadius: 5,
    borderColor: '#E9EBEE',
    padding: 8,
  },
});
