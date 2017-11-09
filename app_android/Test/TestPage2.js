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

export default class TestPage2 extends Component {
    constructor ( props ) {
        super ( props );
        this.state = {
        }
    }
    componentWillMount (){
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
                <ScrollView contentContainerStyle={styles.container}>
                    <FlatList
                        data={[
                            {
                                key: 1,
                                User: '王信樵',
                                LastMessage: '欸你看我最新醜照',
                                time: '2017/10/27 14:56:02',
                                Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                                // contentImg: ''
                            },
                            {
                                key: 2,
                                User: '王信樵',
                                LastMessage: 'dsjfdksjflsdjfsladf',
                                time: '2017/10/27 14:56:30',
                                Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                                // contentImg: 'https://scontent.ftpe4-2.fna.fbcdn.net/v/t1.0-9/15439884_1305325889488047_7354797744146511356_n.jpg?oh=5c614c6c2378f081c53a762814ab14ca&oe=5A78A396'
                            },
                            {
                                key: 3,
                                User: '王信樵',
                                LastMessage: 'dsjfdksjflsdjfsladf',
                                time: '2017/10/27 14:56:30',
                                Userimg: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20664976_1537183682968932_718663835764439098_n.jpg?oh=9e9cdf57d6156754642abaedee3ed29e&oe=5A6DC2F7',
                                // contentImg: ''
                            },
                        ]}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.singleList} onPress={ () => navigate( 'TestPage' ) }>
                                <View style={styles.imgDiv}>
                                    <Image source={ {uri: item.Userimg } } style={styles.headImg}></Image>
                                </View>
                                <View style={styles.contentDiv}>
                                    <Text>最後一筆訊息...</Text>
                                </View>
                                <View style={styles.timeDiv}>
                                    <Text style={styles.timeText}>5小時前</Text>
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
        // backgroundColor: 'red'
    },
    contentDiv: {
        flex: 3,
        justifyContent: 'center',
        // backgroundColor: 'yellow'
    },
    timeDiv: {
        flex: 1,
        alignItems: 'flex-end',
        // backgroundColor: 'blue'
    },
    timeText: {
        fontSize: 15,
        color: '#AAAAAA'
    }
});

AppRegistry.registerComponent('TestPage2', () => TestPage2);
