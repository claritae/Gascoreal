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
import Boxgbluetruck from '../components/Boxgbluetruck';
import Boxyellowkey from '../components/boxyellowkey';

export default class Interiorchecks extends React.Component {
  constructor() {
    super();
    this.state = {
      touch: false,
      regNo: '',
      model: '',
      isloading: false,
    };
  }

  update() {
    const {navigation} = this.props;
    //console.warn(this.props.navigation.state.params.user)
    this.setState({regNo: navigation.getParam('regNo', '')});
    this.setState({id: navigation.getParam('id', '')});
    this.setState({model: navigation.getParam('model', '')});
  }
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
                marginTop: RH(0.2),
              }}
              resizeMode="contain"
            />

            <Text style={styles.h11}>Interior Checks</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box2}>
          <Text style={{fontSize: RF(10), marginLeft: RW(5), marginTop: RH(2)}}>
            Destination
          </Text>
          <View style={styles.line} />
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../img/home2.png')}
              style={{width: RW(10), height: RH(10), marginLeft: RW(5)}}
              resizeMode="contain"
            />
            <View style={{marginTop: RH(-1)}}>
              <Text
                style={{marginTop: RH(3), fontSize: RF(10), marginLeft: RW(5)}}>
                Address
              </Text>
              <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                Gml Station,Abeokuta,Ogun State
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <Text
            style={{
              marginTop: RH(3),
              fontSize: RF(13),
              fontWeight: 'bold',
              marginLeft: RW(5),
            }}>
            Select Assistant
          </Text>

          <ScrollView>
            <TouchableOpacity>
              <Boxyellowkey txh="Bukola Kendra" tx="Assigned" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Boxyellowkey txh="Bukola Kendra" tx="Assigned" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Boxyellowkey txh="Bukola Kendra" tx="Assigned" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Boxyellowkey txh="Bukola Kendra" tx="Assigned" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Boxyellowkey txh="Bukola Kendra" tx="Assigned" />
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              this.submit();
            }}>
            <Button tx="Start Delivery" />
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
