import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,ActivityIndicator,Image} from 'react-native';
import { RH, RW, RF } from '../resize';
import Button from '../components/button';
import Header1 from '../components/header1';
import { Dropdown } from 'react-native-material-dropdown';

export default class Maintenance extends React.Component {
  constructor(){
    super();
    this.state = {
           password:'',
           confirmpassword:'',
           isloading:false, 
           error:'',
           email:'',
           pin:'',
           data: [{
        value: 'CO-PRINCIPAL-RESIDENT',
        label: 'CO-PRINCIPAL-RESIDENT'
      }, {
        value: 'LANDLORD-OWNER',
        label: 'LANDLORD-OWNER'
      },
      {
        value: 'DEPENDENT',
        label: 'DEPENDENT'
      }],
      value:''
    }
  }



  

  render() {
    return ( 
      <View style={styles.container}>
        <View style={styles.box1}> 
         <TouchableOpacity onPress={() => this.props.navigation.goBack()}  style={{width:'80%',flexDirection:'row'}} > 
         <Image
                 source={require('../img/back.png')} 
                style={{width:RW(3), height:RH(3),marginLeft:RW(5),marginTop:RH(0.2)}}
                resizeMode="contain"
              />
             
             
              
               
       <Text style={styles.h11}>Maintenance Data Log</Text>
 
 </TouchableOpacity>
  </View>
       <View style={styles.box2}>
  

<Text style={{color:'grey', marginTop:RH(5), marginLeft:RW(5)}}>Odometer Readings </Text>

  <TextInput style={styles.textinput}  onChangeText ={password=>this.setState({password})}   />
  
  <Text style={{color:'grey', marginTop:RH(5), marginLeft:RW(5)}}>Maintenance Activity</Text>
<View style={styles.textinput}>
   <Dropdown
        value={this.state.label}
        inputContainerStyle={{borderBottomColor: 'transparent',marginBottom:RH(-0.9) }}
        data={this.state.data}
        pickerStyle={{}}
        
        dropdownOffset={{ 'top': 0 }}
        containerStyle = {styles.dropdown}
        onChangeText={(value)=> {this.setState({
          value
        });}}
      />
      </View>
  
<View style={{marginTop:RH(5)}}>
<TouchableOpacity onPress={()=>{this.submit()}}>
  <Button  
 tx='Submit'
 />
 </TouchableOpacity>
 

      </View> 
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
   height:'10%',
   width:RW(100),
  backgroundColor: '#FFFFFF',
  flexDirection:'row' ,
  elevation:2,
  alignItems:'center'
   
 },
 box2:{
   height:RH(90),
   width:RW(100),
  backgroundColor: '#FAFAFA',
   
 },
 h1:{
 fontSize:RF(15),
alignSelf:'center',
marginTop:RH(5), 
fontWeight:'bold'
 },
 h3:{
 fontSize:RF(10),
alignSelf:'center'
 },
 h11:{
 fontSize:RF(13),
marginLeft:RW(5),

fontWeight:'bold',
 },
 
textinput:{
  borderWidth:1,
   marginLeft:RW(5),
   width:RW(90),
   height:RH(6),
   borderRadius:5,
   borderColor:'#E9EBEE',
   padding:8}
});
