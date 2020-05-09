import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Image ,ActivityIndicator,AsyncStorage} from 'react-native';
import { RH, RW, RF } from '../resize';
import Button from '../components/button';
import Header1 from '../components/header1'
import { ScrollView } from 'react-native-gesture-handler';
import {endPoint} from '../components/baseapi';


export default class Forgotpword extends React.Component {
  constructor(props){
    super(props);
    this.state={
     password:'',
     email:'' ,
     errors:'',
     isloading: false,
     firstname:'',
     api_token:'',
     user:[]
    }
    
      }

      time=()=>{
        this.setState({isloading:false});
 
      }

      // updatePhoto=(new_url)=>{
      //   user = this.state.user;
      //   user.photo_uri = new_url;
      //   this.setState({user:user});
      // }
   



  render() {
    return (
      <View style={styles.container}>

<Header1 />
        
       <View style={styles.box1}>   
       <ScrollView>
       <Text style={styles.h1}>Forgot Your Password ?</Text>
  
        <Text style={styles.h3}> Enter the phone number you used when you </Text>
     <Text style={styles.h3}>joined and we'll send you instructions to reset  </Text>
     <Text style={styles.h3}>Your password </Text>
   

  
  <Text style={{color:'#737A91', marginTop:RH(5), marginLeft:RW(5),marginBottom:RH(1)}}>Phone Number</Text>

     <TextInput   style={styles.textinput}  onChangeText ={phone=>this.setState({phone})}  placeholder="Phone Number"  />
  
<View style={{marginTop:RH(6)}}>
<TouchableOpacity  onPress={() => this.props.navigation.navigate('Pin')}>  
  <Button  
 tx='Reset Password' 
 />
  </TouchableOpacity>
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',marginTop:RH(3)}}>
  <Text style={{color:'#737A91'}}> Remember your password? </Text>
  <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
 <Text style={{color:'#058BC5'}}> log in </Text>
  </TouchableOpacity>
  </View> 
 
      </View> 
      </ScrollView>
     </View> 
    
     {this.state.isloading? (
          <View style={styles.popUp}> 
      
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
 box1:{
   height:'90%',
   width:'100%',
  backgroundColor: '#FAFAFA',  
   
 },
 
 h1:{
 fontSize:RF(15),
alignSelf:'center',
marginTop:'10%', 
fontWeight:'bold',
marginBottom:RH(3)
 },
 h3:{
 fontSize:RF(10),
alignSelf:'center',
color:'#737A91'
 },
 popUp: { 
  position: 'absolute',   
width: '100%',
height: '100%',
backgroundColor: 'rgba(0, 0, 0, 0.8)',
justifyContent:'center',
alignItems:'center'
},
name:{
  fontSize:RF(25),
  fontFamily:'name',
  color:'#00921B',
 marginTop:'2%'
},
textinput:{
  borderWidth:1,
   marginLeft:RW(5),
   width:RW(90),
   height:RH(6),
   borderRadius:5,
   borderColor:'#058BC5',
   padding:8}
 
});
