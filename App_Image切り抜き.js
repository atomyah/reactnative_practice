import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Image,
  ImageStore,
  ImageEditor
 } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state= {
      position: {},
      uri: ""
    }
  }

cropImage(uri){
    Image.getSize(uri, (width,height)=>{
        let cropData = {
            offset: {
                y: height / 3,
                x: width / 3
            },
            size: {
                height: height / 3,
                width: width / 3,
            },
        }

        ImageEditor.cropImage(
           uri,
           cropData,
           (result) => {
               ImageStore.hasImageForTag(result, (hasImage)=>{
                   if(hasImage > 0){
                       this.setState({uri:result})
                   }
               },(e) =>{
                   console.warn(e)
               })
           },
           (e)=> {
               console.warn(e)
           }
        )
    })
}

  render() {
      const { position, uri } = this.state
        return (
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
      }}>
                <Image
                    style={{
                        width: 50,
                        height: 50
                    }}
                    source={{uri: uri}}
                />
                <Image 
                    style={{
                        width: 50,
                        height: 50
                    }}
                    source={require('./cat.png')}
                />
                <Button onPress={()=>{this.cropImage('https://benzoinfojapan.org/assets/images/brad_prof.png')}} title={"crop a picture."}/>
            </View>
    );
  }
}


