import * as React from 'react'
import { ProgressViewIOS, ProgressBarAndroid, Platform, View } from 'react-native'

export class ProgressBar extends React.Component {
  render() {
    const { progress, color, ...props } = this.props

    if (Platform.OS === 'ios') {
      return (
        <ProgressViewIOS
          {...props}
          progress={progress ? progress / 100 : 0}
          progressTintColor={color ? color : '#fff'}
          trackTintColor="#000"
        />
      )
    } else if (Platform.OS === 'android') {
      <ProgressBarAndroid
        {...props}
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress ? progress / 100 : 0}
        color={color ? color : '#fff'}
      />
    }
  }
}
