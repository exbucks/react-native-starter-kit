import { ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native'
import { colors } from '../../../themes'
const window = Dimensions.get('window')

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.purple,
  paddingTop: 20,
}

export const logoText: TextStyle = {
  backgroundColor: 'transparent',
  position: 'absolute',
  top: window.height / 2 - 230,
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

export const introText: TextStyle = {
  color: colors.white,
  textAlign: 'center',
  fontSize: 14,
}

export const scrollContainer: ViewStyle = {
  height: 200,
  flexDirection: 'column',
  alignItems: 'center',
}

export const scrollViewStyle: ViewStyle = {
  height: 150,
  width: window.width,
  paddingVertical: 10,
  paddingHorizontal: 5,
  overflow: 'hidden',
}

export const scrollContentContainer: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const profileButton: ViewStyle = {
  borderRadius: 18,
  backgroundColor: colors.white,
  width: '65%',
  height: 36,
  marginLeft: 3,
  marginBottom: 10,
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
