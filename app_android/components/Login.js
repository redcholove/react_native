import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Fetch,
    Alert,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';

import GlobalStyle  from './../Styles/Global_Style.js';

export default class Login extends Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      account: '',
      password: '',
        animating: false
    }
  }
    //偵測自動登入用
    componentWillMount (){
        const { navigate } = this.props.navigation;
        // navigate('Home')
        AsyncStorage.getItem('Profile')
            .then((Profile_Local)=>{
                const Profile = JSON.parse(Profile_Local)
                if ( Profile ) {
                    console.log('Profile_Local: ', Profile);
                    navigate('HomePage')
                }else {
                    console.log('Profile_Local: ', Profile);
                }
                return;
            })

    }

    LoginFun () {
      var self = this
        self.setState({animating: true})
      const Login_url = 'https://sso.tku.edu.tw/NEAI/login2.do?action=EAI';

      if ( this.state.account === '' ) {
          Alert.alert('請確實填寫帳號');
          self.setState({animating: false})
          return;
      }

      if ( this.state.password === '' ) {
          Alert.alert('請確實填寫密碼');
          self.setState({animating: false})
          return;
      }

      let formData = new FormData();
      formData.append('myurl','http://sso.tku.edu.tw/aissinfo/emis/tmw0012.aspx');
      formData.append('ln','zh_TW');
      formData.append('embed','No');
      formData.append('logintype','logineb');
      formData.append('username', this.state.account );
      formData.append('password', this.state.password );
      formData.append('loginbtn','登入');

      fetch( Login_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: formData,
      })
          .then((response) => {
              setTimeout(() => null, 0);
              return response.text();
          })
          .then((responseData) => {
              if ( responseData.match ('帳號或密碼輸入錯誤，請重新輸入') ) {
                  self.setState({animating: false})
                Alert.alert('學號或密碼輸入錯誤，請重新輸入');
                return;
              }else {
                  var toServer = {
                      stuid: this.state.account,
                      password: this.state.password
                  }

                  fetch('https://stu-web.tkucs.cc/402410855/test/public/api/register', {
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(toServer)
                  })
                      .then(response => {
                          setTimeout(() => null, 0);
                          return response.json();
                      })
                      .then((responseData) => {
                          console.log(responseData)
                          //第一次登入或為上傳個資->導入第一次登入頁面 status == 2
                          //已經登入過也上傳過個資,但還未審查通過->還沒辦法開放登入 status == 3
                          //已經登入過也上傳個資審核通過->直接進入首頁 status == 1
                          switch ( responseData.status ) {
                              case 1:
                                  console.log('case1')
                                  break;
                              case 2:
                                  console.log('case2')
                                  break;
                              case 3:
                                  console.log('case3')
                                  break;
                              default:
                                  //case 0 or something error
                                  console.log('something error')
                                  break;
                          }
                          Keyboard.dismiss();
                          const { navigate } = this.props.navigation;
                          const Profile_Local = 'Profile'
                          const ProfileObj = {Account: this.state.account, Password: this.state.password, AC: responseData.ac, imgUrl: responseData.imgUrl}
                          AsyncStorage.setItem(Profile_Local, JSON.stringify(ProfileObj))
                          self.setState({animating: false})
                          navigate('FirstLoginPage')
                      })
                      .catch((error) => {
                          console.error(error)
                      })
              }
          })
          .catch((error) => {
              this.setState( {
                  animating: false
              } )
              console.log( error );
              Alert.alert('網路連線錯誤');
          })

    //   const { navigate } = this.props.navigation;
    //   navigate('FirstLoginPage')
    //
    // // navigate('HomePage')
    //   var self = this
    //   self.setState({animating: true})
    //   setTimeout( function () {
    //       self.setState({animating: false})
    //       navigate('FirstLoginPage')
    //   }, 2000)
  }
  render() {
      const { navigate } = this.props.navigation;
    let LoginText = '登入';
    let RegisterLink = '請點擊此註冊';
    let Logo = 'Beta 0.17';
    
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="position"
        >
        <Text style={styles.logo}>{Logo}</Text>
        <ActivityIndicator
            animating={this.state.animating}
            size= 'large'
            color= '#9D9D9D'
            style={styles.loading}
        />
        <TextInput underlineColorAndroid='transparent' style={styles.stu_input} placeholder="學號:" onChangeText={(account) => this.setState({account})} onSubmitEditing={Keyboard.dismiss}>
        </TextInput>
        <TextInput underlineColorAndroid='transparent' secureTextEntry={true} style={styles.pass_input} placeholder="密碼:" onChangeText={(password) => this.setState({password})} onSubmitEditing={Keyboard.dismiss}>
        </TextInput>
        <TouchableOpacity style={styles.login_button} onPress={this.LoginFun.bind(this)} disabled={this.state.animating}>
          <Text style={styles.buttonText}> {LoginText} </Text>
        </TouchableOpacity>

          {/*<Text onPress={() => navigate('RegisterPage', { name: 'Jane' })} style={styles.registerLink}>{RegisterLink}</Text>*/}

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
      marginTop: GlobalStyle.DeviceHeight * 0.35,
    color: GlobalStyle.mainColor,
    fontWeight: '500',
    fontSize: 50,
  },
    loading: {
        marginTop: GlobalStyle.DeviceHeight * 0.05
    },
  stu_input: {
    height: 40,
      marginTop: GlobalStyle.DeviceHeight * 0.05,
    borderColor: '#d0d0d0', 
    borderWidth: 1,
    fontSize: 15,
    borderRadius: 5,
    width: 250,
    padding: 3,
  },
  pass_input: {
    fontSize: 15,
    height: 40,
      marginTop: GlobalStyle.DeviceHeight * 0.02,
    borderColor: '#d0d0d0', 
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    padding: 3,
  },
  login_button: {
    height: 40,
      marginTop: GlobalStyle.DeviceHeight * 0.02,
    borderRadius: 5,
    width: 250,
    padding: 1,
    backgroundColor: GlobalStyle.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400'
  },
  registerLink: {
    color: GlobalStyle.mainColor,
    fontSize: 15,
    fontWeight: '600',
      marginTop: GlobalStyle.DeviceHeight * 0.03
  }
});

AppRegistry.registerComponent('Login', () => Login);
