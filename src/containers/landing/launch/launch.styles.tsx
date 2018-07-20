import { ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native'
import { colors } from '../../../themes'
const window = Dimensions.get('window')

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

export const backgroundImage: ImageStyle = {
  position: 'absolute',
  zIndex: -1,
  top: -40,
  left: 0,
  bottom: 0,
  right: 0,
  width: window.width,
  height: window.height + 50,
}

export const logoText: TextStyle = {
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  top: window.height / 2 - 230,
  fontFamily: 'Pacifico',
  fontSize: 90,
  color: colors.white,
  textShadowRadius: 2,
  textShadowColor: colors.shadowColor,
  textShadowOffset: { width: 1, height: 1 },
}

export const loginButton: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '65%',
  borderRadius: 25,
  backgroundColor: colors.purple,
  height: 40,
}

export const loginText: TextStyle = {
  color: colors.white,
}

export const registerText: TextStyle = {
  color: colors.grey,
}
