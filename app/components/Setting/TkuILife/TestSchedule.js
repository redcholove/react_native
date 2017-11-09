//聊天列表頁
import React, { Component } from 'react';

//UI元素
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  FlatList
} from 'react-native';

//UI套件
import { List, ListItem } from 'react-native-elements'



export default class TestSchedule extends Component {
    componentWillMount () {
        const { goBack } = this.props.navigation;
        Alert.alert('尚未有成績資料');
        goBack()
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <FlatList
          data={[
            {
              key: 1,
              Name: '資料庫',
              Room: 'E213',
              Time: '三/16:00~18:00',
              Teacher: '考試座號2/成績座號2'
            },
            {
              key: 2,
              Name: '資料庫',
              Room: 'E213',
              Time: '三/16:00~18:00',
              Teacher: '考試座號2/成績座號2'
            },
            {
              key: 3,
              Name: '資料庫',
              Room: 'E213',
              Time: '三/16:00~18:00',
              Teacher: '考試座號2/成績座號2'
            },
            {
              key: 4,
              Name: '資料庫',
              Room: 'E213',
              Time: '三/16:00~18:00',
              Teacher: '考試座號2/成績座號2'
            },
          ]}
          renderItem={({item}) => 
          <View style={styles.singleClass}>
          <View style={styles.halfClass}>
            <View style={styles.halfClassLeft}>
              <Text style={styles.classname}>{item.Name}</Text>
            </View>
            <View style={styles.halfClassRight}>
              <Text style={styles.classroom}>{item.Room}</Text>
            </View>
          </View>
          <View style={styles.halfClass}>
            <View style={styles.halfClassLeft}>
              <Text style={styles.classtime}>{item.Time}</Text>
            </View>
            <View style={styles.halfClassRight}>
              <Text style={styles.teachername}>{item.Teacher}</Text>
            </View>
          </View>
        </View>}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  singleClass: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.12,
    borderColor: '#d0d0d0',
    borderWidth: 0.5
    
  },
  halfClass: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row'
  },
  halfClassLeft: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  halfClassRight: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-end',
    padding: 10
  },
  classname: {
    fontSize: 16,
    fontWeight: '600'
  },
  classroom: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ADADAD',
  },
  classtime: {
    fontSize: 13,
    fontWeight: '200',
    color: 'blue'
  },
  teachername: {
    fontSize: 16,
    fontWeight: '600'
  }
});

AppRegistry.registerComponent('TestSchedule', () => TestSchedule);
