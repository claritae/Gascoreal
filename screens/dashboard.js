import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import {endPoint} from '../components/baseapi';
import Dashbox from '../components/dashbox';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import axios from 'axios';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      touch: false,
      user: [],
      groupdata: [],
      collectdata: [],
      isloading: false,
      firstName: '',
      lastName: '',
      api_token: '',
      logId: '',
      res: false,
      start: '',
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('firstname');
      if (value !== null) {
        console.warn('vvvvv', 'token');
        console.warn('value', value);
        this.setState({firstName: value});
      }
    } catch (e) {
      // error reading value
    }
  };

  getDataName = async () => {
    try {
      const value = await AsyncStorage.getItem('lastname');
      if (value !== null) {
        console.warn('vvvvv', 'token');
        console.warn('value', value);
        this.setState({lastName: value});
      }
    } catch (e) {
      // error reading value
    }
  };
  getToken = async () => {
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
  getLogId = async () => {
    try {
      const value = await AsyncStorage.getItem('logId');
      if (value !== null) {
        console.warn('vvvvv', 'logId');
        console.warn('value', value);
        this.setState({logId: value});
      }
    } catch (e) {
      // error reading value
    }
  };

  getLastId() {
    console.warn('existing');
    this.setState({isloading: true});

    axios
      .get(
        `${endPoint}/vehicles/logs?expand=true&vehicleId=${
          this.state.logId
        }&date=${moment().format('YYYY-MM-DD')}`,
        {
          headers: {
            Authorization: `${this.state.api_token}`,
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        this.setState({isloading: false});
        console.warn('resfff', res.data.items[0].checksCompleted);

        this.checkShedule(res.data.items[0].checksCompleted);
        this.setState({start: res.data.items[0].checksCompleted});
        console.warn('tryd start', this.state.start);
      })
      .catch(error => {
        console.warn('eee', error);
        this.setState({isloading: false});
        Snackbar.show({
          title: 'Error Loading Data. Please Check internet Connectivity.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }

  checkShedule(res) {
    if (this.state.start === true) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Trucks')}>
          <Dashbox txh="Start Schedule" im={require('../img/ds.png')} />
        </TouchableOpacity>
      );
    }
  }

  async componentDidMount() {
    const {navigation} = this.props;
    await this.getData();
    await this.getDataName();
    await this.getToken();
    await this.getLogId();
    await this.getLastId();
    this.focusListener = navigation.addListener('didFocus', () =>
      this.getLastId(),
    );
    console.warn('fistName', this.state.firstName);
    console.warn('lastName', this.state.lastName);
    console.warn('logId', this.state.logId);
    console.warn('token', this.state.api_token);
  }

  render() {
    const {touch} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={{width: RW(70)}}>
            <Text style={styles.h11}>Dashboard</Text>
          </View>
          <Image
            source={require('../img/Notifications.png')}
            style={{
              width: RW(7),
              height: RH(7),
              marginTop: RH(2),
              marginLeft: RW(5),
            }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.box2}>
          <Text
            style={{
              marginTop: RH(3),
              marginBottom: RH(3),
              fontSize: RF(13),
              marginLeft: RW(5),
            }}>
            Welcome , {this.state.firstName} {this.state.lastName}
          </Text>

          <ScrollView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Myprofile')}>
              <Dashbox txh="Profile" im={require('../img/dp.png')} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Dashbox txh="Work Roster" im={require('../img/dw.png')} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Dashbox txh="Incident Record" im={require('../img/di.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Break')}>
              <Dashbox txh="Take A Break" im={require('../img/dt.png')} />
            </TouchableOpacity>

            {this.checkShedule()}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Trucks')}>
              <Dashbox
                txh="Daily Vehicle Checks"
                im={require('../img/ds.png')}
              />
            </TouchableOpacity>
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
                source={require('../img/m2.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Dashboard </Text>
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
                source={require('../img/usergrey.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Profile </Text>
            </View>
          </TouchableOpacity>
        </View>

        {touch ? (
          <View style={styles.popUp}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.setState({touch: false})}>
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Service',
                      {user: this.state.user},
                      this.setState({touch: false}),
                    )
                  }>
                  <Text style={styles.text}>Bill & Payment </Text>
                  <View style={styles.line} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.text}>Transactions </Text>
                  <View style={styles.line} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Findestate',
                      {
                        user: this.state.user,
                      },
                      this.setState({touch: false}),
                    )
                  }>
                  <Text style={styles.text}>New Estate Registration </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.setState({touch: false})}>
              <View style={{height: '35%', width: '100%'}} />
            </TouchableOpacity>
          </View>
        ) : null}

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

    alignItems: 'center',
    backgroundColor: 'rgb(229,229,229)',
  },
  box1: {
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box2: {
    height: '80%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },

  h1: {
    fontSize: RF(15),

    marginTop: RH(-3),
    fontWeight: 'bold',
    marginLeft: RH(3),
    color: 'white',
  },
  h3: {
    marginLeft: RH(3),
    fontSize: RF(10),
    color: 'white',
    marginTop: RH(1),
  },
  box4: {
    height: RH(20),
    width: RW(90),
    backgroundColor: '#058BC5',
    borderRadius: 10,
    marginLeft: RW(5),
    marginTop: RH(5),
    justifyContent: 'center',
  },
  h11: {
    fontSize: RF(15),
    marginLeft: RW(5),
    marginTop: RH(3.5),
    fontWeight: 'bold',
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
  popUp2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    height: '10%',
    width: RW(100),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 4,
  },
});
