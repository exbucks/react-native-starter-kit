import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import AppActions from '../../../actions/app'
import * as screenStyles from './explorer.styles'

export interface ExplorerScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
}

export interface ExplorerScreenState {
  isBusy: boolean
}

class ExplorerScreen extends React.Component<ExplorerScreenProps, ExplorerScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  toLogin = () => {
    this.props.navigation.navigate('login')
  }

  render() {
    return (
      <View style={screenStyles.ROOT}>
        <TouchableOpacity onPress={this.toLogin}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'TAB 5',
  })
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(AppActions.loginRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerScreen)
