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
  Modal,
  TouchableHighlight,
  TextInput,
    AsyncStorage,
  Switch,
    Alert
} from 'react-native';

import { Icon } from 'react-native-elements'

import ImagePicker from 'react-native-image-crop-picker';

import GlobalStyle from './../../Styles/Global_Style';

export default class MyCard extends Component {
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  constructor ( props ) {
    super ( props );
    this.state = {
      uri: require('./../../img/no-image.jpg'),
      modalVisible: false,
      placeholder: '',
      text: '尚未填寫自我介紹',
        image64: ''
    }
  }
  //初始生命週期
  componentWillMount () {
    AsyncStorage.getItem('Profile')
        .then((Profile_Local)=>{
            const Profile = JSON.parse(Profile_Local)
            var toServer = {
                ac: Profile.AC
            }
            fetch('https://stu-web.tkucs.cc/402410855/test/public/api/GetMyCardDetail', {
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
                    if ( responseData.info.vImage != 0 || responseData.info.vImage != '' ) {
                        var newImg = {
                            uri: responseData.info.vImage,
                        }
                    }else {
                        var newImg = {
                            uri: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
                        }
                    }
                    if ( responseData.info.vDescription == '' ) {
                        responseData.info.vDescription = '尚未填寫自我介紹'
                    }

                    this.setState({
                        uri: newImg,
                        text: responseData.info.vDescription
                    })
                })
                .catch((error) => {
                    console.error(error)
                    console.log("fecth Post failed");
                })
        })
        .catch((error) => {
            console.error(error);
            console.log("can't find localStorage");
        })
  }
  changeImg () {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      let newImg = { uri: image.path }

        this.setState({
            uri: newImg,
            image64: image
        });

      this.UpdateProfileImg(image,newImg);
    });
  }
  UpdateProfileImg (image,newImg) {
      AsyncStorage.getItem('Profile')
          .then((Profile_Local)=>{
              const Profile = JSON.parse(Profile_Local)
              var toServer = {
                  ac: Profile.AC,
                  image: this.state.image64.data,
              }

              console.log('toServer: ', toServer);

              fetch('https://stu-web.tkucs.cc/402410855/test/public/api/EditMyCard', {
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
                      const templocal = 'Profile'
                      const tempobj = {
                          Account: Profile.Account,
                          Password: Profile.Password,
                          AC: Profile.AC,
                          imgUrl: responseData.imgUrl}
                      AsyncStorage.setItem(templocal, JSON.stringify(tempobj))

                      this.setState({
                          uri: newImg,
                          image64: image
                      });
                  })
                  .catch((error) => {
                      console.error(error)
                      Alert.alert('圖片上傳有誤');
                      return 0;
                  })
          })
          .catch((error) => {
              this.setState({
                  uri: require('./../../img/no-image.jpg'),
                  image64: ''
              });
              console.error(error);
          })
  }
  ChangeDes() {
      AsyncStorage.getItem('Profile')
          .then((Profile_Local)=>{
              const Profile = JSON.parse(Profile_Local)
              var toServer = {
                  ac: Profile.AC,
                  des: this.state.text
              }
              console.log( 'fuck' );
              fetch('https://stu-web.tkucs.cc/402410855/test/public/api/EditMyCard', {
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
                    console.log( responseData )
                    if ( responseData.status === 1 ) {
                      this.setModalVisible(!this.state.modalVisible)
                    }
                  })
                  .catch((error) => {
                      console.error(error)
                      Alert.alert('Server Failed');
                  })
          })
          .catch((error) => {
              Alert.alert("can't get localStorage");
              console.error(error);
          })
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>  
          <View style={styles.ImageView}>
          <View style={{
          flexDirection: 'row', 
          paddingRight: GlobalStyle.Devicewidth*0.1, 
          width: GlobalStyle.Devicewidth}}>
            <Switch style={styles.SwitchBar} onTintColor={GlobalStyle.mainColor}/>          
            <Text style={{
              marginTop: GlobalStyle.DeviceHeight*0.03}}>抽卡友</Text>
          </View>
            <TouchableOpacity onPress={this.changeImg.bind(this)}>
              <Image source={ this.state.uri } style={styles.Card_Image}/>  
            </TouchableOpacity>        
          </View>
          <View style={styles.TextView}>
            <Text style={styles.userName}></Text>
          </View>
          <View style={styles.TextView2}>  
            <View style={styles.edit_View}>
              <Icon 
              name="edit" 
              size={25} 
              color= {GlobalStyle.mainColor}
              onPress={() => this.setModalVisible(true)}/>
            </View> 
            <Text style={styles.descriptionText}>{this.state.text}</Text>                
          </View>
        </ScrollView>
             
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modal}>
          <View style={styles.modalheader}>
            <View style={styles.leftheader}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                <Text style={styles.button}>取消</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.rightheader}>
              <TouchableHighlight
                onPress={ this.ChangeDes.bind(this) }>
                <Text style={styles.button}>完成</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.modalinput}>
            <TextInput
              placeholder = 'ex...'
              style = {styles.inputText}
              multiline
              ditable = {true}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
         </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    marginLeft: GlobalStyle.Devicewidth * 0.075, 
    marginTop: GlobalStyle.DeviceHeight*0.3,
    height: GlobalStyle.DeviceHeight * 0.5, 
    width: GlobalStyle.Devicewidth * 0.85, 
    borderRadius: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1.5,
    alignItems: 'center'
  },
  modalheader: {
    flex: 1.5,
    backgroundColor: 'white',
    width: GlobalStyle.Devicewidth * 0.85,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  },
  modalinput: {
    flex: 8.5,
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  leftheader: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20
  },
  rightheader: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  button: {
    color: '#0072E3',
    fontWeight: '600',
    fontSize: 15
  },
  inputText: {
    padding: 10,
    width: GlobalStyle.Devicewidth * 0.85,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: GlobalStyle.DeviceHeight * 0.425  
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  ImageView: {
    flex: 2,
    alignSelf: 'center', 
    alignItems: 'center',    
    backgroundColor: 'white',
    justifyContent: 'center',
    width: GlobalStyle.Devicewidth,
  },
  Card_Image: {
    width: GlobalStyle.Devicewidth*0.8,
    height: GlobalStyle.Devicewidth*0.8,
    // marginTop: GlobalStyle.DeviceHeight*0.05
  },
  SwitchBar: {
    // alignSelf: 'flex-end', 
    margin: GlobalStyle.DeviceHeight*0.02,
    marginLeft: GlobalStyle.Devicewidth*0.1
  },
  TextView: {
    flex: 1,
    alignItems: 'center',
    width: GlobalStyle.Devicewidth*0.8,
    marginLeft: GlobalStyle.Devicewidth*0.1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    padding: GlobalStyle.DeviceHeight*0.04
  },
  userName:{
    fontSize: 22,
    fontWeight: '800',
    color: GlobalStyle.mainColor
  },
  TextView2: {
    flex: 1,
    alignItems: 'center',
    width: GlobalStyle.Devicewidth, 
  },
  edit_View: {
    height: GlobalStyle.DeviceHeight*0.05,
    alignItems: 'flex-end',
    width: GlobalStyle.Devicewidth*0.8,
    paddingTop: GlobalStyle.DeviceHeight*0.01
  },
  descriptionText: {
    marginTop: 20,
    fontWeight: '400',
    color: '#6C6C6C',
    lineHeight: 20,
    fontSize: 14
  }
});

AppRegistry.registerComponent('MyCard', () => MyCard);
