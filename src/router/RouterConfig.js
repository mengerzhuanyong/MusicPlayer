/**
 * 音乐播放器 - RouterConfig
 * https://menger.me
 * @大梦
 */


'use strict';

import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import {configRouter, tabOptions} from './RouterTool'

import CommonWebPage from '../page/common/commonWebPage'

import Home from '../page/home/home'
import Music from '../page/music/music'
import Mine from '../page/mine/mine'

import Login from '../page/login/login'
import Register from '../page/login/register'
import RetrievePassword from '../page/login/retrievePassword'

import MusicPlayer from '../page/music/musicPlayer'

import Setting from '../page/system/setting'
import SystemMessage from '../page/system/systemMessage'

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: tabOptions({
            title: '首页',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
        })
    },
    Music: {
        screen: Music,
        navigationOptions: tabOptions({
            title: '音乐',
            normalIcon: Images.icon_tabbar_music,
            selectedIcon: Images.icon_tabbar_music_cur
        })
    },
    Mine: {
        screen: Mine,
        navigationOptions: tabOptions({
            title: '我的',
            normalIcon: Images.icon_tabbar_mine,
            selectedIcon: Images.icon_tabbar_mine_cur
        })
    },
}, {
    initialRouteName: 'Music',
    tabBarOptions: {
        showIcon: true,
        indicatorStyle: {height: 0},
        activeTintColor: GlobalStyle.themeColor,
        style: {
            backgroundColor: '#fff'
        },
        tabStyle: {
            margin: 2,
        },
    },
    lazy: true, //懒加载
    swipeEnabled: false,
    animationEnabled: false, //关闭安卓底栏动画
    tabBarPosition: 'bottom',
});

const StackNavigator = createStackNavigator(configRouter({
    Tab: {screen: TabNavigator},
    CommonWebPage: {screen: CommonWebPage},

    Login: {screen: Login},
    Register: {screen: Register},
    RetrievePassword: {screen: RetrievePassword},

    MusicPlayer: {screen: MusicPlayer},

    Setting: {screen: Setting},
    SystemMessage: {screen: SystemMessage},

}), {
    initialRouteName: 'MusicPlayer',
    cardStyle: {
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor: GlobalStyle.pageBackgroundColor,
    },
    navigationOptions: {
        header: null,
        gesturesEnabled: true
    },
    transitionConfig: () => {
        return {
            screenInterpolator: (sceneProps) => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps)
            },
        }
    }
});

export {StackNavigator};
