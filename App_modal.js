import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Modal,
 } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state= {
      isVisible: false
    }
  }

  showModal() {
    this.setState({isVisible: true})
  }
  closeModal() {
    this.setState({isVisible: false})
  }

  render() {
    return (
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Modal 
        visible={this.state.isVisible} 
        transparent={false} 
        animationType={"slide" || "fade"} 
        resentationStyle={'fullScreen' || 'pageSheet' || 'formSheet' || 'overFullScreen'}
        >
          <View stle={{
            flex:1,
            justifyContent:'center',
            alignItems: 'center',
            backgroundColor: '#111111',
          }}>
            <Button onPress={()=>this.closeModal()} title="close modal"/>
          </View>
        </Modal>
        <Button onPress={()=>this.showModal()} title="show modal"/>
      </View>
    );
  }
}


