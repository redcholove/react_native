//聊天列表頁
import React, { Component } from 'react';

//UI元素
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
    ActivityIndicator,
    AsyncStorage,
    Alert
} from 'react-native';

import GlobalStyle from './../../../Styles/Global_Style.js';

export default class ClassSchedule extends Component {
    constructor ( props ) {
        super ( props );
        this.state = {
            data: [],
            animating: false
        }
    }
    PostFetch ( data, url, account ) {
        var self = this
          self.setState({animating: true})
        fetch( url, {
            method: 'POST',
            headers: {
                /* 9/25 Red Add */
                credentials: 'same-origin',
                'Content-Type': 'application/x-www-form-urlencoded',

            },
            body: data,
        })
            .then((response) => {
                setTimeout(() => null, 0);
                return response.text();
            })
            .then((responseData) => {
                if ( responseData.match ('如果要維持您的登入階段作業，請確定您的瀏覽器已經配置成可以接受') ) {
                    // console.log( 'first: ',responseData)
                    const { goBack } = this.props.navigation;
                    Alert.alert('抓不到cookie');
                    goBack();
                    return;
                }
                this.GetLoginStatus( account );
            })
            .catch((error) => {
                console.log(error)
                const { goBack } = this.props.navigation;
                Alert.alert('伺服器連線異常')
                goBack();
                return;
            })
    }
    GetLoginStatus ( account ) {
        fetch('http://sso.tku.edu.tw/aissinfo/emis/TMWC020.aspx')
            .then((response) => {
                setTimeout(() => null, 0);
                return response.text();
            })
            .then((responseData) => {
                this.GetClass( account );
            })
            .catch((error) => {
                console.log( error )
                const { goBack } = this.props.navigation;
                Alert('伺服器爬蟲有問題')
                goBack()
                return;
            })
            .done();
    }
    GetClass ( account ) {
        let url = 'http://sso.tku.edu.tw/aissinfo/emis/TMWC020_result.aspx?YrSem=1061&stu_no=' + account
        fetch( url )
            .then((response) => {
                setTimeout(() => null, 0);
                return response.text();
            })
            .then((responseData) => {
                if ( responseData.match ( '執行階段錯誤' ) ) {
                    Alert.alert('伺服器上發生應用程式錯誤。此應用程式的目前自訂錯誤設定因安全性考量，防止他人從遠端看見應用程式錯誤的詳細資訊。然而，可以使用本機伺服器電腦上的瀏覽器檢視。');
                    const { goBack } = this.props.navigation;
                    goBack()
                    return;
                }
                console.log('third: ' ,responseData)
                let res = responseData.split('<tr align="center">');
                let classSchedule = res[1].split('</tr><tr>');
                classSchedule.shift()
                classSchedule[classSchedule.length-1] = classSchedule[classSchedule.length-1].split('</tr>')[0]

                let CalcData = [];

                var Name;
                var Room;
                var Time;
                var Number;
                var Teacher;
                classSchedule.forEach(function(element,index,array) {
                    if ( element.match('<a href="')) {
                        let meta = element.split('<td')
                        //課堂名稱
                        Name = meta[4].split('align="left">')[1].split('<br>')[0]
                        //教授名稱
                        //上課教室
                        Room = meta[12].split('align="left">')[1].split('</td>')[0].split('/')[2]
                        //上課時間

                        var tempTime = meta[12].split('align="left">')[1].split('</td>')[0]
                        Time = tempTime.split('/')[0] + '/' + tempTime.split('/')[1]
                        //座號
                        Number = meta[13].split('align="center">')[1].split('</td>')[0]

                        Teacher = '(座號:' + Number + ')' + meta[11].split('align="center">')[1].split('</td>')[0]


                        var obj = {
                            key: index,
                            Name: Name,
                            Room: Room,
                            Time: Time,
                            Teacher: Teacher
                        }
                        CalcData.push(obj)

                    }else {
                        var tempTime = element.split('<td align="left">')[3].split('</td>')[0]
                        Time = tempTime.split('/')[0] + '/' + tempTime.split('/')[1]
                        Room = tempTime.split('/')[2]
                        var obj = {
                            key: index,
                            Name: Name,
                            Room: Room,
                            Time: Time,
                            Teacher: Teacher
                        }
                        CalcData.push(obj)

                    }
                });
                this.setState({
                    data: CalcData
                })
                var self = this
                self.setState({animating: false})
            })
            .catch((error) => {
                console.log('error: ', error);
                const { goBack } = this.props.navigation;
                Alert.alert('伺服器連線異常');
                goBack()
            })
            .done();
    }
    componentWillMount () {
        AsyncStorage.getItem('Profile')
            .then((Profile_Local)=>{
                const Profile = JSON.parse(Profile_Local)
                console.log( 'Async: ' , Profile );
                const Login_url = 'https://sso.tku.edu.tw/NEAI/login2.do?action=EAI'

                let formData = new FormData();
                formData.append('myurl','http://sso.tku.edu.tw/aissinfo/emis/tmw0012.aspx');
                formData.append('ln','zh_TW');
                formData.append('embed','No');
                formData.append('logintype','logineb');
                formData.append('username',Profile.Account);
                formData.append('password',Profile.Password);
                formData.append('loginbtn','登入');

                try {
                    this.PostFetch( formData, Login_url, Profile.Account );
                }catch ( err ) {
                    console.log( err );
                    Alert.alert( err );
                }
            })


    }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <ActivityIndicator
              animating={this.state.animating}
              size= 'large'
              color= '#9D9D9D'
              style={styles.loading}
          />
      <FlatList
          data={this.state.data}
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
    backgroundColor: 'white',
    width: GlobalStyle.Devicewidth,
      alignItems: 'center',
      justifyContent: 'center'
  },
  singleClass: {
    height: GlobalStyle.DeviceHeight * 0.12,
    width: GlobalStyle.Devicewidth,
    backgroundColor: 'white',
    borderColor: '#d0d0d0',
    borderWidth: 0.5
  },
  halfClass: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  halfClassLeft: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  halfClassRight: {
    flex: 1,
    backgroundColor: 'white',
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
      color: GlobalStyle.mainColor
  },
  teachername: {
    fontSize: 16,
    fontWeight: '600'
  },
    loading: {
        position: 'absolute',

    },
});

AppRegistry.registerComponent('ClassSchedule', () => ClassSchedule);
