import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
  Animated
 } from 'react-native';

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      isLoading: true,
      threads: [],
      opacity: new Animated.Value(0)
    }
  }


  animate(){
      Animated.timing(
          this.state.opacity,
          {
              toValue: 1,
              duration: 1000,
          }
      ).start();
  }

  componentDidMount(){

    fetch("https://www.reddit.com/r/newsokur/hot.json")
      .then((response) => response.json())
      .then((responseJson) => {
        let threads = responseJson.data.children
        threads = threads.map(i => {
          i.key = i.data.url
          return i
        })
        this.setState({threads: threads, isLoading: false})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const { threads, isLoading, opacity } = this.state
    const { width } = Dimensions.get('window')

    if(!isLoading)
        this.animate()
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {isLoading ? 
        <ActivityIndicator/> : 
        <Animated.View style={{opacity: opacity}}>
        <FlatList
          data={threads}
          renderItem={({item}) => {
            return (
              <View style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%'
              }}>
                <Image
                  style={{
                    width: 50,
                    height: 50
                  }}
                  source={{uri: item.data.thumbnail}}
                />
                <View style={{width: width - 50}}>
                  <View style={{flex:1, flexDirection: 'column'}}>
                    <Text>{item.data.title}</Text>
                    <Text style={{color: '#ababab', fontSize:10}}>{item.data.domain}</Text>
                  </View>
                </View>
              </View>
            )
        }}/> 
        </Animated.View> }
      </View>

    );
  }
}
