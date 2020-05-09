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
import * as Progress from 'react-native-progress';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import {endPoint} from '../components/baseapi';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'Pass   ', value: true},
  {label: 'Fail', value: false},
];

export default class Progressive extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmpassword: '',
      isloading: false,
      error: '',
      email: '',
      pin: '',
      pro: '',
      q: {},
      count: '',
      check: '',
      try: true,
      try2: false,
      try3: true,
      questions: [],

      api_token: '',
      mark: [],
      checklist: [],
      tt: '',
      comment: '',
      status: '',
      checked: '',
      answers: [],
      value: '',
      toggle: '',
      ini: -1,
      logId: '',
      vehicleId: '',
    };
  }

  update() {
    const {navigation} = this.props;
    this.setState({vehicleId: navigation.getParam('id', '')});
    this.setState({check: navigation.getParam('check', '')});
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

  async componentDidMount() {
    await this.getData();
    await this.update();
    await this.getall();
    // await this.first();
    // await this.log();
  }

  do() {
    var number = this.state.questions.length;

    var total = 1 / number;

    this.setState({pro: total});
    this.setState({count: 1});

    this.setState({q: this.state.questions[0]});
    this.setState({try: false});
    this.setState({try3: false});
    this.setState({try2: true});
    console.warn('q', this.state.q);
  }
  // checkQuestion(item_id) {
  //   let val = this.state.answers.filter(item => item.checkType === item_id)[0];
  //   return val.status;
  // }

  // pressQuestion(item_id){
  //   let val  = this.state.answers.filter(item=>item.checkType === item_id)[0]
  //   val.status =  !val.status,
  //   this.setState({answers: [val, ...this.state.answers.filter(item=>item.checkType!== item_id]});
  // }

  // commentReal(item_id,comment){
  //   let val  = this.state.answers.filter(item=>item.checkType === item_id)[0]
  //   val.comment=  comment
  //   this.setState({answers: [val, this.state.answers.filter(item=>item.checkType!==item_id]})
  // }

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

        this.setState({questions: res.data.items});
        console.warn('qes', this.state.questions);
        this.do();
        let ans = [];
        res.data.items.map(item => {
          ans.push({
            checkTypeId: item.id,
            status: '',
            comment: '',
          });
          this.setState({answers: ans});
        });
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

  async next() {
    await this.setState({ini: 0});
    await this.setState({ini: -1});
    console.warn('q', this.state.q);
    if (this.state.count < this.state.questions.length) {
      var np = this.state.count + 1;
      await this.setState({count: np});
      var number = this.state.questions.length;

      var total = this.state.count / number;
      await this.setState({pro: total});
      await this.setState({q: this.state.questions[this.state.count - 1]});
      await this.setState({try: true});
      if (this.state.count === this.state.questions.length) {
        await this.setState({try2: false});
        await this.setState({try3: true});
        // return (
        //   <RadioForm
        //     radio_props={radio_props}
        //     buttonColor={'#058BC5'}
        //     formHorizontal={true}
        //     initial={-1}
        //     key={0}
        //     onPress={value => this.press(value, this.state.q.id)}
        //   />
        // );
      }
    }
  }
  async first() {
    return (
      <RadioForm
        radio_props={radio_props}
        buttonColor={'#058BC5'}
        formHorizontal={true}
        initial={-1}
        key={0}
        onPress={value => this.press(value, this.state.q.id)}
      />
    );
  }

  async pre() {
    await this.setState({ini: this});
    if (this.state.count > 1) {
      var np = this.state.count - 1;
      await this.setState({count: np});
      var number = this.state.questions.length;

      var total = this.state.count / number;
      await this.setState({pro: total});
      await this.setState({q: this.state.questions[this.state.count - 1]});
      await this.setState({try3: false});
      await this.setState({try2: true});
      if (this.state.count == 1) {
        await this.setState({try: false});

        // return (
        //   <RadioForm
        //     radio_props={radio_props}
        //     buttonColor={'#058BC5'}
        //     formHorizontal={true}
        //     initial={-1}
        //     key={0}
        //     onPress={value => this.press(value, this.state.q.id)}
        //   />
        // );
      }
    }
  }
  sub() {
    alert('Submitted');
  }

  // mk = async id => {
  //   // await this.setState({tt: id});
  //   console.warn('tt', this.state.mark);
  // };

  // test() {
  //   console.warn('tt', this.state.mark);
  // }
  // toggle = async id => {
  //   await this.setState({
  //     checklist: [
  //       ...this.state.checklist.filter(item => item.service_id != id),
  //     ],
  //   });

  //   await this.setState({
  //     mark: [...this.state.mark.filter(item => item != id)],
  //   });
  //   console.warn('ttff', this.state.checklist);
  // };
  async press(value, id) {
    await this.setState({value: value});
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
      }
    });
    console.warn('answer', this.state.answers, id);
  }

  log = () => {
    this.setState({isloading: true});

    axios
      .get(
        `${endPoint}/vehicles/logs?expand=true&vid=${
          this.state.vehicleId
        }&date=${new Date()}`,
        {
          headers: {
            Authorization: `${this.state.api_token}`,
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        this.setState({isloading: false});
        console.warn('res', res);
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

  submit = async () => {
    this.setState({isloading: true});
    axios
      .post(
        `${endPoint}/vehicles/logs/${this.state.logId}`,
        {
          apartment_id: this.state.answers,
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
        console.warn(res);
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
          <View style={{marginTop: RH(5)}}>
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: RH(2),
                fontSize: RF(12),
              }}
            />
            <Progress.Bar
              progress={this.state.pro}
              width={RW(90)}
              height={RH(2)}
              color="#058BC5"
            />
          </View>
          <Text
            style={{marginTop: RH(5), marginLeft: RW(5), marginRight: RW(5)}}>
            {' '}
            {this.state.q.id}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: RW(50),
              marginTop: RH(5),
            }}>
            <View />
            <View>
              <RadioForm
                radio_props={radio_props}
                buttonColor={'#058BC5'}
                formHorizontal={true}
                initial={-1}
                key={0}
                onPress={value => this.press(value, this.state.q.id)}
              />
              {/* {this.pre()}
              {this.next()}
              {this.first()} */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: RW(90),
              justifyContent: 'space-between',
              marginTop: RH(8),
            }}>
            <View style={{height: RH(5), width: RW(20)}}>
              {this.state.try ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.pre()}>
                  <Text style={{color: 'white'}}>Previous</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                height: RH(3),
                width: RW(8),
                backgroundColor: 'grey',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: RH(1),
              }}>
              <Text>
                {this.state.count}/{this.state.questions.length}
              </Text>
            </View>
            <View style={{height: RH(5), width: RW(20)}}>
              {this.state.try2 ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.next()}>
                  <Text style={{color: 'white'}}>Next</Text>
                </TouchableOpacity>
              ) : null}

              {this.state.try3 ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.sub()}>
                  <Text style={{color: 'white'}}>Submit</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        {this.state.isloading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}

        {this.state.toggle ? (
          <View style={styles.popUp4}>
            <View style={styles.card4}>
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
                }}>
                <Text style={{color: '#058BC5'}}> Save&Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '15%',
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RH(2),
                  marginLeft: '5%',
                }}
                onPress={() => this.setState({toggle: false})}>
                <Text style={{color: '#737A91'}}>Cancel</Text>
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
    paddingLeft: RW(5),
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
    fontSize: RF(12),
    marginLeft: RW(5),
    marginTop: RH(3.5),
    fontWeight: 'bold',
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
  button: {
    height: RH(5),
    width: RW(20),
    backgroundColor: '#058BC5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  popUp4: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card4: {
    backgroundColor: '#FFFFFF',
    width: '80%',

    borderRadius: 4,
    height: RH(45),
  },
});
