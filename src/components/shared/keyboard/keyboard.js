import * as React from 'react'
import { Keyboard, View } from 'react-native'


export class KeyboardSpacer extends React.Component {
  state = { keyboardHeight: 0 }

  disposeShowListener: any
  dispostHideListener: any

  /**
   * When we first get attached, we'll subscribe to Keyboard for events.
   */
  componentWillMount() {
    this.disposeShowListener = Keyboard.addListener('keyboardWillShow', this.handleKeyboardWillShow)
    this.dispostHideListener = Keyboard.addListener('keyboardWillHide', this.handleKeyboardWillHide)
  }

  /**
   * When we leave, we clean up after ourself.
   */
  componentWillUnmount() {
    this.disposeShowListener.remove()
    this.dispostHideListener.remove()
  }

  /**
   * Render
   */
  render() {
    const offset = this.props.offset || 0
    const height = this.state.keyboardHeight + offset
    return <View pointerEvents="none" style={{ height }} />
  }

  handleKeyboardWillShow = (event: KeyboardEvent) => {
    this.setState({ keyboardHeight: event.endCoordinates.height })
    this.props.onShowing && this.props.onShowing()
  }

  handleKeyboardWillHide = (event: KeyboardEvent) => {
    this.setState({ keyboardHeight: 0 })
    this.props.onHiding && this.props.onHiding()
  }
}
