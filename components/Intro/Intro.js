import React, { Component } from 'react';
import { View, Image, Text, StatusBar, StyleSheet } from 'react-native';
import AppIntro from 'react-native-app-intro';

export default class extends Component {
    onSkipBtnHandle = () => {
        this.props.setFirstTime();
    };
    doneBtnHandle = () => {
        this.props.setFirstTime();
    };
    nextBtnHandle = (index) => {
    };
    onSlideChangeHandle = (index, total) => {
    };
    render() {
        return (
            <AppIntro
                onNextBtnClick={this.nextBtnHandle}
                onDoneBtnClick={this.doneBtnHandle}
                onSkipBtnClick={this.onSkipBtnHandle}
                onSlideChange={this.onSlideChangeHandle}
            >
                <View style={[styles.slide,{ backgroundColor: '#43A047' }]}>
                    <StatusBar hidden />
                    <View style={styles.wrapImage} level={5}>
                        <Image style={styles.image} source={ require('./assets/logo-1.jpg') }/>
                    </View>
                    <View level={15}><Text style={styles.text}>Ứng dụng cho UITer</Text></View>
                    <View level={25}><Text style={[styles.text, { fontSize: 20, paddingTop: 10 }]}>Hỗ trợ sinh viên UIT trong việc học tập và sinh hoạt tại trường</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#009688' }]}>
                    <View style={styles.wrapImage} level={5}>
                        <Image style={styles.image} source={ require('./assets/logo-2.jpg') }/>
                    </View>
                    <View level={15}><Text style={styles.text}>Thông tin nhanh chóng</Text></View>
                    <View level={25}><Text style={[styles.text, { fontSize: 20, paddingTop: 10 }]}>Không lo bỏ lỡ các tin tức, thông báo nghỉ bù, deadline, lịch học,...</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#006064' }]}>
                    <View style={styles.wrapImage} level={5}>
                        <Image style={styles.image} source={ require('./assets/logo-3.jpg') }/>
                    </View>
                    <View level={15}><Text style={styles.text}>Dễ dàng sử dụng</Text></View>
                    <View level={25}><Text style={[styles.text, { fontSize: 20, paddingTop: 10 }]}>Giao diện thân thiện, dễ dàng kéo thả để cập nhật thông tin</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#F57F17' }]}>
                    <View style={styles.wrapImage} level={5}>
                        <Image style={styles.image} source={ require('./assets/logo-4.jpg') }/>
                    </View>
                    <View level={15}><Text style={styles.text}>Bắt đầu thôi nào!</Text></View>
                    <View level={25}><Text style={[styles.text, { fontSize: 20, paddingTop: 10 }]}>Chỉ cần nhập tài khoản chứng thực và bạn đã có thể sử dụng</Text></View>
                </View>
            </AppIntro>
        );
    }
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        padding: 15,
        height: null
    },
    wrapImage: {
        paddingBottom: 30
    },
    image: {
        height: 180,
        width: 180,
        borderRadius: 90,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 5
    },
    text: {
        color: '#fff',
        fontSize: 28,
        textAlign: 'center',
        lineHeight: 35
    },
});