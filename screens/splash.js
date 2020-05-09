import React from 'react';
import { Text, View , Image,Dimensions,ImageBackground,StyleSheet} from 'react-native';

import { RH, RW, RF } from '../resize';
const { height, width } = Dimensions.get('window');
export default class Splash extends React.Component {
   componentWillMount(){  

setTimeout(()=>{
  this.props.navigation.navigate("AppNavigator") 
}, 5000);
  }     
  render() {
    return (
               
        

<ImageBackground source={require('../img/splashimg.png')} style={{width: '100%', height: '100%',justifyContent:'center',alignItems:'center'}} 
resizeMode="cover"
>
 <View>
 <Image
                source={require('../img/logo.png')} 
                style={{width:RW(40), height:RH(20)}}
                resizeMode="contain"
              />

              <Image
                source={require('../img/Driver Pro.png')} 
                style={{width:RW(50), height:RH(35),marginTop:RH(-18),marginLeft:RW(-3)}}
                resizeMode="contain"
              />
         </View>
 </ImageBackground>         
     
    );
  }
}

const styles = StyleSheet.create({ 
name:{
  fontSize:RF(30),
  fontFamily:'name',
  color:'#FFFFFF',
 marginTop:'2%'
}
 
});
