//聊天列表頁
import React, { Component } from 'react';

//UI元素
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button
} from 'react-native';

const My_Style = {
    mainColor: '#3366ff',
}

export default class LiveView extends Component {
    static navigationOptions= ({navigation}) => ({
    //   title: `${navigation.state.params.name}攝影機`,
        title: '即時影像',
        headerStyle: {            
            backgroundColor: 'white'
        }
    })
    constructor ( props ) {
        super ( props );
        this.state = {
            url: '',
            time: ''
        }
    }
    componentWillMount () {
        const { params } = this.props.navigation.state;
        let today = new Date();
        let date = today.toLocaleString();

        this.setState({
            url: params.imgUrl,
            time: date
        })
    }
    Refresh () {
        const { params } = this.props.navigation.state;
        let today = new Date();
        let date = today.toLocaleString();

        this.setState({
            url: params.imgUrl,
            time: date
        })
    }
  render() {
      const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>

            <Text style={styles.title}>{params.name}</Text>
            <Text style={styles.date}>{this.state.time}</Text>
            <Image source={{ uri: this.state.url }} style={styles.Img}/>
            <TouchableOpacity
                style={styles.button}
                onPress={this.Refresh.bind(this)}
            >
                <Text style={styles.button_text}>更新影像</Text>
            </TouchableOpacity>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    title: {
        marginTop: Dimensions.get('window').height * 0.1,
        fontSize: 18,
        fontWeight: '600'
    },
    date: {
        marginTop: Dimensions.get('window').height * 0.05,
        color: '#ADADAD'
    },
    button: {
        marginTop: Dimensions.get('window').height * 0.1,
        backgroundColor: 'white',
        borderColor: My_Style.mainColor,
        borderWidth: 0.5,
        width: 180,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        color: My_Style.mainColor,
        fontSize: 16
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    Img: {
        marginTop: Dimensions.get('window').height * 0.05,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.6
    }
});


AppRegistry.registerComponent('LiveView', () => LiveView);
