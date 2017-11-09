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
    Dimensions
} from 'react-native';

import GlobalStyle from './../../Styles/Global_Style'

export default class FriendProfile extends Component {

    constructor ( props ) {
        super ( props );
        this.state = {
            modalVisible: false,
            error: true,
        }
    }
    componentWillMount () {
        this.setState ({error: Math.floor(Math.random() * 9) % 2})
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render() {
        let Report_Text = '檢 舉';

        if ( this.state.error ) {
            Content = <ScrollView>
                <View style={styles.ImageView}>
                    <Image source={require('./../../img/tku_beauty.png')} style={styles.Card_Image_Error}/>
                </View>
                <View style={styles.TextView}>
                    <Text style={styles.userName}>美麗的宮燈大道</Text>
                    <Text style={styles.descriptionText}>
                        似乎出了點問題呢...要重整看看嗎{'\n'}
                    </Text>
                    <TouchableOpacity
                        style={styles.sent_button}
                        onPress={() => this.setState({error: false})}>
                        <Text style={styles.buttonText}> 重新整理 </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        } else {
            Content =  <ScrollView>
                <View style={styles.ImageView}>
                    <TouchableOpacity
                        style={styles.report_button}
                        onPress={() => this.setModalVisible(true)}>
                        <Text style={styles.reportText}> {Report_Text} </Text>
                    </TouchableOpacity>
                    <Image source={require('./../../img/laolan.jpg')} style={styles.Card_Image}/>
                </View>
                <View style={styles.TextView}>
                    <Text style={styles.userName}>{this.props.navigation.state.routeName}</Text>
                    <Text style={styles.descriptionText}>
                        除了帥{'\n'}
                        我真的覺得我沒什麼好說的{'\n'}
                    </Text>
                </View>
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
        marginTop: GlobalStyle.DeviceHeight * 0.15,
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
        width: GlobalStyle.Devicewidth,
        height: GlobalStyle.Devicewidth,
        backgroundColor: 'white'
    },
    TextView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    Card_Image: {
        height: GlobalStyle.Devicewidth*0.8,
        width: GlobalStyle.Devicewidth*0.8
    },
    Card_Image_Error: {
        marginTop: GlobalStyle.DeviceHeight*0.15,
        height: GlobalStyle.Devicewidth*0.6,
        width: GlobalStyle.Devicewidth*0.9
    },
    sent_button: {
        height: 35,
        marginTop: 10,
        borderRadius: 5,
        width: 180,
        padding: 1,
        backgroundColor: GlobalStyle.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sented_button: {
        height: 35,
        marginTop: 10,
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
        color: 'blue',
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
        marginTop: 10,
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

AppRegistry.registerComponent('FriendProfile', () => Card);
