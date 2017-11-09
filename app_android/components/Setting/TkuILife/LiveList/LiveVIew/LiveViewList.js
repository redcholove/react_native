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



export default class LiveViewList extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.Container}>
            <FlatList
            numColumns= {3}
          data={[
            {
                    key: 1,
                    name: '商管三樓電梯',
                    navigate: 'LiveView',
                    data: {
                        name: '商管三樓電梯',
                        imgUrl: 'http://163.13.240.165/cam5.jpg'
                    }
                },
                {
                    key: 2,
                    name: '籃球場',
                    navigate: 'LiveView',
                    data: {
                        name: '籃球場',
                        imgUrl: 'http://163.13.240.165/cam4.jpg'
                    }
                },
                {
                    key: 3,
                    name: '五虎剛排球場',
                    navigate: 'LiveView',
                    data: {
                        name: '五虎剛排球場',
                        imgUrl: 'http://163.13.240.165/cam7.jpg'
                    }
                },
                {
                    key: 4,
                    name: '郵局',
                    navigate: 'LiveView',
                    data: {
                        name: '郵局',
                        imgUrl: 'http://163.13.240.165/cam8.jpg'
                    }
                },
                {
                    key: 5,
                    name: '紅27',
                    navigate: 'LiveView',
                    data: {
                        name: '紅27',
                        imgUrl: 'http://163.13.240.165/cam2.jpg'
                    }
                },
                {
                    key: 6,
                    name: '紅28',
                    navigate: 'LiveView',
                    data: {
                        name: '紅28',
                        imgUrl: 'http://163.13.240.165/cam1.jpg'
                    }
                },
                {
                    key: 7,
                    name: '操場',
                    navigate: 'LiveView',
                    data: {
                        name: '操場',
                        imgUrl: 'http://163.13.240.165/cam3.jpg'
                    }
                },
                {
                    key: 8,
                    name: '羽球場',
                    navigate: 'LiveView',
                    data: {
                        name: '羽球場',
                        imgUrl: 'http://163.13.240.165/cam9.jpg'
                    }
                },
          ]}
          renderItem={
            ({item}) =>
            <TouchableOpacity onPress={() => navigate(item.navigate, item.data)} style={styles.View}>
            <Image source={require('./../../../../../img/circle-icon.png')} style={styles.Image}/>
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


AppRegistry.registerComponent('LiveViewList', () => LiveViewList);
