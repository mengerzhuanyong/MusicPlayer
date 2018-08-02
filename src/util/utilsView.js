/**
 * 音乐播放器 - ViewUtils
 * https://menger.me
 * @大梦
 */

'use strict';

import React  from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';

export default class UtilsView {

    /**
     * 左侧导航按钮
     * @Author   Menger
     * @DateTime 2018-01-17
     * @param    callBack
     * @return   {XML}
     */
    static getLeftButton = (callBack) => {
        return (
            <TouchableOpacity
                style={{padding: 8}}
                onPress={callBack}
            >
                <Image style={styles.headIcon} source={Images.icon_arrow_left}/>
            </TouchableOpacity>
        )
    };

    /**
     * 右侧侧导航按钮
     * @Author   Menger
     * @DateTime 2018-01-17
     * @param    callBack
     * @return   {XML}
     */
    static getRightButton = (title, callBack) => {
        return (
            <TouchableOpacity
                style={{alignItems: 'center',}}
                onPress={callBack}
            >
                <View style={{marginRight: 10}}>
                    <Text style={{fontSize: 20, color: '#fff',}}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    headIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
        resizeMode: 'contain',
    },
    setting_item_container: {
        height: 60,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    settingBtnIcon: {
        marginRight: 10,
        height: 22,
        width: 22,
        alignSelf: 'center',
        opacity: 1
    },
    moreMenuBtnIcon: {
        width: 24,
        height: 24,
    },
    shareBtnIcon: {
        width: 20,
        height: 20,
        opacity: 0.9,
        marginRight: 10,
        tintColor: '#fff'
    },
});