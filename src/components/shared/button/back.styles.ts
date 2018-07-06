import { ViewStyle } from 'react-native'
import { isIPhoneX } from '../../../services'

export const ROOT: ViewStyle = {
  position: 'absolute',
  left: 0,
  top: isIPhoneX() ? 40 : 15,
}

export const button: ViewStyle = {
  padding: 15,
}
