import React from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Button,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';

export default class NearBy extends React.Component{
    static defaultProps = {
        ripple:3,       //同时存在的圆数量
        initialDiameter:150,
        endDiameter:350,
        initialPosition:{top:200,left: Dimensions.get('window').width * 0.5},
        rippleColor:'blue',
        intervals:500,      //间隔时间
        spreadSpeed:2000,      //扩散速度
    }
    static propTypes = {
        initialPosition:React.PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        let rippleArr = [];
        for(let i=0;i<props.ripple;i++) rippleArr.push(0);
        this.state = {
            anim:rippleArr.map(()=> new Animated.Value(0))
        }
        this.cancelAnimated = false;
        this.animatedFun = null;
    }
    startAnimation(){
        this.state.anim.map((val,index)=>val.setValue(0));
        this.animatedFun = Animated.stagger(this.props.intervals,this.state.anim.map((val)=>{
            return Animated.timing(val,{toValue:1,duration:this.props.spreadSpeed})
        }));
        this.cancelAnimated = false;
        this.animatedFun.start(()=>{if(!this.cancelAnimated) {this.startAnimation()}})
    }
    stopAnimation(){
        this.cancelAnimated = true;
        this.animatedFun.stop();
        this.state.anim.map((val,index)=>val.setValue(0));
    }
    render(){
        const {initialPosition,initialDiameter,endDiameter,rippleColor} = this.props;
        let r = endDiameter-initialDiameter;    // 直径变化量,top与left的变化是直径的一半
        let rippleComponent = this.state.anim.map((val,index)=>{
            return (
                <View>
                <Animated.View key={"animatedView_"+index} style={[styles.spreadCircle,{backgroundColor:rippleColor},{
                    opacity:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[1,0]
                            }),
                    height:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialDiameter,endDiameter]
                            }),
                    width:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialDiameter,endDiameter]
                            }),
                    top:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialPosition.top - initialDiameter/2,initialPosition.top - initialDiameter/2 - r/2]
                            }),
                    left:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialPosition.left - initialDiameter/2,initialPosition.left - initialDiameter/2 - r/2]
                            }),
                    }]}></Animated.View>
                    </View>
            )
        })
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 8}}>
                {rippleComponent}
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                <TouchableOpacity 
          style={styles.login_button} 
          onPress={(this.startAnimation.bind(this))}>
          <Text style={styles.buttonText}> 開始搜尋定位 </Text>
        </TouchableOpacity>
                </View>                              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spreadCircle:{
        borderRadius:999,
        position:'absolute',
    },
    login_button: {
        height: 40,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 0.5,
        width: 150,
        padding: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'blue',
    },
    buttonText: {
        color: 'blue',
        fontSize: 16,
        fontWeight: '400'
    }
})