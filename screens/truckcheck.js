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
import Boxgbluetruck from '../components/Boxgbluetruck';
import Boxgbluetruck2 from '../components/Boxgbluetruck2';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';

export default class Truckcheck extends React.Component {
  constructor() {
    super();
    this.state = {
      touch: false,
      id: '',
      regNo: '',
      isloading: false,
      firstName: '',
      lastName: '',
      model: '',
      check: true,
      api_token: '',
      logId: '',
      interior: '',
      general: '',
      safety: '',
      exterior: '',
    };
  }

  update() {
    const {navigation} = this.props;
    //console.warn(this.props.navigation.state.params.user)
    this.setState({regNo: navigation.getParam('regNo', '')});
    this.setState({id: navigation.getParam('id', '')});
    this.setState({model: navigation.getParam('model', '')});
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('firstname');
      console.warn('moving');
      if (value !== null) {
        console.warn('firstName', value);
        this.setState({firstName: value});
      }
    } catch (e) {
      // error reading value
    }
  };

  getData2 = async () => {
    try {
      const value = await AsyncStorage.getItem('lastname');
      console.warn('moving2');
      if (value !== null) {
        console.warn('lastName', value);
        this.setState({lastName: value});
      }
    } catch (e) {
      // error reading value
    }
  };
  getData4 = async () => {
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

  getData3 = async () => {
    try {
      const value = await AsyncStorage.getItem('logId');
      if (value !== null) {
        console.warn('vvvvv', 'token');
        console.warn('value', value);
        this.setState({logId: value});
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
          this.state.id
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
        console.warn('rescheck', res.data);
        this.setState({logId: res.data.items[0].id});
        this.storeDataReal(res.data.items[0].id);
        console.warn('reschecklogid', res.data.items[0].id);
        // this.checkShedule1('check', res.data.items);
        // this.checkShedule2(res.data.items[0]);
        // this.checkShedule3(res.data.items[0].checks);
        // this.checkShedule4(res.data.items[0].checks);
      })
      .catch(error => {
        this.setState({isloading: false});
        console.warn('eee', error);

        Snackbar.show({
          title: 'Error Loading Data. Please Check internet Connectivity.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }

  getLastId2() {
    console.warn('existing', this.state.logId);
    this.setState({isloading: true});

    axios
      .get(`${endPoint}/vehicles/logs/${this.state.logId}?expand=true`, {
        headers: {
          Authorization: `${this.state.api_token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        this.setState({isloading: false});
        console.warn('res.logIdCheck', res.data.checks);
        this.setState({logId: res.data.id});
        console.warn('logId2hhhhh', this.state.logId);
        res.data.checks.map(item => {
          if (item.status == null && item.checkGroup == 'INTERIOR_CHECK') {
            console.warn('seeit INTERIOR_CHECK', item.checkGroup);
            this.setState({interior: 'Y'});
          } else {
            console.warn('seeit INTERIOR_CHECK NNNN', item.checkGroup);
            this.setState({interior: 'N'});
          }
          if (item.status == null && item.checkGroup == 'GENERAL_CHECK') {
            console.warn('seeit GENERAL_CHECK', item.checkGroup);
            this.setState({general: 'Y'});
          } else {
            console.warn('seeit GENERAL_CHECK NNNN', item.checkGroup);
            this.setState({general: 'N'});
          }
          if (item.status == null && item.checkGroup == 'SAFETY_CHECK') {
            console.warn('seeit SAFETY_CHECK', item.checkGroup);
            this.setState({safety: 'Y'});
          } else {
            console.warn('seeit SAFETY_CHECK NNNN', item.checkGroup);
            this.setState({safety: 'N'});
          }

          if (item.status == null && item.checkGroup == 'EXTERIOR_CHECK') {
            console.warn('seeit EXTERIOR_CHECK', item.checkGroup);
            this.setState({exterior: 'Y'});
          } else {
            console.warn('seeit EXTERIOR_CHECK NNNN', item.checkGroup);
            this.setState({exterior: 'N'});
          }
          this.checkShedule1();
          this.checkShedule2();
          this.checkShedule3();
          this.checkShedule4();
        });
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
  storeDataReal = async res => {
    try {
      console.warn('token', res);
      await AsyncStorage.setItem('logId', res);
      console.warn('>>>>', 'logId');
    } catch (e) {
      // saving error
    }
  };

  log = () => {
    this.setState({isloading: true});

    axios
      .post(
        `${endPoint}/vehicles/logs`,
        {
          vehicleId: this.state.id,
        },
        {
          headers: {
            Authorization: `${this.state.api_token}`,
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        this.setState({isloading: false});
        console.warn('logres', res);
        this.setState({logId: res.data.id});
        console.warn('logId', this.state.logId);
        this.storeDataReal(this.state.logId);
        this.getLastId();
      })
      .catch(error => {
        console.warn('logerror', error.response.data.status);
        this.setState({isloading: false});
        if (error.response.data.status == 409) {
          this.getLastId();
        }
      });
  };
  checkShedule1(res) {
    if (this.state.interior == 'Y') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'INTERIOR_CHECK',
            })
          }>
          <Boxgbluetruck txh="Interior Checks" />
        </TouchableOpacity>
      );
    } else if (this.state.interior == 'N') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'INTERIOR_CHECK',
            })
          }>
          <Boxgbluetruck2 txh="Interior Checks" />
        </TouchableOpacity>
      );
    }
  }

  checkShedule2(res) {
    if (this.state.safety == 'Y') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'SAFETY_CHECK',
            })
          }>
          <Boxgbluetruck txh="Safety Checks" />
        </TouchableOpacity>
      );
    } else if (this.state.safety == 'N') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'SAFETY_CHECK',
            })
          }>
          <Boxgbluetruck2 txh="Safety Checks" />
        </TouchableOpacity>
      );
    }
  }

  checkShedule3() {
    if (this.state.exterior == 'Y') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'EXTERIOR_CHECK',
            })
          }>
          <Boxgbluetruck txh="Exterior Check" />
        </TouchableOpacity>
      );
    } else if (this.state.exterior == 'N') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'EXTERIOR_CHECK',
            })
          }>
          <Boxgbluetruck2 txh="Exterior Check" />
        </TouchableOpacity>
      );
    }
  }

  checkShedule4(res) {
    if (this.state.general == 'Y') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'GENERAL_CHECK',
            })
          }>
          <Boxgbluetruck txh="General Needs" />
        </TouchableOpacity>
      );
    } else if (this.state.general == 'N') {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Interiorchecks', {
              regNo: this.state.regNo,
              model: this.state.model,
              id: this.state.id,
              check: 'GENERAL_CHECK',
            })
          }>
          <Boxgbluetruck2 txh="General Needs" />
        </TouchableOpacity>
      );
    }
  }

  async componentDidMount() {
    const {navigation} = this.props;
    await this.update();
    await this.getData();
    await this.getData2();
    await this.getData4();
    await this.log();
    await this.getLogId();
    await this.getLastId2();
    // this.focusListener = navigation.addListener('didFocus', () =>
    //   this.getLastId2(),
    // );

    // await this.getData3();

    console.warn('regNoc', this.state.regNo);
    console.warn('idc', this.state.id);
    console.warn('firstNamec', this.state.firstName);
    console.warn('lastNamec', this.state.lastName);
    console.warn('logIdc', this.state.LogId);
    console.warn('api_tokenc', this.state.api_token);
  }

  render() {
    const {touch} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={{width: RW(70)}}>
            <Text style={styles.h11}>Daily Truck Check</Text>
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
          <Text style={{marginTop: RH(3), fontSize: RF(10), marginLeft: RW(5)}}>
            Driver : {this.state.firstName} {this.state.lastName}
          </Text>
          <Text style={{fontSize: RF(8), marginLeft: RW(5)}}>
            Truck : {this.state.model} {this.state.regNo}
          </Text>
          <View style={styles.line} />
          <Text
            style={{
              marginTop: RH(3),
              fontSize: RF(11),
              marginLeft: RW(5),
            }}>
            Vehicle Checklist
          </Text>

          <ScrollView>
            {this.checkShedule1()}
            {this.checkShedule2()}
            {this.checkShedule3()}
            {this.checkShedule4()}
          </ScrollView>
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
    height: '90%',
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
    fontSize: RF(13),
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
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#DFE2E6',
    width: '90%',
    marginLeft: '5%',
    marginTop: RH(2),
  },
  text: {
    color: '#737A91',
    marginTop: '8%',
    marginBottom: '8%',
    marginLeft: '5%',
    fontSize: RF(10),
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
