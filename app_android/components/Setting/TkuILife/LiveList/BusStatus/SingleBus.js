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


export default class SingleBus extends Component {
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (

        <WebView
        source={{uri: params.url}}
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


AppRegistry.registerComponent('SingleBus', () => SingleBus);
