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


export default class BusStatus extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.Container}>
            <FlatList
            numColumns= {3}
          data={[
            {
                    key: 1,
                    name: '紅27',
                    navigate: 'SingleBus',
                    data: {
                        url: 'http://pda.5284.com.tw/MQS/businfo2.jsp?routename=%E7%B4%8527'
                    }
                },
                {
                    key: 2,
                    name: '紅28',
                    navigate: 'SingleBus',
                    data: {
                        url: 'http://pda.5284.com.tw/MQS/businfo2.jsp?routename=%E7%B4%8528'
                    }
                },
                {
                    key: 3,
                    name: '756',
                    navigate: 'SingleBus',
                    data: {
                        url: 'http://pda.5284.com.tw/MQS/businfo2.jsp?routeId=756'
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


AppRegistry.registerComponent('BusStatus', () => BusStatus);
