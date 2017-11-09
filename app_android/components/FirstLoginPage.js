//聊天列表頁
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
    Fetch,
    AsyncStorage,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

//照片上傳套件
import ImagePicker from 'react-native-image-crop-picker';
import GlobalStyle from './../Styles/Global_Style';

export default class FirstLoginPage extends Component {
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  constructor ( props ) {
    super ( props );
    this.state = {
      uri: require('./../img/no-image.jpg'),
      modalVisible: false,
      placeholder: '',
        nick_name: '',
        major: '',
        grade_num: '',
        image64: ''
    }
  }
  changeImg () {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      console.log( image );
      let newImg = { uri: image.path }
      this.setState({
        uri: newImg,
          image64: image
      });
    });
  }
  LoginFun () {
      AsyncStorage.getItem('Profile')
          .then((Profile_Local)=>{
              const Profile = JSON.parse(Profile_Local)

              var toServer = {
                  ac: Profile.AC,
                  name: this.state.nick_name,
                  major: this.state.major,
                  grade_num: this.state.grade_num,
                  image: this.state.image64.data
              }
              fetch('https://stu-web.tkucs.cc/402410855/test/public/api/FirstLoginDataCheck', {
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
                      console.log( responseData );
                      const { navigate } = this.props.navigation;
                      navigate('HomePage')
                  })
                  .catch((error) => {
                      console.error(error)
                      console.log('here error hi')
                  })

          })
  }
  render() {
    let Des = '請上傳清晰學生證正面照和正確的個人資料,'
    let Des2 = '經系統確認資料無誤,將會開通此帳號'
    let LoginText = '資料送出審核'
    return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
      >
        <ScrollView>  
          <View style={styles.ImageView}>
            <TouchableOpacity onPress={this.changeImg.bind(this)}>
              <Image source={ this.state.uri } style={styles.Card_Image}/>  
            </TouchableOpacity>        
          </View>      
          <View style={styles.TextView}>
            <Text style={styles.Description}>{Des}</Text>
            <Text style={styles.Description}>{Des2}</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.name_input} placeholder="暱稱(顯示在抽卡上的" onChangeText={(nick_name) => this.setState({nick_name})}>
            </TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.major_input} placeholder="科系:" onChangeText={(major) => this.setState({major})}>
            </TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.gradenum_input} placeholder="年級:" onChangeText={(grade_num) => this.setState({grade_num})}>
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={this.LoginFun.bind(this)}>
            <Text style={styles.buttonText}> {LoginText} </Text>
          </TouchableOpacity>
          </View>       
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: 35,
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageView: {
    flex: 1,
    alignSelf: 'center', 
    alignItems: 'center',    
    backgroundColor: 'white',
    justifyContent: 'center',
    width: GlobalStyle.Devicewidth,
    padding: GlobalStyle.Devicewidth * 0.1,
    paddingBottom: GlobalStyle.Devicewidth * 0.05
  },
  Card_Image: {
    width: GlobalStyle.Devicewidth * 0.8,
    height: GlobalStyle.Devicewidth * 0.8,
  },
  TextView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: GlobalStyle.Devicewidth * 0.8,
    marginLeft: GlobalStyle.Devicewidth * 0.1
  },
  Description: {
    color: GlobalStyle.mainColor,
    fontSize: 15,
    fontWeight: '800'
  },
  name_input: {
    height: 35,
    marginTop: GlobalStyle.Devicewidth * 0.05,
    borderColor: '#d0d0d0', 
    borderWidth: 1,
    fontSize: 15,
    borderRadius: 5,
    width: 250,
    padding: 3,
  },
  major_input: {
    fontSize: 15,
    height: 35,
    marginTop: GlobalStyle.DeviceHeight * 0.02,
    borderColor: '#d0d0d0', 
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    padding: 3,
  },
  gradenum_input: {
    fontSize: 15,
    height: 35,
    marginTop: GlobalStyle.DeviceHeight * 0.02,
    borderColor: '#d0d0d0', 
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    padding: 3,
  }
});

AppRegistry.registerComponent('FirstLoginPage', () => FirstLoginPage);
