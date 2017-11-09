//聊天列表頁
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    AsyncStorage
} from 'react-native';

//UI套件
import GlobalStyle  from './../../Styles/Global_Style';
import AutoHeightImage from 'react-native-auto-height-image';
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';
import { Icon } from 'react-native-elements'
import AutoScroll from 'react-native-auto-scroll'

export default class SingleChatRoom extends Component {
    constructor ( props ) {
        super ( props );
        this.state = {
            sendcontent: '',
            roomcontentArr: [
                // {
                //     key: 1,
                //     User: '王信樵',
                //     Content: '欸你看我最新醜照',
                //     time: '2017/10/27 14:56:02',
                //     Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                //     contentImg: ''
                // },
                // {
                //     key: 2,
                //     User: '王信樵',
                //     Content: '',
                //     time: '2017/10/27 14:56:30',
                //     Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                //     contentImg: 'https://scontent.ftpe4-2.fna.fbcdn.net/v/t1.0-9/15439884_1305325889488047_7354797744146511356_n.jpg?oh=5c614c6c2378f081c53a762814ab14ca&oe=5A78A396'
                // },
            ]
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
            AsyncStorage.getItem('Profile')
                .then((Profile_Local)=>{
                    const Profile = JSON.parse(Profile_Local)
                    var toServer = {
                        ac: Profile.AC,
                        roomid: params
                    }
                    console.log( 'toServer: ', toServer );
                    fetch('https://stu-web.tkucs.cc/402410855/test/public/api/getChatRoomContent', {
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
                            var chatArr = []
                            function pushChatRoom ( element ) {
                                if ( element.sentby == 1 ) {
                                    sentby = true;
                                }else {
                                    sentby = false
                                }
                                var temp = {
                                    key: element.iId,
                                    User: '匿名',
                                    Content: element.vContent,
                                    time: element.iCreateTime,
                                    Userimg: element.profileImg,
                                    contentImg: '',
                                    sentby: sentby
                                }

                                chatArr.push(temp)
                            }

                            responseData.info.forEach(pushChatRoom);
                            this.setState( {
                                roomcontentArr: chatArr
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

    sendMessage() {
        if ( this.state.sendcontent == '' ) {
            return;
        }
        const { params } = this.props.navigation.state;
        AsyncStorage.getItem('Profile')
            .then((Profile_Local)=>{
                const Profile = JSON.parse(Profile_Local)
                var toServer = {
                    ac: Profile.AC,
                    roomid: params,
                    content: this.state.sendcontent
                }
                fetch('https://stu-web.tkucs.cc/402410855/test/public/api/sentChatContent', {
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
                        var len = this.state.roomcontentArr.length,
                            new_key = this.state.roomcontentArr[ len - 1 ].iId + 1;

                        var temp = {
                            key: new_key,
                            User: '匿名',
                            Content: this.state.sendcontent,
                            time: '剛剛',
                            Userimg: Profile.imgUrl,
                            contentImg: '',
                            sentby: 1
                        }

                        var tempArr = []

                        tempArr = this.state.roomcontentArr
                        tempArr.push(temp)

                        this.setState ( {
                            roomcontentArr: tempArr
                        } )

                        Keyboard.dismiss();
                        this.setState( {
                            sendcontent: ''
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

    dropRefresh() {
        console.log('')
    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="position"
                keyboardVerticalOffset={60}
            >
                <AutoScroll
                    contentContainerStyle={styles.scrollContainer}>
                    {this.state.roomcontentArr.map(item => {
                        return <View style={styles.singleContent}>
                            {item.sentby
                                ? <View style={styles.topContent}>
                                    <View style={styles.time2}>
                                        <Text style={styles.timeFont}>
                                            {item.time}
                                        </Text>
                                    </View>
                                    <View style={styles.name2}>
                                        <View style={styles.userNameDiv2}>
                                            <Text>
                                                {item.User}
                                            </Text>
                                        </View>
                                        <View style={styles.userImgDiv2}>
                                            <Image source={ {uri: item.Userimg } } style={styles.headImg}></Image>
                                        </View>
                                    </View>
                                </View>
                                :<View style={styles.topContent}>
                                    <View style={styles.name}>
                                        <View style={styles.userImgDiv}>
                                            <Image source={ {uri: item.Userimg } } style={styles.headImg}></Image>
                                        </View>
                                        <View style={styles.userNameDiv}>
                                            <Text>
                                                {item.User}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.time}>
                                        <Text style={styles.timeFont}>
                                            {item.time}
                                        </Text>
                                    </View>
                                </View>
                            }
                            <View style={styles.bottomContent}>
                                <Text>{item.Content}</Text>
                                <AutoHeightImage
                                    style={styles.contentImg}
                                    width={GlobalStyle.Devicewidth * 0.5}
                                    imageURL={item.contentImg}
                                />
                            </View>
                        </View>
                    })}
                </AutoScroll>
                <View style={styles.myTalkBar}>
                    <View style={styles.chooseImgDiv}>
                        <Icon
                            // raised
                            name='photo'
                            type='font-awesome'
                            color='#DDDDDD'
                            onPress={() => console.log('hello')} />
                    </View>
                    <View style={styles.inputTextDiv}>
                        <AutoGrowTextInput
                            style={styles.inputContent}
                            placeholder='Some text here'
                            maxHeight={ 120 }
                            value={this.state.sendcontent}
                            onChangeText={(sendcontent) => this.setState({sendcontent})}
                        />
                    </View>
                    <View style={styles.sendIconDiv}>
                        <TouchableOpacity  onPress={this.sendMessage.bind(this)}>
                            <Icon
                                // raised
                                name='send'
                                type='font-awesome'
                                color='#DDDDDD' />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

/*
<ScrollView
                  contentContainerStyle={styles.talkContent}
                  onRefresh={this.dropRefresh.bind(this)}
                >
                <FlatList
                    data={this.state.roomcontentArr}
                    renderItem={({item}) =>
                        <View style={styles.singleContent}>
                            {item.sentby
                              ? <View style={styles.topContent}>
                                <View style={styles.time2}>
                                <Text style={styles.timeFont}>
                            {item.time}
                                </Text>
                                </View>
                                <View style={styles.name2}>
                                    <View style={styles.userNameDiv2}>
                                        <Text>
                                            {item.User}
                                        </Text>
                                    </View>
                                <View style={styles.userImgDiv2}>
                                <Image source={ {uri: item.Userimg } } style={styles.headImg}></Image>
                                </View>
                                </View>
                                </View>
                                :<View style={styles.topContent}>
                                    <View style={styles.name}>
                                        <View style={styles.userImgDiv}>
                                            <Image source={ {uri: item.Userimg } } style={styles.headImg}></Image>
                                        </View>
                                        <View style={styles.userNameDiv}>
                                            <Text>
                                                {item.User}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.time}>
                                        <Text style={styles.timeFont}>
                                            {item.time}
                                        </Text>
                                    </View>
                                </View>
                                }
                          <View style={styles.bottomContent}>
                            <Text>{item.Content}</Text>
                            <AutoHeightImage
                                style={styles.contentImg}
                                width={GlobalStyle.Devicewidth * 0.5}
                                imageURL={item.contentImg}
                            />
                          </View>
                        </View>
                    }
                />
              </ScrollView>
              <View style={styles.myTalkBar}>
                <View style={styles.chooseImgDiv}>
                    <Icon
                        // raised
                        name='photo'
                        type='font-awesome'
                        color='#DDDDDD'
                        onPress={() => console.log('hello')} />
                </View>
                <View style={styles.inputTextDiv}>
                    <AutoGrowTextInput
                        style={styles.inputContent}
                        placeholder='Some text here'
                        maxHeight={ 120 }
                        value={this.state.sendcontent}
                        onChangeText={(sendcontent) => this.setState({sendcontent})}
                    />
                </View>
                <View style={styles.sendIconDiv}>
                    <TouchableOpacity  onPress={this.sendMessage.bind(this)}>
                    <Icon
                        // raised
                        name='send'
                        type='font-awesome'
                        color='#DDDDDD' />
                    </TouchableOpacity>
                </View>
              </View>
 */

const styles = StyleSheet.create({
    talkContent: {
        height: GlobalStyle.DeviceHeight * 0.92,
        width: GlobalStyle.Devicewidth
    },
    myTalkBar: {
        height: GlobalStyle.DeviceHeight * 0.08,
        width: GlobalStyle.Devicewidth,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'flex-end',
        // paddingRight: GlobalStyle.Devicewidth * 0.03,
        // paddingLeft: GlobalStyle.Devicewidth * 0.03,
        flexDirection: 'row',
    },
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#DDDDDD',
    },
    singleContent: {
        alignItems: 'flex-start',
        minHeight: GlobalStyle.DeviceHeight / 7,
        width: GlobalStyle.Devicewidth,
        borderBottomWidth: 0.8,
        borderBottomColor: '#DDDDDD',
        marginBottom: GlobalStyle.DeviceHeight * 0.02,
        paddingTop: GlobalStyle.DeviceHeight * 0.02,
        backgroundColor: 'white',
    },
    name: {
        alignItems: 'flex-start',
        width: GlobalStyle.Devicewidth * 0.5,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    name2: {
        alignItems: 'flex-start',
        width: GlobalStyle.Devicewidth * 0.5,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    userImgDiv: {
        flex: 1,
        justifyContent: 'center',
        height: GlobalStyle.DeviceHeight / 14,
    },
    userImgDiv2: {
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
        height: GlobalStyle.DeviceHeight / 14,
    },
    userNameDiv: {
        flex: 2,
        justifyContent: 'center',
        height: GlobalStyle.DeviceHeight / 14,
    },
    userNameDiv2: {
        flex: 2,
        justifyContent: 'center',
        height: GlobalStyle.DeviceHeight / 14,
        alignItems: 'flex-end',
    },
    time: {
        alignItems: 'flex-end',
        width: GlobalStyle.Devicewidth * 0.5,
        flex: 1,
        justifyContent: 'center',
    },
    time2: {
        alignItems: 'flex-start',
        width: GlobalStyle.Devicewidth * 0.5,
        flex: 1,
        justifyContent: 'center',
    },
    timeFont: {
        color: '#AAAAAA'
    },
    topContent: {
        flex: 1,
        paddingLeft: GlobalStyle.Devicewidth * 0.05,
        paddingRight: GlobalStyle.Devicewidth * 0.05,
        flexDirection: 'row',
        height: GlobalStyle.DeviceHeight / 14,
    },
    bottomContent: {
        flex: 1,
        paddingBottom: GlobalStyle.DeviceHeight * 0.01,
        paddingLeft: GlobalStyle.Devicewidth * 0.05,
        paddingRight: GlobalStyle.Devicewidth * 0.05,
        paddingTop: GlobalStyle.DeviceHeight * 0.02,
        // alignItems: 'center',
    },
    headImg: {
        height: GlobalStyle.DeviceHeight / 18,
        width: GlobalStyle.DeviceHeight / 18,
        borderRadius: 20,
    },
    contentImg: {
        marginTop: GlobalStyle.DeviceHeight * 0.02
    },
    profileImg: {
        height: GlobalStyle.DeviceHeight / 18,
        width: GlobalStyle.DeviceHeight / 18,
        borderRadius: 20,
    },
    chooseImgDiv: {
        flex: 1,
        justifyContent: 'center',
    },
    inputTextDiv: {
        flex: 5,
        justifyContent: 'center',
    },
    sendIconDiv: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContent: {
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 10,
        height: GlobalStyle.DeviceHeight * 0.08,
        paddingLeft: GlobalStyle.Devicewidth * 0.02,
        paddingRight: GlobalStyle.Devicewidth * 0.02,
    }
});

AppRegistry.registerComponent('SingleChatRoom', () => SingleChatRoom);
