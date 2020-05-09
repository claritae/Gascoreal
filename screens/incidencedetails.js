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

const {height, width} = Dimensions.get('window');
export default class Incidencedetails extends React.Component {
  state = {
    touch: false,
    id: '',
    status: '',
    user: [],
    email: '',
    phone: '',
    firstname: '',
    date: '',
    lastname: '',
    touch2: false,
    isloading: false,
    apartmentid: '',
    sn: '',
    comments: '',
    time: '',
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
                marginTop: RH(0.2),
              }}
              resizeMode="contain"
            />

            <Text style={styles.h11}>Fire Incident</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.setState({touch: true})}>
            <Image
              source={require('../img/option.png')}
              style={{width: RW(7), height: RH(7), marginLeft: RW(12)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.box2}>
          <ScrollView>
            <Image
              source={require('../img/cation.png')}
              style={{width: RW(10), height: RH(10), marginLeft: RW(5)}}
              resizeMode="contain"
            />

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                width: RW(90),
                marginLeft: RW(5),
              }}
            />

            <Text style={styles.h4}>Fire Incident</Text>
            <Text style={styles.h3}>02 october 2017</Text>

            <Text style={styles.h4}>Priority/level of seriousness</Text>
            <Text style={styles.h3}>High</Text>

            <Text style={styles.h4}>Incedent Description</Text>
            <Text style={styles.h3}> fire in the hole </Text>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                width: RW(90),
                marginLeft: RW(5),
                marginTop: RH(2),
              }}
            />
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
                      'Bookvisitor',
                      {
                        user: this.state.user,
                        apartmentid: this.state.apartmentid,
                        sn: this.state.sn,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        phone: this.state.phone,
                        comments: this.state.comments,
                        date: this.state.date,
                        time: this.state.time,
                        email: this.state.email,
                      },
                      this.setState({touch: false}),
                    )
                  }>
                  <Text style={styles.text}>Edit Visitor Details</Text>
                  <View style={styles.line} />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.setState({touch2: true, touch: false})}>
                  <Text style={styles.text}>Remove Visitor</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.setState({touch: false})}>
              <View style={{height: '60%', width: '100%'}}></View>
            </TouchableOpacity>
          </View>
        ) : null}

        {this.state.touch2 ? (
          <View style={styles.popUp2}>
            <View style={styles.card2}>
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'center',
                  marginLeft: '15%',
                  marginRight: '15%',
                }}>
                {this.state.errors}
              </Text>

              <Image
                source={require('../img/rec.png')}
                style={{width: RW(15), height: RH(15)}}
                resizeMode="contain"
              />

              <Text style={{fontSize: RF(13)}}>Remove Visitor ?</Text>
              <Text style={styles.smalltext}>
                Are you sure you want to remove
              </Text>
              <Text style={styles.smalltext}>this visitor?</Text>

              <TouchableOpacity
                style={{
                  width: '90%',
                  height: '10%',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#F14336',
                  borderRadius: 6,
                  marginTop: RH(3),
                }}
                onPress={() => {
                  this.submit();
                }}>
                <Text style={{color: '#F14336'}}>Remove Visitor</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '90%',
                  height: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  marginTop: RH(3),
                }}
                onPress={() => this.setState({touch2: false})}>
                <Text style={{color: '#737A91'}}>Cancle Removal</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {this.state.isloading ? (
          <View style={styles.popUp3}>
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
  },
  box2: {
    height: '90%',
    width: RW(100),
    backgroundColor: '#FAFAFA',
  },

  h11: {
    fontSize: RF(13),
    marginLeft: RW(5),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: RF(10),
    fontWeight: 'bold',
    color: '#737A91',
    marginLeft: RW(5),
    marginTop: RH(1),
  },
  h4: {
    fontSize: RF(12),

    marginLeft: RW(5),
    fontWeight: 'bold',
    color: '#737A91',
    marginTop: RH(2),
  },
  h5: {
    fontSize: RF(10),
    fontWeight: 'bold',
    marginLeft: RW(5),
    marginTop: RH(3),
  },
  hg: {
    fontSize: RF(10),

    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#00921B',
    justifyContent: 'center',
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
  img: {
    height: RH(20),
    width: RW(20),
    marginBottom: 5,
  },
  text1: {
    fontSize: 25,

    marginTop: RH(2),
  },
  text2: {
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: 5,
  },
  text3: {
    textAlign: 'center',
    color: 'red',
  },
  card2: {
    height: '50%',
    width: '80%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  popUp2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smalltext: {
    color: '#737A91',
    marginTop: RH(1),
  },
  popUp3: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#737A91',
    marginTop: '8%',
    marginLeft: '5%',
    marginBottom: '8%',
    fontSize: RF(10),
  },
  line: {
    borderBottomWidth: 1,

    width: '100%',
    marginLeft: '5%',
  },
});
