import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Alert,
 } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state= {
      color: '#00f'
    }
  }

  showAlert() {
    Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
            {text: 'Blue', onPress: ()=> this.changeBGColor("#00f")},
            {text: 'Red', onPress:()=> this.changeBGColor("#f00"), stye: 'cancel'},
            {text: 'Green', onPress:() => this.changeBGColor("#0f0")},
        ],
        {cancelable:false}
    )
  }
  changeBGColor(hex){
    this.setState({color:hex})
  }

  render() {
      const { color } = this.state
        return (
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
      }}>
        <Button onPress={()=>this.showAlert()} title="show Alert"/>
      </View>
    );
  }
}


