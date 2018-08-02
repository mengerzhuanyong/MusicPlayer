/**
 * 音乐播放器 - AppRegister
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import './src/constant/Global'
import Index from './src'

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Index />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f60',
    },
    textStyle: {
      fontSize: 16,
      color: '#fff',
    }
});