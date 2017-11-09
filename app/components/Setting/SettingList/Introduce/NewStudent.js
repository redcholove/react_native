//聊天列表頁
import React, { Component } from 'react';

//UI元素
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';


export default class NewStudent extends Component {
    render() {
        return (
            <View style={styles.Container}>
                <Text style={styles.H1}>新生專區文案</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    H1: {
        marginTop: Dimensions.get('window').height * 0.4,
        fontSize: 30,
        fontWeight: '800'
    }
});


AppRegistry.registerComponent('NewStudent', () => NewStudent);
