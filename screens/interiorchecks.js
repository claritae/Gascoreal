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
import Button from '../components/button';
import Snackbar from 'react-native-snackbar';
import Boxgbluetruck from '../components/Boxgbluetruck';
import Boxyellowkey from '../components/boxyellowkey';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import moment from 'moment';
var radio_props = [
  {label: 'Pass    ', value: true},
  {label: 'Fail', value: false},
];

export default class Interiorchecks extends React.Component {
  constructor() {
    super();
    this.state = {
      touch: false,
      user: [],
      groupdata: [],
      collectdata: [],
      isloading: false,
      regNo: '',
      id: '',
      model: '',
      check: '',
      api_token: '',
      answers: [],
      toggle: '',
      commentId: '',
      text: '',
      vehicleId: '',
      logId: '',
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

  async press(value, id) {
    await this.setState({value: value});
    await this.setState({commentId: id});
    console.warn('press value', this.state.value);
    console.warn('id', id);
    const me = this.state.answers.filter(i => i.checkTypeId === id);
    const que = this.state.answers.find(el => el.checkTypeId === id);
    console.warn('<<', me);
    if (this.state.value == true) {
      await this.setState({toggle: false});
    } else if (this.state.value == false) {
      await this.setState({toggle: true});
      console.warn('toggle', this.state.toggle);
    }
    this.state.answers.map(item => {
      if (item.checkTypeId === id) {
        item.status = value;
        item.comment = '';
      }
    });

    console.warn('answer', this.state.answers, id);
  }
  update() {
    const {navigation} = this.props;
    //console.warn(this.props.navigation.state.params.user)
    this.setState({regNo: navigation.getParam('regNo', '')});
    this.setState({vehicleId: navigation.getParam('id', '')});
    this.setState({model: navigation.getParam('model', '')});
    this.setState({model: navigation.getParam('model', '')});
    this.setState({check: navigation.getParam('check', '')});
  }

  async componentDidMount() {
    await this.getData();
    await this.update();
    await this.getLogId();
    console.warn('vehiclecheck', this.state.vehicleId);
    console.warn('regNo', this.state.regNo);
    console.warn('model', this.state.model);
    console.warn('checks', this.state.check);
    await this.getall();
    await this.log();
  }

  getLastId() {
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
        console.warn('res.logIdCheck', res);
        this.setState({logId: res.data.id});
        console.warn('logId2hhhhh', this.state.logId);
       
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

  getall = () => {
    this.setState({isloading: true});

    axios
      .get(`${endPoint}/vehicles/checklist?group=${this.state.check}`, {
        headers: {
          Authorization: `${this.state.api_token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        this.setState({isloading: false});
        console.warn('res', res);

        this.setState({collectdata: res.data.items});
        console.warn('res2', this.state.collectdata);

        let ans = [];
        res.data.items.map(item => {
          ans.push({
            checkTypeId: item.id,
            status: '',
            comment: '',
          });
        });
        console.warn('ans', ans);
        this.setState({answers: ans});
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

  async saved(id, text) {
    console.warn('id', id);
    console.warn('text', text);
    if (text.length === 0) {
      alert('you must fill the commont field');
    } else {
      await this.state.answers.map(item => {
        if (item.checkTypeId === id) {
          item.comment = text;
        }
        this.setState({text: ''});
        this.setState({toggle: false});
      });
    }
  }

  log = () => {
    this.setState({isloading: true});

    axios
      .post(
        `${endPoint}/vehicles/logs`,
        {
          vehicleId: this.state.vehicleId,
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
        if (res.data.status == 409) {
          alert(res.data.message);
        }
      })
      .catch(error => {
        console.warn('logerror', error.response);
        this.setState({isloading: false});
        if (error.response.data.status == 409) {
          this.getLastId();
        }
      });
  };

  submit = async () => {
    this.setState({isloading: true});

    axios
      .post(
        `${endPoint}/vehicles/logs/${this.state.logId}`,

        this.state.answers,
        {
          headers: {
            Authorization: `${this.state.api_token}`,
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        this.setState({isloading: false});
        console.warn(res);
        this.props.navigation.navigate('Truckcheck');
        alert('Submitted  Successfully');
      })
      .catch(error => {
        console.warn(error.response.data.code);
        this.setState({isloading: false});
        if (error.response.data.code == 400) {
          alert('answer all questions');
        } else if (error.response.data.code == 409) {
          alert('Log for vehicle exists');
        } else {
          Snackbar.show({
            title: 'Error Loading Data. Please Check internet Connectivity.',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      });
  };

  render() {
    const {touch} = this.state;

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
                marginTop: RH(3.5),
              }}
              resizeMode="contain"
            />

            <Text style={styles.h11}>{this.state.check}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box2}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: RW(55)}}>
              <Text
                style={{
                  fontSize: RF(9),
                  marginLeft: RW(5),
                  marginTop: RH(2),
                }}>
                {this.state.model} {this.state.regNo}
              </Text>
            </View>
            <Text
              style={{
                fontSize: RF(9),
                marginLeft: RW(2),
                marginTop: RH(2),
              }}>
              Pass
            </Text>
            <Text
              style={{
                fontSize: RF(9),
                marginLeft: RW(15),
                marginTop: RH(2),
              }}>
              Fail
            </Text>
          </View>
          <View style={styles.line} />
          <ScrollView>
            {this.state.collectdata.map((item, i) => (
              <TouchableOpacity key={i} style={styles.press}>
                <View style={{width: RW(50)}}>
                  <Text style={{marginLeft: RW(5)}}>{item.description}</Text>
                </View>
                <RadioForm
                  radio_props={radio_props}
                  buttonColor={'#058BC5'}
                  formHorizontal={true}
                  initial={-1}
                  key={0}
                  onPress={value => this.press(value, item.id)}
                />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => this.submit()}
              style={{marginTop: RH(5), marginBottom: RH(3)}}>
              <Button tx="Safe & Continue" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {this.state.toggle ? (
          <View style={styles.popUp}>
            <View style={styles.card}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: RF(12),
                  marginTop: RH(3),
                }}>
                Comment
              </Text>
              <TextInput
                style={{
                  height: '40%',
                  width: '90%',
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: '#058BC5',
                  marginLeft: '5%',
                  marginTop: RH(3),
                  padding: 10,
                }}
                onChangeText={text => this.setState({text})}
                placeholder="Check failed due to"
              />
              <TouchableOpacity
                style={{
                  height: '15%',
                  width: '90%',
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#058BC5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RH(2),
                  marginLeft: '5%',
                }}
                onPress={() =>
                  this.saved(this.state.commentId, this.state.text)
                }>
                <Text style={{color: '#058BC5'}}> Save&Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {this.state.isloading ? (
          <View style={styles.popUp2}>
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

    alignItems: 'center',
    backgroundColor: 'rgb(229,229,229)',
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
    height: '90%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },

  h1: {
    fontSize: RF(13),

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
    fontWeight: 'bold',
    marginTop: RH(3.5),
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '80%',

    borderRadius: 4,
    height: RH(45),
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
  press: {
    height: RH(7),
    width: RW(90),
    marginLeft: RW(5),
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E6EAEE',
    marginTop: RH(3),
  },
});
