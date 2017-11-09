import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Fetch,
  Keyboard
} from 'react-native';

import GlobalStyle from './../Styles/Global_Style';

export default class Register extends Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      mail: '',
    }
  }
  RegisterButton () {
    if ( !this.state.mail.match('.tku.edu.tw') ) {
      alert('請符合淡江信箱格式! ex...40xxxxxxx@s02.tku.edu.tw');
      return 0;
    }
    let stu_id = this.state.mail.split('@')[0];
    let toServer = {
      stuid: stu_id,
      mail: this.state.mail
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
      // console.log( 'data: ', responseData );
      Alert.alert(responseData.message)
    })
    .catch((error) => {
      console.error(error)
    })
  }


  render() {
    const { goBack } = this.props.navigation;
    let Variabe = {
      LoginText: '註冊',
      RegisterLink: '已經註冊過了嗎？點擊登入',
      Logo: 'App Name'
    }
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{Variabe.Logo}</Text>
        <TextInput style={styles.stu_input} placeholder="請輸入學校信箱" onSubmitEditing={Keyboard.dismiss} onChangeText={(mail) => this.setState({mail})}></TextInput>
        <TouchableOpacity style={styles.login_button} onPress={this.RegisterButton.bind(this)}>
          <Text style={styles.buttonText}> {Variabe.LoginText} </Text>
        </TouchableOpacity>
        <Text onPress={() => goBack()} style={styles.registerLink}>{Variabe.RegisterLink}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginTop: GlobalStyle.DeviceHeight * 0.4,
    color: GlobalStyle.mainColor,
    fontWeight: '500',
    fontSize: 50,
  },
  stu_input: {
    height: 35,
    marginTop: GlobalStyle.DeviceHeight * 0.05,
    borderColor: '#d0d0d0', 
    borderWidth: 1,
    fontSize: 15,
    borderRadius: 5,
    width: 220,
    padding: 2,
  },
  login_button: {
    height: 35,
    marginTop: GlobalStyle.DeviceHeight * 0.05,
    borderRadius: 5,
    width: 220,
    padding: 1,
    backgroundColor: GlobalStyle.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  registerLink: {
    color: GlobalStyle.mainColor,
    fontSize: 15,
    marginTop: GlobalStyle.DeviceHeight * 0.05
  }
});

AppRegistry.registerComponent('Register', () => Register);
