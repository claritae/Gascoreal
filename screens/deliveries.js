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
import Bigboxgreen from '../components/bigboxgreen';
import Bigboxblue from '../components/bigboxblue';
import Bigboxyellow from '../components/bigboxyellow';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

export default class Deliveries extends React.Component {
  constructor() {
    super();
    this.state = {
      touch: false,
      user: [],
      groupdata: [],
      collectdata: [],
      isloading: false,
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
      .get(`${endPoint}/deliveries?date=2020-05-16&driver=truckDrv01`, {
        headers: {
          Authorization: `Bearer ${this.state.api_token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        this.setState({isloading: false});
        //  console.warn(res.data.response.incidents);
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
            <Text style={styles.h11}>Deliveries</Text>
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
          <ScrollView>
            <View style={styles.box4}>
              <Image
                source={require('../img/naira2.png')}
                style={{
                  width: RW(20),
                  height: RH(20),
                  marginLeft: RW(70),
                  marginBottom: RH(-17),
                }}
                resizeMode="contain"
              />
              <Text style={styles.h1}>Trip:Diesel Pickup </Text>
              <Text style={styles.h3}>
                From:GML Station,Abeokuta,Ogun State
              </Text>
              <Text style={styles.h3}>To:Wetland,Ojota,Lagos State </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Tripmetric', {
                  user: this.state.user,
                })
              }>
              <Bigboxblue
                txh="Trip:Skid Pickup"
                tx="From:Wetland Plant,Ojota,Lagos State"
                tx1="To:GML Station,Abeokuta,Ogun State "
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('', {user: this.state.user})
              }>
              <Bigboxblue
                txh="Trip:Skid Pickup"
                tx="From:Wetland Plant,Ojota,Lagos State"
                tx1="To:GML Station,Abeokuta,Ogun State "
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('', {user: this.state.user})
              }>
              <Bigboxblue
                txh="Trip:Skid Pickup"
                tx="From:Wetland Plant,Ojota,Lagos State"
                tx1="To:GML Station,Abeokuta,Ogun State "
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('', {user: this.state.user})
              }>
              <Bigboxblue
                txh="Trip:Skid Pickup"
                tx="From:Wetland Plant,Ojota,Lagos State"
                tx1="To:GML Station,Abeokuta,Ogun State "
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
                source={require('../img/m.png')}
                style={{width: RW(6), height: RH(6), marginLeft: RW(1)}}
                resizeMode="contain"
              />
              <Text style={{color: 'grey'}}> Dashboard </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('', {user: this.state.user})
            }>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../img/homeblue.png')}
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
              <View style={{height: '35%', width: '100%'}}></View>
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

    flexDirection: 'row',
  },
  box2: {
    height: '80%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },
  box3: {
    height: '10%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 2,
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
    height: RH(16),
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
});
