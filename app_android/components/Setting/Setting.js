//聊天列表頁
import React, { Component } from 'react';

//UI元素
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
    AsyncStorage
} from 'react-native';

//UI套件
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    title: '淡江i生活系列',
    icon: 'school',
    navigate: 'TkuHome'
  },
  {
    title: '關於此app',
    icon: 'whatshot',
    navigate: 'AboutApp'
  },
  {
    title: '關於開發團隊',
    icon: 'group',
    navigate: 'AboutDevelop'
  },
  {
    title: '使用教學',
    icon: 'help',
    navigate: 'UseTeach'
  },
  {
    title: '新生專區',
    icon: 'face',
    navigate: 'NewStudent'
  },
  {
    title: '登出',
    icon: 'input',
    navigate: 'Main'
  },
]

const list2 = [
  {
    title: '問題回報',
    icon: 'warning',
    navigate: 'Report'
  },
  {
    title: '檢舉不良使用者',
    icon: 'report',
    navigate: 'ReportUser'
  },
  {
    title: '推薦功能',
    icon: 'highlight',
    navigate: 'AdviceFeature'
  },
  {
    title: '加入我們',
    icon: 'add',
    navigate: 'CareerJoin'
  },
]

export default class Setting extends Component {

  chooseList ( data ) {
      const { navigate } = this.props.navigation;
    if ( data == 'Main') {
        AsyncStorage.removeItem('Profile')
            .then((Profile_Local)=>{
                navigate(data)
            })
            .catch((error) => {
                console.error(error);
                console.log("can't find localStorage");
            })
    }else {
        navigate(data)
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
        <List>
          {
            list.map((item, i) => (
              <TouchableOpacity onPress={() => this.chooseList(item.navigate)}>
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
              />
              </TouchableOpacity>
            ))
          }
        </List>
        <List>
          {
            list2.map((item, i) => (
                <TouchableOpacity onPress={() => navigate(item.navigate)}>
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
              />
                </TouchableOpacity>
            ))
          }
        </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
});

AppRegistry.registerComponent('Setting', () => Setting);
