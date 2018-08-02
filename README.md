# MengerTemplate

## 使用的组件

        "moment": "^2.22.2",
        "react-native-device-info": "^0.22.2",
        "react-native-image-zoom-viewer": "^2.2.13",
        "react-native-keyboard-aware-scroll-view": "^0.6.0",
        "react-native-root-toast": "^3.0.1",
        "react-native-scrollable-tab-view": "^0.8.0",
        "react-native-spinkit": "^1.1.1",
        "react-native-splash-screen": "^3.1.1",
        "react-native-storage": "^0.2.2",
        "react-navigation": "^2.9.3",
        "redux": "^4.0.0",
        "teaset": "^0.5.9"

## 需Link的组件

- react-native-device-info
- react-native-spinkit
- react-native-splash-screen

## 已完成的功能

- 启动白屏优化
- 加载层

## 组件手动修改项

- react-navigation (解决 `can't call setState` 警告)

        // react-native-safe-area-view -> index.js -> line: 153
        if (!this.view) {
            return;
        }

## 待办事项

- [ ] 视频播放
- [ ] 音乐播放
- [ ] 聊天
- [ ] 直播