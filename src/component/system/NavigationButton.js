/**
 * 汇了金融 - NavigationButton
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import NavigationBar from '../../component/common/NavigationBar'
import UtilsView from '../../util/utilsView'

import NetApi from '../../constant/GlobalApi'
import NetRequest from '../../util/utilsRequest'
import GlobalIcons from '../../constant/GlobalIcon'
import GlobalStyles from '../../constant/GlobalStyle'
import {toastShort, consoleLog} from '../../util/utilsToast'
import {clearAllTimeout} from '../../util/utilsTool'

export default class NavigationButton extends Component {

    static defaultProps = {
        type: 'right',
        title: '',
        icon: '',
        iconStyle: '',
        titleStyle: '',
        submitFoo: () => {},
    };

    render(){
        let {title, titleStyle, icon, iconStyle, titleView, submitFoo, type} = this.props;
        let renderTitle = icon ? <Image source={icon} style={[styles.buttonIcon, iconStyle]} /> : <Text style={[styles.buttonName, titleStyle]}>{title}</Text>;
        if (titleView) {
            renderTitle = titleView;
        }
        return (
            <TouchableOpacity
                style = {type === 'left' ? styles.leftButtonView : styles.rightButtonView}
                onPress = {submitFoo}
            >
                {renderTitle}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    leftButtonView: {
        height: 40,
        marginLeft: 10,
        justifyContent: 'center',
        // backgroundColor: '#ff660080',
    },
    rightButtonView: {
        height: 40,
        // marginRight: 10,
        justifyContent: 'center',
        // backgroundColor: '#ff660080',
    },
    buttonName: {
        fontSize: 14,
        color: GlobalStyles.themeColor,
    },
    buttonIcon: {
        width: 22,
        height: 22,
        tintColor: '#333',
        resizeMode: 'contain',
    },
});