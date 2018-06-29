import * as React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import AppActions from '../../../actions/app'
import * as screenStyles from './launch.styles'

export interface LaunchScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
}

export interface LaunchScreenState {
  isBusy: boolean
}

class Launch extends React.Component<LaunchScreenProps, LaunchScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  toLogin = () => {
    this.props.navigation.navigate('pin', { from: 'login'})
  }

  toSignup = () => {
    this.props.navigation.navigate('pin', { from: 'signup'})
  }

  render() {
    return (
      <View style={screenStyles.ROOT}>
        <Image
          resizeMode="cover"
          style={screenStyles.backgroundImage}
          source={require('../../../assets/img/girl.jpg')}
        />
        <Text
          style={screenStyles.logoText}
        >
          {'reel'}
        </Text>
        <TouchableOpacity
          style={[screenStyles.loginButton, { backgroundColor: 'white' }]}
          onPress={this.toSignup}
        >
          <Text style={screenStyles.registerText}>Create an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[screenStyles.loginButton, { marginTop: 10 }]}
          onPress={this.toLogin}
        >
          <Text style={screenStyles.loginText}>Log In</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Launch)
