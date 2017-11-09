//聊天列表頁
import React, { Component } from 'react';

//UI元素
import {
    Fetch,
    AppRegistry,
    StyleSheet,
    WebView,
} from 'react-native';

import GlobalStyle from './../../Styles/Global_Style';


export default class BellDetail extends Component {
    componentWillMount () {
        // fetch('http://tkutimes.tku.edu.tw/dtl.aspx?no=35655')
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch((error) => {        // 错误处理
        //         console.log( error )
        //     })
        //     .done();
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <WebView
                source={{uri: params.meta}}
                style={styles.Container}/>
        );
    }
}




const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: GlobalStyle.Devicewidth,
        backgroundColor: 'white'
    },
});


AppRegistry.registerComponent('BellDetail', () => BellDetail);
