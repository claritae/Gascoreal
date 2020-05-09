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

export default class Journeyprog extends React.Component {
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
            <Text style={styles.h11}>Journey in Progress</Text>
          </View>
          <Image
            source={require('../img/Notifications.png')}
            style={{width: RW(7), height: RH(7), marginLeft: RW(5)}}
            resizeMode="contain"
          />
        </View>

        <View style={styles.box2}>
          <ScrollView>
            <View style={{flexDirection: 'row'}}>
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

              <View style={{marginTop: RH(3)}}>
                <Text style={{fontSize: RF(11)}}>Driver </Text>
                <Text
                  style={{
                    fontSize: RF(10),

                    color: '#9EA4AF',
                  }}>
                  Bolade Ahmed
                </Text>

                <Text
                  style={{
                    fontSize: RF(11),
                    marginTop: RH(3),
                  }}>
                  Assistant
                </Text>
                <Text
                  style={{
                    fontSize: RF(10),

                    color: '#9EA4AF',
                  }}>
                  Tinubu Joke
                </Text>
              </View>
            </View>

            <View
              style={{
                width: RW(90),
                marginLeft: RW(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RH(2),
              }}>
              <Text style={{fontSize: RF(11)}}>Type of Trip: </Text>
              <Text
                style={{
                  fontSize: RF(10),
                  color: '#9EA4AF',
                }}>
                Diesel Pickup
              </Text>
            </View>

            <View
              style={{
                width: RW(90),
                marginLeft: RW(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RH(2),
              }}>
              <Text style={{fontSize: RF(11)}}>Start Time: </Text>
              <Text
                style={{
                  fontSize: RF(10),
                  color: '#9EA4AF',
                }}>
                20:28PM
              </Text>
            </View>

            <View
              style={{
                width: RW(90),
                marginLeft: RW(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RH(2),
              }}>
              <Text style={{fontSize: RF(11)}}>Distance Covered</Text>
              <Text
                style={{
                  fontSize: RF(10),
                  color: '#9EA4AF',
                }}>
                2098KM
              </Text>
            </View>

            <View
              style={{
                width: RW(90),
                marginLeft: RW(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RH(2),
              }}>
              <Text style={{fontSize: RF(11)}}>Destination </Text>
              <Text
                style={{
                  fontSize: RF(10),
                  color: '#9EA4AF',
                }}>
                Wetland Plant, Lagos State
              </Text>
            </View>

            <View
              style={{
                width: RW(90),
                marginLeft: RW(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RH(2),
              }}>
              <Text style={{fontSize: RF(11)}}>Out bond</Text>
              <Text
                style={{
                  fontSize: RF(10),
                  color: '#9EA4AF',
                }}>
                In Progress
              </Text>
            </View>

            <View
              style={{
                width: RW(90),
                marginLeft: RW(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RH(2),
              }}>
              <Text style={{fontSize: RF(11)}}>In bound </Text>
              <Text
                style={{
                  fontSize: RF(10),
                  color: '#9EA4AF',
                }}>
                Not Started
              </Text>
            </View>

            <View
              style={{borderBottomWidth: 6, borderBottomColor: '#F2F2F2'}}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Break')}>
              <View style={styles.line2}>
                <View style={{width: '80%', justifyContent: 'center'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    Take A Break{' '}
                  </Text>
                </View>
                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: RW(12)}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Incidentlog')}>
              <View style={styles.line2}>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    Report Incident
                  </Text>
                </View>

                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: RW(12)}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({touch: true})}>
              <View style={styles.line2}>
                <View style={{width: '80%'}}>
                  <Text style={{fontSize: RF(10), marginLeft: RW(5)}}>
                    End Trip
                  </Text>
                </View>

                <Image
                  source={require('../img/f.png')}
                  style={{width: RW(3), height: RH(3), marginLeft: RW(12)}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {this.state.isloading ? (
          <View style={styles.popUp2}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}

        {touch ? (
          <View style={styles.popUp}>
            <View style={styles.card}>
              <Image
                source={require('../img/end.png')}
                style={{width: RW(13), height: RH(13), alignSelf: 'center'}}
                resizeMode="contain"
              />
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: RF(12),
                  marginTop: RH(2),
                }}>
                Arrived?
              </Text>
              <Text style={{alignSelf: 'center', marginTop: RH(2)}}>
                You are about to end your trip.{' '}
              </Text>
              <TouchableOpacity
                style={{
                  height: '15%',
                  width: '90%',
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#058BC5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RH(5),
                  marginLeft: '5%',
                }}>
                <Text style={{color: '#058BC5'}}>End Trip</Text>
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
                onPress={() => this.setState({touch: false})}>
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
    alignItems: 'center',
    flexDirection: 'row',
    shadowOpacity: 0.95,
    shadowOffset: {width: 50, height: 50},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  box2: {
    height: '90%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
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
    fontSize: RF(13),
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
  large: {
    width: RW(90),
    marginLeft: RW(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RH(2),
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
});
