import { ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native'
import { colors } from '../../../themes'
const window = Dimensions.get('window')

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.purple,
}

export const contentContainer: ViewStyle = {
  width: window.width * 0.65,
  flexDirection: 'column',
  alignItems: 'center',
}

export const logoText: TextStyle = {
  width: '100%',
  textAlign: 'center',
  fontFamily: 'Pacifico',
  fontSize: 90,
  color: colors.white,
  padding: 5,
  textShadowRadius: 2,
  textShadowColor: colors.shadowColor,
  textShadowOffset: { width: 1, height: 1 },
}

export const introText: TextStyle = {
  color: colors.white,
  fontSize: 14,
  fontFamily: 'Varela Round',
}

export const availabilityText: TextStyle = {
  color: colors.white,
  fontSize: 12,
  textAlign: 'left',
  alignSelf: 'flex-start',
  fontFamily: 'Varela Round',
}

export const nameTextInput: TextStyle = {
  color: colors.black,
  fontSize: 14,
  backgroundColor: colors.white,
  borderRadius: 20,
  borderWidth: 1,
  height: 35,
  width: '100%',
  padding: 5,
  paddingLeft: 15,
  margin: 5,
}

export const errorText: TextStyle = {
  color: colors.red,
  fontSize: 15,
  padding: 8,
  textAlign: 'center',
  fontFamily: 'Varela Round',
}

export const createButton: ViewStyle = {
  width: '100%',
  height: 35,
  marginTop: 8,
  borderRadius: 20,
  borderColor: colors.white,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

export const buttonText: TextStyle = {
  color: colors.white,
  fontSize: 14,
}

export const bottomArea: ViewStyle = {
  width: window.width * 0.8,
  marginVertical: 15,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

export const linkArea: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 100,
}

export const linkText: TextStyle = {
  color: colors.white,
  fontWeight: 'bold',
}

export const linkBetweenText: TextStyle = {
  color: colors.white,
  textShadowColor: colors.shadowColor,
  textShadowRadius: 2,
  textShadowOffset: { width: 1, height: 1 },
  paddingHorizontal: 5,
}

export const LoginArea: ViewStyle = {
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
