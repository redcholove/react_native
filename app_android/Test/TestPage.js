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
    TouchableOpacity
} from 'react-native';

import GlobalStyle  from './../Styles/Global_Style.js';
import ScoreSchedule from "../components/Setting/TkuILife/ScoreSchedule";
import AutoHeightImage from 'react-native-auto-height-image';

export default class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            height: 0
        };
    }
    componentWillMount (){
        console.log('here is entry')
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.talkContent}>
                <FlatList
                    data={[
                        {
                            key: 1,
                            User: '王信樵',
                            Content: '欸你看我最新醜照',
                            time: '2017/10/27 14:56:02',
                            Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                            contentImg: ''
                        },
                        {
                            key: 2,
                            User: '王信樵',
                            Content: '',
                            time: '2017/10/27 14:56:30',
                            Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                            contentImg: 'https://scontent.ftpe4-2.fna.fbcdn.net/v/t1.0-9/15439884_1305325889488047_7354797744146511356_n.jpg?oh=5c614c6c2378f081c53a762814ab14ca&oe=5A78A396'
                        },
                        {
                            key: 3,
                            User: '王信樵',
                            Content: 'dsjfdksjflsdjfsladf',
                            time: '2017/10/27 14:56:30',
                            Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                            contentImg: ''
                        },
                    ]}
                    renderItem={({item}) =>
                        <View style={styles.singleContent}>
                            <View style={styles.topContent}>
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
                <View style={styles.myTalkBar} onPress={ () => console.log('hi') }>
                    {/*<Image source={ {uri: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7' } }*/}
                           {/*style={styles.profileImg}></Image>*/}
                    <View style={styles.chooseImgDiv}></View>
                    <View style={styles.inputTextDiv}></View>
                    <View style={styles.sendIconDiv}></View>
                </View>
            </View>
        );
    }
}

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
        paddingRight: GlobalStyle.Devicewidth * 0.03,
        paddingLeft: GlobalStyle.Devicewidth * 0.03,
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
    userImgDiv: {
        flex: 1,
        justifyContent: 'center',
        height: GlobalStyle.DeviceHeight / 14,
    },
    userNameDiv: {
        flex: 2,
        justifyContent: 'center',
        justifyContent: 'center',
        height: GlobalStyle.DeviceHeight / 14,
    },
    time: {
        alignItems: 'flex-end',
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
        backgroundColor: 'red'
    },
    inputTextDiv: {
        flex: 1,
        backgroundColor: 'blue'
    },
    sendIconDiv: {
        flex: 1,
        backgroundColor: 'yellow'
    }
});

AppRegistry.registerComponent('TestPage', () => TestPage);
