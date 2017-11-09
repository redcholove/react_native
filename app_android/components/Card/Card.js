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
    Alert,
    AsyncStorage
} from 'react-native';

import { Icon } from 'react-native-elements'
import GlobalStyle from './../../Styles/Global_Style';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

class Card extends Component {
  
  static navigationOptions = ({ navigation }) => ({
          headerRight:(
          <TouchableOpacity onPress={ () => navigation.navigate('MyCard')}>
            <Icon
            name='person'
            color='#d0d0d0'
            size= {30}
            style={{marginRight: 10}}/>
          </TouchableOpacity>
          )
  });
    constructor ( props ) {
        super ( props );
        this.state = {
            reportModal: false,
            inviteModal: false,
            reportStatus: false,
            errorImg_uri: require('./../../img/tku_beauty.png'),
            cardImg_uri: require('./../../img/no-image.jpg'),
            card_des: '自我介紹區',
            reportText: '',
            inviteText: '',
            error: false,
            friendship: false,
            inviteStatus: false, //true代表已經送出好友邀請
            tomorrowGetCard: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log( nextProps )
        if (!this.props.isFocused && nextProps.isFocused) {
            // screen enter (refresh data, update ui ...)
            this.componentWillMount();
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // screen exit
        }
    }

    componentWillMount () {
        AsyncStorage.getItem('Profile')
            .then((Profile_Local)=>{
                const Profile = JSON.parse(Profile_Local)
                var toServer = {
                    ac: Profile.AC
                }
                if ( Profile.imgUrl == '' ) {
                    // Alert.alert('請先上傳個人照片才能參與抽卡');
                    this.setState ({
                        error: true
                    })
                    return;
                }
                fetch('https://stu-web.tkucs.cc/402410855/test/public/UserGetCard', {
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
                        if ( responseData.image == '' ) {
                            responseData.image = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'
                        }
                        var newImg = {
                            uri: responseData.image,
                        }

                        if ( responseData.friendship ) {
                            this.setState( {
                                friendship: true,
                            } )
                        }

                        if ( responseData.status == 2 ) {
                            this.setState( {
                                tomorrowGetCard: true,
                            } )
                        }

                        this.setState({
                            cardImg_uri: newImg,
                            card_des: responseData.des,
                            inviteStatus: responseData.invitestatus
                        })


                        console.log( 'inviteStatus: ', this.state.inviteStatus )
                        console.log( 'tomorrowGetCard: ', this.state.tomorrowGetCard );
                        console.log( 'friendship: ' , this.state.friendship );
                        console.log( 'error: ', this.state.error );
                    })
                    .catch((error) => {
                        console.error(error)
                        console.log("fecth Post failed");
                        this.setState ({
                            error: true
                        })
                    })
            })
            .catch((error) => {
                console.error(error);
                console.log("can't find localStorage");
                this.setState ({
                    error: true
                })
            })
    }

    setreportModal( value ) {
        this.setState( {reportModal: value} );
    }
    setinviteModal( value ) {
        this.setState( {
            inviteModal: value,
        } )
    }
    inviteStatus( value ) {
        this.setState({inviteStatus: value});
    }
    reportStatus( value ) {
        this.setState( {
            reportStatus: value
        } )
    }
    sendInviteLetter () {
        this.setinviteModal(!this.state.inviteModal)
        this.inviteStatus(true)
        AsyncStorage.getItem('Profile')
            .then((Profile_Local)=>{
                const Profile = JSON.parse(Profile_Local)
                var toServer = {
                    ac: Profile.AC,
                    content: this.state.inviteText
                }
                fetch('https://stu-web.tkucs.cc/402410855/test/public/api/sentInvite', {
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
                        if ( responseData.friendship ) {
                            this.setState( {
                                friendship: true,
                            } )
                            Alert.alert('你和對方已成為好友');
                        }
                        // var newImg = {
                        //     uri: responseData.image,
                        // }
                        // this.setState({
                        //     cardImg_uri: newImg,
                        //     card_des: responseData.des
                        // })
                    })
                    .catch((error) => {
                        console.error(error)
                        console.log("fecth Post failed");
                        this.setState ({
                            error: true
                        })
                    })
            })
            .catch((error) => {
                console.error(error)
            })
    }
    sendReportLetter() {
        this.setreportModal(!this.state.reportModal)
        this.reportStatus(true)
    }
    errorButton () {
        console.log('hi')
        AsyncStorage.getItem('Profile')
            .then((Profile_Local)=>{
                const Profile = JSON.parse(Profile_Local)
                var toServer = {
                    ac: Profile.AC
                }
                if ( Profile.imgUrl == '' ) {
                    Alert.alert('請先上傳個人照片才能參與抽卡');
                    const { navigate } = this.props.navigation;
                    navigate('MyCard')
                    // this.setState ({
                    //     error: true
                    // })
                    return;
                }
                fetch('https://stu-web.tkucs.cc/402410855/test/public/UserGetCard', {
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

                        if ( responseData.image == '' ) {
                            responseData.image = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'
                        }

                        var newImg = {
                            uri: responseData.image,
                        }

                        if ( responseData.friendship ) {
                            this.setState( {
                                friendship: true,
                            } )
                        }

                        if ( responseData.status == 2 ) {
                            this.setState( {
                                tomorrowGetCard: true,
                            } )
                        }

                        this.setState({
                            cardImg_uri: newImg,
                            card_des: responseData.des,
                            inviteStatus: responseData.invitestatus,
                            error: false
                        })


                        console.log( 'inviteStatus: ', this.state.inviteStatus )
                        console.log( 'tomorrowGetCard: ', this.state.tomorrowGetCard );
                        console.log( 'friendship: ' , this.state.friendship );
                        console.log( 'error: ', this.state.error );
                    })
                    .catch((error) => {
                        console.error(error)
                        console.log("fecth Post failed");
                        this.setState ({
                            error: true
                        })
                    })
            })
            .catch((error) => {
                console.error(error);
                console.log("can't find localStorage");
                this.setState ({
                    error: true
                })
            })
    }
    render() {
        let Button_Text = '送 出 邀 請';
        let Report_Text = '檢 舉';
        let Sended = '已送出邀請';
        let BeFriend = '已成為好友';
        let button = null;


        if (!this.state.inviteStatus) {
            button = <TouchableOpacity
                style={styles.sent_button}
                onPress={() => this.setinviteModal(true)}>
                <Text style={styles.buttonText}> {Button_Text} </Text>
            </TouchableOpacity>;
        } else if ( this.state.inviteStatus && !this.state.friendship ){
            button = <TouchableOpacity
                style={styles.sented_button}>
                <Text style={styles.sented_text}> {Sended} </Text>
            </TouchableOpacity>;
        }else if ( this.state.inviteStatus && this.state.friendship ){
            button = <TouchableOpacity
                style={styles.sented_button}>
                <Text style={styles.sented_text}> {BeFriend} </Text>
            </TouchableOpacity>;
        }


        if ( this.state.error ) {
            Content = <ScrollView>
                <View style={styles.ImageView}>
                    <Image  source={ this.state.errorImg_uri } style={styles.Card_Image_Error}/>
                </View>
                <View style={styles.TextView}>
                    <Text style={styles.userName}>美麗的宮燈大道</Text>
                    <Text style={styles.descriptionText}>
                        似乎出了點問題呢...要重整看看嗎{'\n'}
                    </Text>
                    <TouchableOpacity
                        style={styles.sent_button}
                        onPress={() => this.errorButton()}>
                        <Text style={styles.buttonText}> 重新整理 </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        } else if ( this.state.tomorrowGetCard ) {
            Content = <ScrollView>
                <View style={styles.ImageView}>
                    <Image  source={ this.state.errorImg_uri } style={styles.Card_Image_Error}/>
                </View>
                <View style={styles.TextView}>
                    <Text style={styles.userName}>美麗的宮燈大道</Text>
                    <Text style={styles.descriptionText}>
                        抽卡程序已過～明天才能抽卡喔～{'\n'}
                    </Text>
                </View>
            </ScrollView>
        } else{
            Content =  <ScrollView>
                <View style={styles.ImageView}>
                    <TouchableOpacity
                        style={styles.report_button}
                        onPress={() => this.setreportModal( true )}>
                        <Text style={styles.reportText}> {Report_Text} </Text>
                    </TouchableOpacity>
                    <Image source={ this.state.cardImg_uri } style={styles.Card_Image}/>
                </View>
                <View style={styles.TextView}>
                    <Text style={styles.userName}>匿名</Text>
                    <Text style={styles.descriptionText}>
                        {this.state.card_des}
                    </Text>
                    {button}
                </View>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.reportModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalheader}>
                            <View style={styles.leftheader}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setreportModal(!this.state.reportModal)
                                    }}>
                                    <Text style={styles.button}>取消</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.rightheader}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.sendReportLetter()
                                    }}>
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
                                onChangeText={(reportText) => this.setState({reportText})}
                                value={this.state.reportText}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.inviteModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalheader}>
                            <View style={styles.leftheader}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setinviteModal(!this.state.inviteModal)
                                    }}>
                                    <Text style={styles.button}>取消</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.rightheader}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.sendInviteLetter()
                                    }}>
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
                                onChangeText={(inviteText) => this.setState({inviteText})}
                                value={this.state.inviteText}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            ;
        }
        return (
            <View style={styles.container}>
                {Content}
            </View>
        );
    }

  render() {
    let Button_Text = '送 出 邀 請';
    let Report_Text = '檢 舉';
    let Sended = '已送出邀請';
    let BeFriend = '已成為好友';
    let button = null;

    
    if (!this.state.inviteStatus) {
      button = <TouchableOpacity 
            style={styles.sent_button}
            onPress={() => this.setinviteModal(true)}>
              <Text style={styles.buttonText}> {Button_Text} </Text>
          </TouchableOpacity>;
    } else if ( this.state.inviteStatus && !this.state.friendship ){
      button = <TouchableOpacity 
            style={styles.sented_button}>
              <Text style={styles.sented_text}> {Sended} </Text>
          </TouchableOpacity>;
    }else if ( this.state.inviteStatus && this.state.friendship ){
        button = <TouchableOpacity
            style={styles.sented_button}>
            <Text style={styles.sented_text}> {BeFriend} </Text>
        </TouchableOpacity>;
    }


    if ( this.state.error ) {
      Content = <ScrollView>      
          <View style={styles.ImageView}>
            <Image  source={ this.state.errorImg_uri } style={styles.Card_Image_Error}/>
          </View>
          <View style={styles.TextView}>
              <Text style={styles.userName}>美麗的宮燈大道</Text>
              <Text style={styles.descriptionText}>
              似乎出了點問題呢...要重整看看嗎{'\n'}
              </Text>
            <TouchableOpacity 
            style={styles.sent_button}
            onPress={() => this.errorButton()}>
              <Text style={styles.buttonText}> 重新整理 </Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
    } else if ( this.state.tomorrowGetCard ) {
        Content = <ScrollView>
            <View style={styles.ImageView}>
                <Image  source={ this.state.errorImg_uri } style={styles.Card_Image_Error}/>
            </View>
            <View style={styles.TextView}>
                <Text style={styles.userName}>美麗的宮燈大道</Text>
                <Text style={styles.descriptionText}>
                    抽卡程序已過～明天才能抽卡喔～{'\n'}
                </Text>
            </View>
        </ScrollView>
    } else{
      Content =  <ScrollView>      
                <View style={styles.ImageView}>
                  <TouchableOpacity 
                    style={styles.report_button} 
                    onPress={() => this.setreportModal( true )}>
                      <Text style={styles.reportText}> {Report_Text} </Text>
                  </TouchableOpacity>
                  <Image source={ this.state.cardImg_uri } style={styles.Card_Image}/>
                </View>
                <View style={styles.TextView}>
                    <Text style={styles.userName}>匿名</Text>
                    <Text style={styles.descriptionText}>
                        {this.state.card_des}
                    </Text>
                  {button}
                </View>

                <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={this.state.reportModal}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  >
                <View style={styles.modal}>
                  <View style={styles.modalheader}>
                    <View style={styles.leftheader}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setreportModal(!this.state.reportModal)
                        }}>
                        <Text style={styles.button}>取消</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.rightheader}>
                      <TouchableHighlight
                        onPress={() => {
                          this.sendReportLetter()
                        }}>
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
                      onChangeText={(reportText) => this.setState({reportText})}
                      value={this.state.reportText}
                    />
                  </View>
                </View>
                </Modal>
                  <Modal
                      animationType={"slide"}
                      transparent={true}
                      visible={this.state.inviteModal}
                      onRequestClose={() => {alert("Modal has been closed.")}}
                  >
                      <View style={styles.modal}>
                          <View style={styles.modalheader}>
                              <View style={styles.leftheader}>
                                  <TouchableHighlight
                                      onPress={() => {
                                          this.setinviteModal(!this.state.inviteModal)
                                      }}>
                                      <Text style={styles.button}>取消</Text>
                                  </TouchableHighlight>
                              </View>
                              <View style={styles.rightheader}>
                                  <TouchableHighlight
                                      onPress={() => {
                                          this.sendInviteLetter()
                                      }}>
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
                                  onChangeText={(inviteText) => this.setState({inviteText})}
                                  value={this.state.inviteText}
                              />
                          </View>
                      </View>
                  </Modal>
              </ScrollView>
      ;
    }
    return (
      <View style={styles.container}>
      {Content}
     </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginLeft: GlobalStyle.Devicewidth * 0.075, 
    marginTop: GlobalStyle.DeviceHeight * 0.2,
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
    paddingRight: GlobalStyle.Devicewidth*0.05
  },
  button: {
    color: '#0072E3',
    fontWeight: '600',
    fontSize: 20
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
    backgroundColor: 'white'
  },
  ImageView: {
    flex: 2,
    alignSelf: 'center', 
    alignItems: 'center',    
    width: GlobalStyle.Devicewidth * 0.8,
    height: GlobalStyle.Devicewidth * 0.8,
    backgroundColor: 'white'
  },
  TextView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  Card_Image: {
    height: GlobalStyle.Devicewidth*0.6,
    width: GlobalStyle.Devicewidth*0.6
  },
  Card_Image_Error: {
    marginTop: GlobalStyle.DeviceHeight*0.15,
    height: GlobalStyle.Devicewidth*0.6,
    width: GlobalStyle.Devicewidth*0.9
  },
  sent_button: {
    height: 35,
    marginTop: 5,
    borderRadius: 5,
    width: 180,
    padding: 1,
    backgroundColor: GlobalStyle.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sented_button: {
    height: 35,
    marginTop: 5,
    borderRadius: 5,
    width: 180,
    padding: 1,
    borderColor: GlobalStyle.mainColor,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sented_text: {
    color: GlobalStyle.mainColor,
    fontSize: 16,
    fontWeight: '600',
  },
  report_button: {
    alignSelf: 'flex-end', 
    height: 30,
    margin: GlobalStyle.Devicewidth*0.05,
    marginRight: GlobalStyle.Devicewidth*0.1,
    borderRadius: 5,
    width: 60,
    padding: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  userName:{
    marginTop: 5,
    fontSize: 22,
    color: GlobalStyle.mainColor,
    fontWeight: '600'
  },
  descriptionText: {
    marginTop: 15,
    fontWeight: '600',
    color: 'grey',
    lineHeight: 20
  }
});

export default withNavigationFocus(Card, 'Card')