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
  Fetch
} from 'react-native';

import { List, ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

export default class ComputerRoom extends Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      data: []
    }
  }
  render() {
    let CalcData = [];    
    const { navigate } = this.props.navigation;
    fetch('http://tkuipcedu.tku.edu.tw:1689/TKU_iLife')
      .then((response) => response.text())
      .then((responseText) => {
        let res = responseText.split('<span id="Label1">');
        res = res[1].split('</span>');
        apiData = res[0].split("<br>");
        apiData.forEach(function(element,index,array) {
          let meta = element.split(',');
          if ( meta != '' ){
            let meta_obj = {};
            meta_obj.key = index;
            meta_obj.name = meta[0] + '   總共有' + meta[1] + ' 個機位';
            meta_obj.sub = '目前剩下' + meta[2] + ' 個機位';
            meta_obj.avatar_url = 'http://www.iconsdb.com/icons/preview/blue/square-xxl.png';
            CalcData.push(meta_obj);
          }
        });
        this.setState({
          data: CalcData
        });
      });    

      
    
    return (
      <View style={styles.container}>
        <List containerStyle={styles.list}>
        {
          this.state.data.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={{uri:l.avatar_url}}
              key={i}
              title={l.name}
              subtitle={l.sub}
              chevronColor='white'
              containerStyle={styles.list}
            />
          ))
        }
      </List>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 0
  },
  list: {
    marginTop: 0,
    borderTopWidth: 0, 
    borderBottomWidth: 0, 
    borderBottomColor: 'white'
  }
});



AppRegistry.registerComponent('ComputerRoom', () => ComputerRoom);
