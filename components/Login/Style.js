import { StyleSheet } from 'react-native';

export const LOGO_SIZE_DEFAULT = 150;
export const LOGO_SIZE_SMALL = 100;

export default StyleSheet.create({
  VCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  HCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  Logo: {
    width: 160,
    height: 160,
  },
  LogoView: {
    flex: 0,
    paddingBottom: 10,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  Text: {
    color: 'white',
    backgroundColor: 'transparent',
    lineHeight: 30,
    fontSize: 17,
  },
});
