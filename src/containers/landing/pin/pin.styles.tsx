import { ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native'
import { colors } from '../../../themes'
const window = Dimensions.get('window')

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.purple,
}

export const logoText: TextStyle = {
  backgroundColor: 'transparent',
  position: 'absolute',
  top: window.height / 2 - 200,
  left: window.width / 2,
  marginLeft: -80,
  fontFamily: 'Pacifico',
  fontSize: 90,
  color: colors.white,
  padding: 5,
  textShadowRadius: 2,
  textShadowColor: colors.shadowColor,
  textShadowOffset: { width: 1, height: 1 },
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
