import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { colors, metrics } from '../themes'

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

export const leftContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 15,
}

export const leftImage: ImageStyle = {
  resizeMode: 'contain',
  tintColor: 'white',
  width: 110,
  height: 25,
}

export const rightContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 15,
}

export const rightBell: ImageStyle = {
  resizeMode: 'contain',
  tintColor: 'white',
  width: 20,
  height: 20,
}

export const rightUser: ViewStyle = {
  borderColor: '#ffffff',
  borderRadius: 14,
  borderWidth: 1,
  marginLeft: 20,
  width: 28,
  height: 28,
}

export const userImage: ImageStyle = {
  borderRadius: 13,
  width: 26,
  height: 26,
}

export const drawerContainer: ViewStyle = {
  marginRight: 15,
  marginTop: 0,
}

export const tabContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-end',
  backgroundColor: colors.white,
}

export const tabItem: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: 45,
}

export const tabCamera: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
  marginBottom: 10,
}

export const tabCameraView: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: colors.tabBarColor,
}

export const tabBack: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  height: 45,
  left: 0,
  right: 0,
  zIndex: -1,
  borderTopWidth: 1,
  borderColor: colors.lightergrey,
  backgroundColor: colors.tabBarColor,
}
