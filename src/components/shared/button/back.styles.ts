import { ViewStyle } from 'react-native'
import { isIPhoneX, isAndroid } from '../../../services'

export const ROOT: ViewStyle = {
  position: 'absolute',
  left: 0,
  top: isAndroid() ? 0 : isIPhoneX() ? 40 : 15,
}

export const button: ViewStyle = {
  padding: 15,
}
