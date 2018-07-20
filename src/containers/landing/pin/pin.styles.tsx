import { ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native'
import { colors } from '../../../themes'
import { isAndroid } from '../../../services'
const window = Dimensions.get('window')

export const ROOT: ViewStyle = {
  flex: 1,
  padding: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.purple,
}

export const logoText: TextStyle = {
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  top: isAndroid() ? window.height / 2 - 250 : window.height / 2 - 230,
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

export const introText: TextStyle = {
  color: colors.white,
  textAlign: 'center',
  fontSize: isAndroid() ? 14 : 15,
  width: '85%',
  minHeight: 40,
}

export const middleArea: ViewStyle = {
  width: '100%',
  marginVertical: 10,
}

export const codeArea: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 5,
}

export const codeTextInput: TextStyle = {
  borderWidth: 0.5,
  textAlign: 'center',
  height: 40,
  margin: 5,
  borderColor: colors.transparent,
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#f5f5f5',
  color: '#666',
  fontSize: 14,
}

export const sendButton: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  height: 40,
  margin: 5,
  borderWidth: 1,
  borderColor: colors.transparent,
}

export const buttonText: TextStyle = {
  color: colors.white,
  fontSize: 14,
}

export const bottomArea: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 20,
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

export const bottomText: TextStyle = {
  color: colors.white,
  fontSize: 14,
  marginRight: 10,
}

export const errroText: TextStyle = {
  color: colors.red,
  fontSize: 14,
  textAlign: 'center',
  fontFamily: 'Varela Round',
}
