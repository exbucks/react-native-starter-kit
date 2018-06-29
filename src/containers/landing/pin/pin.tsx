import * as React from 'react'
import { Text, TouchableOpacity, View, Image, Button } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/FontAwesome'
import AppActions from '../../../actions/app'
import * as screenStyles from './pin.styles'

export interface PINScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
}

export interface PINScreenState {
  isBusy: boolean,
  routed: string,
  countryCode: string,
  phoneNumber: string,
  validNumber: boolean,
  sendingText: boolean,
  phoneNumberSubmitted: boolean,
}

class PIN extends React.Component<PINScreenProps, PINScreenState> {
  constructor(props) {
    super(props)
    const routedFrom = props.navigation.getParam('from', 'login')
    this.state = { 
      isBusy: false,
      routed: routedFrom,
      countryCode: '+1',
      phoneNumber: '',
      validNumber: false,
      sendingText: false,
      phoneNumberSubmitted: false,
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  toLogin = () => {
    this.props.navigation.navigate('signup')
  }

  render() {
    let bgImage = null
    if (this.state.routed === 'login') {
      bgImage = (
        <Image
          resizeMode="cover"
          style={screenStyles.backgroundImage}
          source={require('../../../assets/img/girl.jpg')}
        />
      )
    }

    return (
      <View style={screenStyles.ROOT}>
        { bgImage }
        <Text
          style={screenStyles.logoText}
        >
          {'reel'}
        </Text>
        <TouchableOpacity onPress={this.toLogin}>
          <Text>PIN</Text>
          <Text>{this.state.routed}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(PIN)
