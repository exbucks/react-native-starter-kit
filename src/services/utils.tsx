import { Platform, Dimensions } from 'react-native'

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

export function isIPhoneX() {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    (dimen.height === 812 || dimen.width === 812)
  )
}

export function isAndroid() {
  return Platform.OS === 'android'
}
