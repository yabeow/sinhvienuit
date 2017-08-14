import color from 'color';
import { Platform } from 'react-native';
const platform = Platform.OS;
const header =
    {
        toolbarBtnColor: (platform === 'ios') ? '#007aff' : '#fff',
        toolbarDefaultBg: (platform === 'ios') ? '#F8F8F8' : '#3F51B5',
        toolbarHeight: (platform === 'ios') ? 64 : 56,
        toolbarIconSize: (platform === 'ios') ? 20 : 22,
        toolbarSearchIconSize: (platform === 'ios') ? 20 : 23,
        toolbarInputColor: (platform === 'ios') ? '#CECDD2' : '#fff',
        searchBarHeight: (platform === 'ios') ? 30 : 40,
        toolbarInverseBg: '#222',
        toolbarTextColor: (platform === 'ios') ? '#000' : '#fff',
        toolbarDefaultBorder: (platform === 'ios') ? '#a7a6ab' : '#3F51B5',
        iosStatusbar: (platform === 'ios') ? 'dark-content' : 'light-content',
        get statusBarColor() {
            return color(this.toolbarDefaultBg).darken(0.2);
        }
    };
export default {
    Header: {
        headerTintColor: header.toolbarTextColor,
        headerStyle: {
            backgroundColor: header.toolbarDefaultBg,
            borderColor: header.toolbarDefaultBorder
        }
    },
    statusBarColor: header.statusBarColor,
    iosStatusbar: header.iosStatusbar,
}