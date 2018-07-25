import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { colors } from '../../../themes'

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.white,
}

export const scrollContainer: ViewStyle = {
  flex: 1,
  width: '100%',
}

export const topContainer: ViewStyle = {
  height: 125,
  flexDirection: 'row',
}
