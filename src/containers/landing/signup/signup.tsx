import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import AppActions from '../../../actions/app'
import * as screenStyles from './signup.styles'

export interface SignupScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
}

export interface SignupScreenState {
  isBusy: boolean
}

class SignUp extends React.Component<SignupScreenProps, SignupScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  toLogin = () => {
    this.props.navigation.navigate('main')
  }

  render() {
    return (
      <View style={screenStyles.ROOT}>
        <TouchableOpacity onPress={this.toLogin}>
          <Text>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(AppActions.loginRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
