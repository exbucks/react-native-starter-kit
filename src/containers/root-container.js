import * as React from 'react'
import { View } from 'react-native'
import ReduxNavigation from '../navigation/redux-navigation'


class RootContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isReady: false }
  }

  componentDidMount() {
    // Setting up environment later...
    this.setState({ isReady: true })
  }

  render() {
    return <ReduxNavigation />
  }
}

export default RootContainer
