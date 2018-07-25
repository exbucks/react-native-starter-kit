import * as React from 'react'
import { Image, View } from 'react-native'
import { colors } from '../../../themes'

interface RoundAvatarProps {
  uri: string
  size?: number
  hasContent?: boolean
  newContent?: boolean
}

export default class RoundAvatar extends React.Component<RoundAvatarProps, {}> {
  render() {
    const { uri, size, hasContent, newContent } = this.props
    let height = size ? size : 100

    const width = height
    const borderRadius = height / 2
    let borderColor = colors.grey33
    if (hasContent) {
      borderColor = colors.grey
    }
    if (newContent) {
      borderColor = colors.purple
    }

    return (
      <View
        style={{
          height: height + 4,
          width: width + 4,
          borderRadius: borderRadius + 2,
          borderColor: borderColor,
          borderWidth: 2,
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri }}
          resizeMode="cover"
          style={{
            height,
            width,
            borderRadius,
            borderWidth: 4,
            borderColor: colors.white,
          }}
        />
      </View>
    )
  }
}
