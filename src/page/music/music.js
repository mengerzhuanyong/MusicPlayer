/**
 * 音乐播放器 - Music
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet, Image, TouchableOpacity, Slider,
} from 'react-native'
import NavigationBar from "../../component/system/NavigationBar";

export default class Music extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    };

    componentWillUnmount() {
    };

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.controlButtonItem}
                    onPress={() => RouterHelper.navigate('Music Player', 'MusicPlayer')}
                >
                    <Text style={styles.textStyle}>音乐播放器</Text>
                </TouchableOpacity>
            </View>
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
    controlButtonItem: {
        width: 200,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#f60',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: '#fff',
    },
});