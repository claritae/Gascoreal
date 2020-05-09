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
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

export default class Trucks extends React.Component {
  constructor() {
    super();
    this.state = {
      touch: false,
      user: [],
      groupdata: [],
      collectdata: [],
      isloading: false,
      api_token: '',
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
  async componentDidMount() {
    await this.getData();
    console.warn('...', this.state.api_token);
    await this.getall();
  }
  getall = () => {
    this.setState({isloading: true});

    axios
      .get(`${endPoint}/vehicles?expand=${true}&status=selected&logged=false`, {
        headers: {
          Authorization: `${this.state.api_token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        this.setState({isloading: false});
        console.warn('res', res);
        console.warn('checkDis', res.data.items);

        this.setState({collectdata: res.data.items});
        console.warn('res2', this.state.collectdata);
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
    const {touch} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={{width: RW(70)}}>
            <Text style={styles.h11}>Trucks</Text>
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
            Select one of the Available Trucks
          </Text>

          <ScrollView>
            {this.state.collectdata.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  this.props.navigation.navigate('Truckcheck', {
                    id: item.id,
                    regNo: item.regNo,
                    model: item.model,
                  })
                }>
                <Boxgbluetruck txh={item.regNo} />
              </TouchableOpacity>
            ))}
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
