import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';

export default class Myprofile extends React.Component {
  constructor() {
    super();
    this.state = {
      fingerprintvalue: false,
      notificationvalue: false,
      touch: false,
      photo: null,
      user: [],
      photouri: '',
      push: '',
      finger: '',
      isloading: false,
      firstname: '',
      user2: [],
    };
  }

  render() {
    const {touch, photo} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={{width: RW(72)}}>
            <Text style={styles.h11}> My Profile </Text>
          </View>
          <Image
            source={require('../img/Notifications.png')}
            style={{width: RW(7), height: RH(7), marginLeft: RW(5)}}
            resizeMode="contain"
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.setState({touch: true})}>
            <Image
              source={require('../img/option.png')}
              style={{width: RW(7), height: RH(7), marginLeft: RW(5)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.box2}>
          <ScrollView>
            <View
              style={{
                width: RW(35),
                height: RH(20),
                marginLeft: RW(5),
                borderRadius: 10,
                backgroundColor: 'white',
                marginTop: RH(2),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../img/rec.png')}
                style={{width: '96%', height: '96%', borderRadius: 10}}
              />
            </View>
            <Text
              style={{
                fontSize: RF(12),
                fontWeight: 'bold',
                marginLeft: RW(5),
                marginTop: RH(2),
                marginBottom: RH(2),
              }}>
              {' '}
              {this.state.firstname}{' '}
            </Text>

            <View
              style={{borderBottomWidth: 6, borderBottomColor: '#F2F2F2'}}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Editprofile', {
                  user: this.state.user,
                  lastname: this.state.user2.surname,
                  firstname: this.state.user2.firstname,
                  phone: this.state.user2.phone,
                })
              }>
              <View style={styles.line2}>
                <View style={{width: '80%', justifyContent: 'center'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    {' '}
                    Edit{' '}
                  </Text>
                </View>
                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Updatepword', {
                  user: this.state.user,
                })
              }>
              <View style={styles.line2}>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    {' '}
                    Update Password{' '}
                  </Text>
                </View>

                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: '10%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <View style={styles.line2}>
              <TouchableOpacity
                style={{width: '80%'}}
                onPress={() =>
                  this.props.navigation.navigate('Home', {
                    user: this.state.user,
                  })
                }>
                <View style={{width: '80%'}}>
                  <Text
                    style={{
                      fontSize: RF(10),
                      marginLeft: RW(5),
                      color: '#FF1200',
                    }}>
                    {' '}
                    Sign Out{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.box3}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Dashboard', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/m.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Dashboard</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Deliveries', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/greyhome.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Deliveries </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Incidence', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/briefcase(1).png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Incidence </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Myprofile', {
                user: this.state.user,
              })
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/gu.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Profile </Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.isloading ? (
          <View style={styles.popUp2}>
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
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOpacity: 0.95,
    shadowOffset: {width: 50, height: 50},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: 'center',
  },
  box2: {
    height: '80%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },
  box3: {
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 4,
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  card: {
    backgroundColor: '#fff',

    width: '50%',
    marginTop: '18.5%',
    marginLeft: '50%',
    borderRadius: 4,
  },
  h11: {
    fontSize: RF(15),
    marginLeft: RW(5),
    marginTop: RH(3.5),
    fontWeight: 'bold',
  },
  text: {
    color: '#737A91',
    marginTop: '8%',
    marginBottom: '8%',
    marginLeft: '5%',
    fontSize: RF(10),
  },
  line: {
    borderBottomWidth: 1,

    width: '100%',
    marginLeft: '5%',
  },
  line2: {
    borderBottomWidth: 4,
    height: RH(8),
    width: RW(100),

    borderBottomColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  popUp2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
