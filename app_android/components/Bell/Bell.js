//聊天列表頁
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions
} from 'react-native';

import BellDetail from "./BellDetail";
import GlobalStyle from './../../Styles/Global_Style';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

class Bell extends Component {
    componentWillReceiveProps(nextProps) {
        // console.log( nextProps )
        if (!this.props.isFocused && nextProps.isFocused) {
            // screen enter (refresh data, update ui ...)
            console.log('Bell onFocus')
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // screen exit
            // console.log('im not focus')
        }
    }
  render() {
      const { navigate } = this.props.navigation;
      // console.log('state: ', this.props.navigation.state)
      return (
      <View style={styles.container}>
        <FlatList
          data={[
            {
              key: 1,
              User: '淡江大學',
              Content: '本校擒拿FIRA-2金6銀1銅',
                route: 'BellDetail',
                img: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/db/Tamkang_University_logo.svg/1200px-Tamkang_University_logo.svg.png',
                data : {
                    meta: 'http://tkutimes.tku.edu.tw/dtl.aspx?no=35655'
                }
            },
            {
              key: 2,
              User: '西語系辦',
              Content: '9月21日更新教室異動通知',
                route: 'BellDetail',
                img: 'http://www2.tku.edu.tw/~teix/CSIE/images/stories/CSIElogo2008.jpg',
                data : {
                    meta: 'http://www.tfsx.tku.edu.tw/news/news.php?Sn=1773'
                }
            },
            {
              key: 3,
              User: '烙鍊',
              Content: '傳送了一則訊息給你',
                img: 'https://scontent.ftpe4-1.fna.fbcdn.net/v/t1.0-9/17342818_1382639105089542_1765618018375246307_n.jpg?oh=3af049bf48ee6e198b3894400a5a7922&oe=5A86C6DF',
                route: 'Friends',
                data : {
                    meta: 'http://tkutimes.tku.edu.tw/dtl.aspx?no=35655'
                }
            },
          ]}
          renderItem={({item}) => 
            <TouchableOpacity style={styles.item} onPress={ () => navigate( item.route, item.data ) }>
              <View style={styles.ImageView}>
                <Image source={ {uri: item.img } } style={styles.ProfileImg}></Image>
              </View>
              <View style={styles.TextView}>
                <Text style={styles.UserName}>{item.User}</Text>
                <Text style={styles.text}>{item.Content}</Text>                                
              </View>
            </TouchableOpacity>
        }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  item: {
    height: GlobalStyle.DeviceHeight*0.1,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  ImageView: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center'
  },
  TextView: {
      flex: 8,
      justifyContent: 'center',
  },
  ProfileImg: {
    height: GlobalStyle.DeviceHeight*0.08,
    width: GlobalStyle.DeviceHeight*0.08,
      borderRadius: 30
  },
  UserName: {
    fontSize: 18,
    color: 'blue'
  },
  text: {
    marginTop: 2,
    fontSize: 16,
  }
});

// AppRegistry.registerComponent('Bell', () => Bell);
export default withNavigationFocus(Bell, 'Bell')
