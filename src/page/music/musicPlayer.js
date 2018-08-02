/**
 * 音乐播放器 - Music
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Modal,
    Image,
    Easing,
    Slider,
    Animated,
    ScrollView,
    StyleSheet,
    TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from "../../component/system/NavigationBar";
import ToastView, {DURATION} from 'react-native-easy-toast'
import GlobalStyle from "../../constant/GlobalStyle";
import {HorizontalLine} from "../../component/common/CommonLine";

let lyrics = '小生的花伞还落在你家 你美眷如花我浪迹天涯 为我泡杯花茶和你有些不搭 气氛开始有一点尴尬 你腼腆一笑竟如此融洽 我情不自禁会为你牵挂 什么时代早已经不想回家 你微微一笑蝴蝶为你倾倒 凝眸几秒不知道该干嘛 你拂袖模样情千变万化 一壶好酒趁着夜还未央 独自品尝这大把好时光 夜深人静略显一丝凄凉 东奔西走微醺不宜骑马 听着浪人弹着断了弦的琵琶 路过青楼酒馆官人进来坐坐好吗 我的思念似六月里的小雨哗哗 对你情有所钟为你两袖清风 小生的花伞还落在你家 你美眷如花我浪迹天涯 为我泡杯花茶和你有些不搭 气氛开始有一点尴尬 你腼腆一笑竟如此融洽 我情不自禁会为你牵挂 什么时代早已经不想回家 东奔西走微醺不宜骑马 听着浪人弹着断了弦的琵琶 路过青楼酒馆官人进来坐坐好吗 我的思念似六月里的小雨哗哗 对你情有所钟为你两袖清风 小生的花伞还落在你家 你美眷如花我浪迹天涯 为我泡杯花茶和你有些不搭 气氛开始有一点尴尬 你腼腆一笑竟如此融洽 我情不自禁会为你牵挂 什么时代早已经不想回家 我化成风不舍一帘美梦 醉醒穿梭终究是一场空 若非是你今生又怎会懂 浪人回头心动则心痛';

export default class Music extends Component {

    constructor(props) {
        super(props);
        this.state = {
            musicList: [],
            playMode: 1, // 播放模式 1: 列表模式 2: 随机模式 3: 单曲循环
            modeIcon: Images.icon_music_mode_list,
            playIcon: Images.icon_music_pause,
            imageRotate: new Animated.Value(0),

            musicListVisible: false,
            musicListModelColor: '#00000090',
        };
        this.isGoing = false; // 为真旋转
        this.myAnimate = Animated.timing(this.state.imageRotate, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear),
        });
    }

    componentDidMount() {
        this.stop();
    };

    componentWillUnmount() {};

    loadSongInfo = () => {
        console.log('loadSongInfo');
    };

    // 开始旋转
    imgMoving = () => {
        if (this.isGoing) {
            this.state.imageRotate.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving();
            })
        }
    };
    
    // 播放模式切换 1: 列表模式 2: 随机模式 3: 单曲循环
    switchPlayMode = () => {
        let {playMode} = this.state;
        playMode++;
        playMode = playMode === 4 ? 1 : playMode;
        // 重新设置
        this.setState({
            playMode: playMode
        });
        
        // 根据设置后的模式重新设置背景图片
        if (playMode === 1) {
            this.setState({
                modeIcon: Images.icon_music_mode_list,
            })
        } else if (playMode === 2) {
            this.setState({
                modeIcon: Images.icon_music_mode_random,
            })
        } else {
            this.setState({
                modeIcon: Images.icon_music_mode_single,
            })
        }
    };
    
    // 播放/暂停
    playAction = () => {
        let {pause} = this.state;
        this.stop();
        this.setState({
            pause: !pause
        });
        if (pause) {
            this.setState({
                playIcon: Images.icon_music_pause
            });
        } else {
            this.setState({
                playIcon: Images.icon_music_play
            });
        }
    };

    // 停止
    stop = () => {
        this.isGoing = !this.isGoing;
        if (this.isGoing) {
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.imageRotate, {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.inOut(Easing.linear),
                });
                this.imgMoving()
            })
        } else {
            this.state.imageRotate.stopAnimation((oneTimeRotate) => {
                // 计算角度比例
                this.myAnimate = Animated.timing(this.state.imageRotate, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * 6000,
                    easing: Easing.inOut(Easing.linear),
                });
            });
        }
    };
    
    // 上一曲
    prevAction = (index) => {
        this.recover();
        lyrics = [];
        if (index === -1) {
            index = this.state.musicList.length - 1; // 如果是第一首就回到最后一首歌
        }
        this.setState({
            currentIndex: index  // 更新数据
        });
        this.loadSongInfo(index);  // 加载数据
    };

    // 下一曲
    nextAction = (index) => {
        this.recover();
        lyrics = [];
        if (index === 10) {
            index = 0 // 如果是最后一首就回到第一首
        }
        this.setState({
            currentIndex: index,  // 更新数据
        });
        this.loadSongInfo(index);   // 加载数据
    };

    // 换歌时重置进度条和起始时间
    recover = () => {
        this.setState({
            sliderValue: 0,
            currentTime: 0.0
        })
    };

    setModalVisible = () => {
        let {musicListVisible} = this.state;
        this.setState({
            musicListVisible: !musicListVisible,
        });
    };

    renderMusicList = () => {
        let {musicListVisible, musicListModelColor} = this.state;
        return (
            <Modal
                transparent={true}
                animationType={"slide"}
                visible={musicListVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.")
                }}
                onShow={() => {
                    this.setState({
                        musicListModelColor: "#00000090"
                    })
                }}
                onDismiss={() => {
                    this.setState({
                        musicListModelColor: "transparent"
                    })
                }}
            >
                <View style={[styles.musicListModalView]}>
                    <TouchableWithoutFeedback
                        onPress={this.setModalVisible}
                    >
                        <View style={styles.blankContent}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.musicListContent}>
                        <View style={styles.musicListContentTitleView}>
                            <Text style={styles.musicListContentTitle}>音乐列表</Text>
                        </View>
                        <View style={styles.musicListContentCon}>
                            <View style={styles.musicListItem}>
                                <Text style={styles.musicListItemCon}>1. 浪人琵琶</Text>
                            </View>
                            <HorizontalLine lineStyle={styles.musicListItemSeparator}/>
                            <View style={styles.musicListItem}>
                                <Text style={styles.musicListItemCon}>2. 那年的我们</Text>
                            </View>
                        </View>
                    </View>
                    <ToastView
                        ref={'toast'}
                        style={GlobalStyle.toastStyle}
                        opacity={0.8}
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        textStyle={GlobalStyle.toastTextStyle}
                    />
                </View>
            </Modal>
        );
    };

    render() {
        const {imageRotate, modeIcon, playIcon} = this.state;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Music Player'}
                />
                <View style={styles.content}>
                    {/*------ 图片区 ------*/}
                    <View style={styles.musicPhotoView}>
                        <View style={styles.musicPhoto}>
                            <Animated.Image
                                source={Images.img_logo}
                                style={[styles.musicImage, {
                                    transform: [{
                                        rotate: imageRotate.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg']
                                        })
                                    }]
                                }]}
                            />
                        </View>
                    </View>

                    {/*------ 歌词区 ------*/}
                    <View style={styles.musicLyricsContent}>
                        <ScrollView style={styles.musicLyricsScrollView}>
                            <Text style={styles.musicLyricsContext}>{lyrics}</Text>
                        </ScrollView>
                    </View>

                    {/*------ 进度区 ------*/}
                    <View style={styles.progressContent}>
                        <View style={styles.progressContentItem}>
                            <Text style={styles.progressContext}>0:00</Text>
                        </View>
                        <View style={[styles.progressContentItem, styles.progressValueContent]}>
                            <Slider
                                style={styles.progressSliderItem}
                            />
                        </View>
                        <View style={styles.progressContentItem}>
                            <Text style={styles.progressContext}>5:00</Text>
                        </View>
                    </View>

                    {/*------ 按钮区 ------*/}
                    <View style={styles.controlContent}>
                        <View style={styles.controlContentItemView}>
                            <TouchableOpacity
                                style={styles.controlButtonItem}
                                onPress={this.switchPlayMode}
                            >
                                <Image source={modeIcon} style={[styles.musicButtonIcon, styles.musicSmallIcon]}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.controlContentItemView, styles.controlContentPlayBtnView]}>
                            <TouchableOpacity
                                style={styles.controlButtonItem}
                                onPress={this.prevAction}
                            >
                                <Image source={Images.icon_music_play_prev} style={[styles.musicButtonIcon, styles.musicMiddleIcon]}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.controlButtonItem}
                                onPress={this.playAction}
                            >
                                <Image source={playIcon} style={[styles.musicButtonIcon, styles.musicLargeIcon]}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.controlButtonItem}
                                onPress={this.nextAction}
                            >
                                <Image source={Images.icon_music_play_next} style={[styles.musicButtonIcon, styles.musicMiddleIcon]}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.controlContentItemView}>
                            <TouchableOpacity
                                style={styles.controlButtonItem}
                                onPress={this.setModalVisible}
                            >
                                <Image source={Images.icon_music_list} style={[styles.musicButtonIcon, styles.musicSmallIcon]}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*------ 列表区 ------*/}
                    {this.renderMusicList()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff6600',
    },
    textStyle: {
        fontSize: 16,
        color: '#fff',
    },
    content: {
        flex: 1,
    },

    musicPhotoView: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    musicPhoto: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#33333360'
    },
    musicImage: {
        width: 180,
        height: 180,
        borderRadius: 90,
    },

    musicLyricsContent: {
        height: SCREEN_HEIGHT - 500,
    },
    musicLyricsScrollView: {
        flex: 1,
        paddingHorizontal: 50,
    },
    musicLyricsContext: {
        color: '#fff',
        textAlign: 'justify',
        fontSize: FontSize(13),
    },

    progressContent: {
        bottom: 90,
        width: SCREEN_WIDTH,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    progressContentItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressValueContent: {
        flex: 4,
        // backgroundColor: '#123',
    },
    progressContext: {
        color: '#fff',
        fontSize: FontSize(12),
    },
    progressSliderItem: {
        flex: 1,
    },

    controlContent: {
        height: 80,
        bottom: 10,
        width: SCREEN_WIDTH,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    controlContentItemView: {
        flex: 1,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#d20',
        justifyContent: 'space-around',
    },
    controlContentPlayBtnView: {
        flex: 3,
        // backgroundColor: '#123',
    },
    controlButtonItem: {},
    musicButtonIcon: {
        tintColor: '#fff',
        resizeMode: 'contain',
    },
    musicSmallIcon: {
        width: 30,
        height: 30,
    },
    musicMiddleIcon: {
        width: 45,
        height: 45,
    },
    musicLargeIcon: {
        width: 60,
        height: 60,
    },

    musicListModalView: {
        flex: 1,
        backgroundColor: '#00000090'
    },
    blankContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    musicListContent: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: SCREEN_HEIGHT / 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    musicListContentTitleView: {
        height: 45,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderBottomWidth: GlobalStyle.minPixel,
    },
    musicListContentTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    musicListContentCon: {},
    musicListItemSeparator: {
        marginLeft: 20,
        backgroundColor: '#ddd',
    },
    musicListItem: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    musicListItemCon: {
        color: '#555',
        fontSize: FontSize(13),
    },
});