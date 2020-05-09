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

export default class Passwordreset extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Success
          label="Password Reset !"
          t1="You have successfully reset your password"
          t2="login and continue the good work you"
          t3="already started"
        />
        <View style={{marginTop: RH(10)}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(this.props.nav)}>
            <Button tx={this.props.but} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
});
