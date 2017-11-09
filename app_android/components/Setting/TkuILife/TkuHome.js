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


const data = [{
                    key: 1,
                    name: '我的課表',
                    navigate: 'ClassSchedule'
                },
                {
                    key: 2,
                    name: '考試小表',
                    navigate: 'TestSchedule'
                },
                {
                    key: 3,
                    name: '期中期末成',
                    navigate: 'ScoreSchedule'
                },
                {
                    key: 4,
                    name: '動態資訊',
                    navigate: 'LiveList'
                },
                {
                    key: 5,
                    name: '圖書館資訊',
                    navigate: 'LibraryList'
                },
                {
                    key: 6,
                    name: '校園資訊',
                    navigate: 'CampusList'
                }];


export default class TkuHome extends Component {
  WholeNews() {
  return data.map(function(news, i){
    return(
        <TouchableOpacity onPress={() => navigate(news.navigate)} style={styles.View}>
            <Image source={require('./../../../img/circle-icon.png')} style={styles.Image}/>
            <Text style={styles.Text}>{news.name}</Text>
        </TouchableOpacity>
    );
  });
}
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.Container}>
            <FlatList
            numColumns= {3}
          data={[
            {
                    key: 1,
                    name: '我的課表',
                    navigate: 'ClassSchedule'
                },
                {
                    key: 2,
                    name: '考試小表',
                    navigate: 'TestSchedule'
                },
                {
                    key: 3,
                    name: '期中期末成',
                    navigate: 'ScoreSchedule'
                },
                {
                    key: 4,
                    name: '動態資訊',
                    navigate: 'LiveHome'
                },
                {
                    key: 5,
                    name: '圖書館資訊',
                    navigate: 'LibraryHome'
                },
                {
                    key: 6,
                    name: '校園資訊',
                    navigate: 'CampusList'
                }
          ]}
          renderItem={
            ({item}) =>
            <TouchableOpacity onPress={() => navigate(item.navigate)} style={styles.View}>
            <Image source={require('./../../../img/circle-icon.png')} style={styles.Image}/>
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


AppRegistry.registerComponent('TkuHome', () => TkuHome);
