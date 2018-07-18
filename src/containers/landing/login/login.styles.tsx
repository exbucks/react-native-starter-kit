import { ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native'
import { colors } from '../../../themes'
import { isAndroid } from '../../../services'
const window = Dimensions.get('window')

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.purple,
}

export const logoText: TextStyle = {
  width: '100%',
  height: 150,
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
  textAlign: 'center',
  fontSize: 14,
}

export const scrollContainer: ViewStyle = {
  height: 230,
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 100,
}

export const scrollViewStyle: ViewStyle = {
  width: window.width,
  padding: 15,
  overflow: 'scroll',
}

export const scrollContentContainer: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const profileButton: ViewStyle = {
  borderRadius: 18,
  backgroundColor: colors.white,
  width: '65%',
  height: 35,
  marginBottom: 5,
}

export const profileContainer: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  flexWrap: 'wrap',
}

export const profileImage: ImageStyle = {
  width: 28,
  height: 28,
  borderRadius: 15,
}

export const profileName: TextStyle = {
  color: colors.black,
  marginLeft: 5,
}
