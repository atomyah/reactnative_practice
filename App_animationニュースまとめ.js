import React, {Component} from 'react';
import { 
  Text, 
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
 } from 'react-native';

class Spining extends Component {
    constructor(){
        super()
        this.state = {
            degree: new Animated.Value(0)
        }
    }
    componentDidMount(){
        this.animated()
    }
    componentWillUnmount(){
        this.animated=()=>{
            return false
        }
    }
    
    animated(){
        Animated.timing(
            this.state.degree,
            {
                toValue:1,
                duration:4000,
                easing: Easing.linear,
            }
        ).start(()=>{
            this.setState({degree: new Animated.Value(0)})
            this.animated()
        });
    }

    render(){
        const {degree} = this.state
        const _degree = degree.interpolate({
            inputRange: [0,1],
            outputRange:['0deg','360deg'],
        })
        return(
            <View>
                <Animated.Image
                source={require('./assets/cat.png')}
                style={{transform:[{rotate:_degree}]}}
                />
            </View>
        )
    }
}



export default class App extends Component {

  constructor(){
    super()
    this.state = {
      isLoading: true,
      threads: [],
      opacity: new Animated.Value(0),
      fontSize: new Animated.Value(0)
    }
  }


  componentWillMount(){
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


  animate(){
    Animated.timing(
        this.state.opacity,
        {
            toValue: 1,
            duration: 1000,
        }
    ).start();
    Animated.spring(
        this.state.fontSize, 
        {
            toValue:1,
            fricton:1
        }
    ).start();
  }

  render() {
    const { threads, isLoading, opacity, fontSize } = this.state
    const { width } = Dimensions.get('window')
    const _fontSize = fontSize.interpolate({
        inputRange: [0,1],
        outputRange: [0,12]
    })

    if(!isLoading)
        this.animate()

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {isLoading ? 
        <Spining/>: 
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
                    <Animated.Text style={{fontSize: _fontSize}}>{item.data.title}</Animated.Text>
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
