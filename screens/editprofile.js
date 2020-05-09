import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';
import ImagePicker from 'react-native-image-crop-picker';

const {height, width} = Dimensions.get('window');
export default class Editprofile extends React.Component {
  constructor() {
    super();

    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      photo: {},
      user: [],
      isloading: false,
      pp: {},
      pick: false,
      library: false,
      Take: false,
    };
  }

  lib = async () => {
    await this.setState({library: true});
    await this.setState({Take: false});
    this.setState({pick: false});
    await this.try();
    console.warn('library is now true');
  };

  tak = async () => {
    await this.setState({Take: true});
    await this.setState({library: false});
    this.setState({pick: false});
    await this.try();
    console.warn('Take is now true');
  };

  try() {
    if (this.state.library === true && this.state.Take === false) {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      })
        .then(image => {
          this.setState({pick: false});
          this.setState({library: false});
          this.setState({Take: false});
          console.warn(image);
          console.warn('Photo selected');
          this.setState({photo: image});
        })
        .catch(e => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn('cancel');
          console.warn(e);
        });
    } else if (this.state.Take === true && this.state.library === false) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          this.setState({pick: false});
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(image);
          console.warn('photo taken');
          this.setState({photo: image});
        })
        .catch(e => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(e);
        });
    }
  }
  // handleChoosePhoto = async () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker.showImagePicker(options, response => {
  //     if (response) {
  //       this.setState({photo: response});
  //       // this.setState({pp:{uri:photo.uri,name:photo.fileName,type:photo.type,path:photo.path}})
  //       console.warn(this.state.photo);
  //     } else {
  //       this.setState({pp: 'null'});
  //     }
  //   });
  // };

  update() {
    const {navigation} = this.props;
    console.warn(this.props);
    this.setState({user: navigation.getParam('user', '')});
    this.setState({firstname: navigation.getParam('firstname', '')});
    this.setState({lastname: navigation.getParam('lastname', '')});
    this.setState({phone: navigation.getParam('phone', '')});
  }

  async componentDidMount() {
    await this.update();
    console.warn(this.state.user.api_token);
    console.warn('photo', this.state.photo);
  }

  submit = () => {
    const {firstname, lastname, phone, photo} = this.state;
    this.setState({isloading: true});

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('surname', lastname);
    formData.append('phone', phone);
    if (this.state.photo.length == 0 || this.state.photo.path == undefined) {
      console.warn('<<<<', this.state.photo);
      formData.append('profile_image');
    } else {
      console.warn('>>>>', this.state.photo);
      formData.append('profile_image', {
        uri: photo.path,
        name: photo.modificationDate,
        type: photo.mime,
      });
    }

    axios
      .post(`${endPoint}/users/update_profile`, formData, {
        headers: {
          Authorization: `Bearer ${this.state.user.api_token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        this.setState({isloading: false});
        console.warn(res);

        if (res.data.response.code == 200) {
          console.warn(res);
          this.props.navigation.navigate('Profileupdated', {
            user: this.state.user,
          });
        } else if (res.data.code == 500) {
          this.setState({errors: Object.values(res.data.errors)});
          console.warn(this.state.errors);
        } else {
        }
      })
      .catch(error => {
        console.warn(error);

        this.setState({isloading: false});
        Snackbar.show({
          title: 'Error Loading Data. Please Check internet Connectivity.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  render() {
    const {photo} = this.state;
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
                marginTop: RH(0.2),
              }}
              resizeMode="contain"
            />

            <Text style={styles.h11}> Edit Profile </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box2}>
          <TouchableOpacity
            onPress={() => this.setState({pick: true})}
            style={{
              height: '20%',
              width: '35%',
              marginLeft: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              marginTop: '3%',
              borderRadius: 10,
            }}>
            <Image
              source={{uri: photo.path}}
              style={{
                width: '97%',
                height: '105%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                position: 'absolute',
              }}
            />
            <Image
              source={require('../img/camera.png')}
              style={{width: '20%', height: '20%', position: 'absolute'}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.h3}>First Name</Text>

          <TextInput
            style={styles.textinput}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.Last.focus();
            }}
            blurOnSubmit={false}
            onChangeText={firstname => this.setState({firstname})}
            value={this.state.firstname}
            placeholder="First Name"
          />

          <Text style={styles.h3}>Last Name</Text>
          <TextInput
            style={styles.textinput}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.Phone.focus();
            }}
            blurOnSubmit={false}
            ref={input => {
              this.Last = input;
            }}
            onChangeText={lastname => this.setState({lastname})}
            value={this.state.lastname}
            placeholder="Last Name"
          />

          <Text style={styles.h3}>Phone Number</Text>

          <TextInput
            style={styles.textinput}
            ref={input => {
              this.Phone = input;
            }}
            onChangeText={phone => this.setState({phone})}
            value={this.state.phone}
            placeholder="Phone Number"
          />

          <TouchableOpacity
            onPress={() => {
              this.submit();
            }}
            style={{marginTop: RH(3), marginBottom: RH(3)}}>
            <Button tx="Update Profile" />
          </TouchableOpacity>
        </View>

        {this.state.isloading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}

        {this.state.pick ? (
          <View style={styles.popUp}>
            <View style={styles.cardpick}>
              <TouchableOpacity
                style={styles.press2}
                onPress={() => this.lib()}>
                <Text style={{color: 'blue'}}>Select from library</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.press} onPress={() => this.tak()}>
                <Text style={{color: 'blue'}}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.press}
                onPress={() => this.setState({pick: false})}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
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
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 2,
  },
  box2: {
    height: '90%',
    width: '100%',
    backgroundColor: '#FAFAFA',
  },
  h3: {
    fontSize: RF(10),
    marginLeft: RW(5),
    marginTop: RH(4),
    fontWeight: 'bold',
    color: '#868A94',
  },
  h11: {
    fontSize: RF(13),
    marginLeft: RW(5),
    fontWeight: 'bold',
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
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardpick: {
    height: RH(20),
    width: RW(40),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  press: {
    height: '25%',
    width: '90%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    borderRadius: 8,
  },
  press2: {
    height: '25%',
    width: '90%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
  },
});
