import React from 'react';
import { Image } from 'react-native';
import { Content, H2, Text } from 'native-base';

export default class extends React.Component {
    render() {
        return (
            <Content padder>
                <Image
                    resizeMode="contain"
                    style={{ alignSelf: 'center', flex: 1, height: 100 }}
                    source={ require('../../assets/pull-to-refresh.gif')}
                />
                <H2 style = {{ textAlign: 'center', paddingTop: 25 }}>Không có dữ liệu :(</H2>
                <Text style = {{ textAlign: 'center', paddingTop: 10 }}>Vui lòng kéo xuống để cập nhật</Text>
            </Content>
        )
    }
}