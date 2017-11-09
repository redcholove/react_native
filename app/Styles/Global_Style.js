'use strict'

import React from 'react-native';

var {
    Dimensions
} = React;

const GlobalStyles = {
    mainColor: '#3366ff',
    Devicewidth: Dimensions.get('window').width,
    DeviceHeight: Dimensions.get('window').height
}

module.exports = GlobalStyles;