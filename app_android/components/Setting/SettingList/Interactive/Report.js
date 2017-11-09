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


export default class Report extends Component {
    render() {
        return (
            <View style={styles.Container}>
                <Text style={styles.H1}>Line: 0983213519</Text>
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


AppRegistry.registerComponent('Report', () => Report);
