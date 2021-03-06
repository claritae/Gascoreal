import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,ActivityIndicator,Image} from 'react-native';
import { RH, RW, RF } from '../resize';
import Button from '../components/button';
import Header1 from '../components/header1';


export default class Acknowlegdement extends React.Component {
  constructor(){
    super();
    this.state = {
           password:'',
           confirmpassword:'',
           isloading:false, 
           error:'',
           email:'',
           pin:'',
          
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
             
             
              
               
       <Text style={styles.h11}>Acknowlegdement Form</Text>
 
 </TouchableOpacity>
  </View>
       <View style={styles.box2}>
  

<Text style={{color:'grey', marginTop:RH(5), marginLeft:RW(5)}}>Agent's Name </Text>

  <TextInput style={styles.textinput}  onChangeText ={name=>this.setState({name})}   />

  <Text style={{color:'grey', marginTop:RH(5), marginLeft:RW(5)}}>Customer's Signature</Text>

  <TextInput style={styles.textinput2}  onChangeText ={liters=>this.setState({liters})}   />

  
 

   
  
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
 
 h11:{
 fontSize:RF(13),
marginLeft:RW(5),

fontWeight:'bold',
 },
 textinput2:{
  borderWidth:1,
   marginLeft:RW(5),
   width:RW(90),
   height:RH(16),
   borderRadius:5,
   borderColor:'#E9EBEE',
   padding:8},
 
textinput:{
  borderWidth:1,
   marginLeft:RW(5),
   width:RW(90),
   height:RH(6),
   borderRadius:5,
   borderColor:'#E9EBEE',
   padding:8}
});
