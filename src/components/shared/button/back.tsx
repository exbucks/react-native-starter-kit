import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SVGBack } from '../svg'
import * as screenStyles from './back.styles'

interface BackButtonProps {
  color?: string
  onBack?: () => void
}

export class BackButton extends React.Component<BackButtonProps, {}> {
  render() {
    const { onBack } = this.props
    let { color } = this.props
    if (color == null) {
      color = '#404040'
    }

    return (
      <View style={screenStyles.ROOT}>
        <TouchableOpacity onPress={() => onBack()} style={screenStyles.button}>
          {SVGBack(18, color)}
        </TouchableOpacity>
      </View>
    )
  }
}
