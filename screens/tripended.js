import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Success from '../components/success';
import Button from '../components/button';

export default class Tripended extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Success
          label="Password Updated !"
          //but='Continue'
          t1="Your password has been successfully"
          t2="updated"
        />
        <View style={{marginBottom: RH(30)}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Myprofile')}>
            <Button tx="Continue" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
