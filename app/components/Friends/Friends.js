import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Fetch,
    FlatList,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import GlobalStyle  from './../../Styles/Global_Style.js';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'


class Friends extends Component {

    constructor ( props ) {
        super ( props );
        this.state = {
            chatroomArr: [
                // {
                //     key: 1,
                //     User: '王信樵',
                //     LastMessage: '欸你看我最新醜照',
                //     time: '2017/10/27 14:56:02',
                //     Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                //     // contentImg: ''
                // },
            ],
        }
    }

    componentWillMount () {
        AsyncStorage.getItem('Profile')
            .then((Profile_Local)=>{
                const Profile = JSON.parse(Profile_Local)
                var toServer = {
                    ac: Profile.AC
                }
                fetch('https://stu-web.tkucs.cc/402410855/test/public/api/getUserChatRoom', {
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
                        var chatArr = []
                        function pushChatRoom ( element ) {
                            if ( element.vImage == 0 ) {
                                element.vImage = ''
                            }
                            var temp = {
                                key: element.roomid,
                                User: '匿名',
                                LastMessage: element.lastcontent,
                                time: element.lastcontent_time,
                                UserImg: element.vImage
                            }
                            chatArr.push(temp)
                        }

                        responseData.info.forEach(pushChatRoom);

                        console.log('chatArr: ',chatArr)
                        this.setState( {
                            chatroomArr: chatArr
                        } )
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

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // screen enter (refresh data, update ui ...)
            this.componentWillMount()
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // screen exit
            // console.log('im not focus')
        }
    }

    goSingleChatRoom ( roomid ) {
        console.log('roomid: ', roomid)
        const { navigate } = this.props.navigation;
        navigate( 'SingleChatRoom', roomid )
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
              <FlatList
                  data={this.state.chatroomArr}
                  renderItem={({item}) =>
                      <TouchableOpacity style={styles.singleList} onPress={ () => this.goSingleChatRoom(item.key) }>
                        <View style={styles.imgDiv}>
                          <Image source={{ uri: item.UserImg }} style={styles.headImg}></Image>
                        </View>
                        <View style={styles.contentDiv}>
                          <Text>{item.LastMessage}</Text>
                        </View>
                        <View style={styles.timeDiv}>
                          <Text style={styles.timeText}>{item.time}</Text>
                        </View>
                      </TouchableOpacity>
                  }
              />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#DDDDDD',
    },
    singleList: {
        height: GlobalStyle.DeviceHeight * 0.11,
        width: GlobalStyle.Devicewidth,
        backgroundColor: 'white',
        marginTop: GlobalStyle.DeviceHeight * 0.015,
        paddingLeft: GlobalStyle.Devicewidth * 0.02,
        flexDirection: 'row',
    },
    headImg: {
        height: GlobalStyle.DeviceHeight * 0.07,
        width: GlobalStyle.DeviceHeight * 0.07
    },
    imgDiv: {
        flex: 1,
        justifyContent: 'center',
    },
    contentDiv: {
        flex: 3,
        justifyContent: 'center',
    },
    timeDiv: {
        flex: 1,
        alignItems: 'flex-end',
    },
    timeText: {
        fontSize: 15,
        color: '#AAAAAA'
    }
});

export default withNavigationFocus(Friends, 'Friends')