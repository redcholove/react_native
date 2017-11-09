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
  Dimensions
} from 'react-native';


export default class LiveHome extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.Container}>
            <FlatList
            numColumns= {3}
          data={[
            {
                    key: 1,
                    name: '即時影像',
                    navigate: 'LiveViewList',
                    data: ''
                },
                {
                    key: 2,
                    name: '公車動態',
                    navigate: 'BusStatus',
                    data: ''
                },
                {
                    key: 3,
                    name: '實習室機位',
                    navigate: 'ComputerRoom',
                    data: ''
                },
                {
                    key: 4,
                    name: '淡水天氣',
                    navigate: 'Weather',
                    data: ''
                },
          ]}
          renderItem={
            ({item}) =>
            <TouchableOpacity onPress={() => navigate(item.navigate)} style={styles.View}>
            <Image source={require('./../../../../img/circle-icon.png')} style={styles.Image}/>
            <Text style={styles.Text}>{item.name}</Text>
        </TouchableOpacity>
          }
          />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  Container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: Dimensions.get('window').width,
      backgroundColor: 'white'
  },
  View: { 
      marginTop: 5,
      height: 130, 
      justifyContent:'center',
      alignItems: 'center',
      width: Dimensions.get('window').width / 3,
  },
  Image: {
        marginTop: 10,
        width: 100,
        height: 100
  },
  Text: {
      marginTop: 10
  }
});


AppRegistry.registerComponent('LiveHome', () => LiveHome);
