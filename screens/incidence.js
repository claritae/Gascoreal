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
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import Boxcation from '../components/boxcation';

const {height, width} = Dimensions.get('window');
export default class Incidence extends React.Component {
  state = {
    user: [],
    isloading: false,
    collectdata: [],
    apartmentid: '',
    touch: false,
    datecollection: [],
    collectvalues: [],
    estateid: '',
    empty: false,
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
                marginTop: RH(0.2),
              }}
              resizeMode="contain"
            />

            <Text style={styles.h11}>Incidence History </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.setState({touch: false})}>
            <Image
              source={require('../img/option.png')}
              style={{width: RW(7), height: RH(7), marginLeft: RW(10)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.box2}>
          <ScrollView>
            <TouchableOpacity>
              <Boxcation txh="Fire Incident" tx="02 october 2017" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Boxcation txh="Fire Incident" tx="02 october 2017" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Boxcation txh="Fire Incident" tx="02 october 2017" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Boxcation txh="Fire Incident" tx="02 october 2017" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Boxcation txh="Fire Incident" tx="02 october 2017" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Boxcation txh="Fire Incident" tx="02 october 2017" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Boxcation txh="Fire Incident" tx="02 october 2017" />
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
                source={require('../img/briefcase.png')}
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
                source={require('../img/guser.png')}
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
    justifyContent: 'center',
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
  h11: {
    fontSize: RF(13),
    marginLeft: RW(5),
    fontWeight: 'bold',
  },

  h4: {
    fontSize: RF(12),
    marginLeft: RW(5),
    fontWeight: 'bold',

    marginTop: RH(2),
  },
  popUp2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  card: {
    backgroundColor: '#fff',
    height: '33%',
    width: '50%',
    marginTop: '18.5%',
    marginLeft: '50%',
    borderRadius: 4,
  },
  text: {
    color: '#737A91',
    marginTop: '8%',
    marginLeft: '5%',
    fontSize: RF(10),
  },
  line: {
    borderBottomWidth: 1,
    marginTop: '8%',
    width: '100%',
    marginLeft: '5%',
  },
  popUp3: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card3: {
    width: RW(60),
    height: RH(20),
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
  },
  alertb: {
    backgroundColor: '#00921B',
    width: '44%',
    height: '70%',
    justifyContent: 'center',
    borderRadius: 7,
    alignItems: 'center',
  },
});
