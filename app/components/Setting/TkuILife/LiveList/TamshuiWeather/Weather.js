//聊天列表頁
import React, { Component } from 'react';

//UI元素
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  WebView
} from 'react-native';


export default class Weather extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (

        <WebView
        source={{uri: 'http://www.cwb.gov.tw//m/f/town368/6501000.php'}}
        style={styles.Container}/>
    );
  }
}


const styles = StyleSheet.create({
  Container: {
      flex: 1,
      width: Dimensions.get('window').width,
      backgroundColor: 'white'
  },
});


AppRegistry.registerComponent('Weather', () => Weather);
