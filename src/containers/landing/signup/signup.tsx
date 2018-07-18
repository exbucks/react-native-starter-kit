import * as React from 'react'
import { Text, TouchableOpacity, View, TextInput, Keyboard, Alert, Linking } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import AppActions from '../../../actions/app'
import AuthActions from '../../../actions/auth'
import * as screenStyles from './signup.styles'
import { colors } from '../../../themes'
import { KeyboardSpacer } from '../../../components'

export interface SignupScreenProps extends NavigationScreenProps<{}> {
  status: string
  message: string
  usernameRequest?: (e: any) => void
  signupRequest?: (e: any) => void
}

export interface SignupScreenState {
  isBusy: boolean
  phoneNumber: string
  username: string
  firstName: string
  lastName: string
}

class SignUp extends React.Component<SignupScreenProps, SignupScreenState> {
  termsUrl: string = 'https://www.reel-social.com/terms'
  privacyUrl: string = 'https://www.reel-social.com/privacy-policy'

  constructor(props) {
    super(props)
    const phoneNumber = props.navigation.getParam('phone', '')
    this.state = {
      isBusy: false,
      phoneNumber: phoneNumber,
      username: '',
      firstName: '',
      lastName: '',
    }
  }

  closeKeyboard = () => {
    Keyboard.dismiss()
  }

  gotoHome = () => {
    this.props.navigation.navigate('main')
  }

  onChangeUsername = username => {
    username = username.replace(/\W/g, '')

    this.setState({ username })
    const payload = {
      handle: username,
    }
    this.props.usernameRequest(payload)
  }

  showTermsAlert = () => {
    this.closeKeyboard()
    Alert.alert(
      '',
      'Do you agree to our terms of service?',
      [
        { text: 'Yes, agree!', onPress: () => this.signUp() },
        { text: "Don't agree!", onPress: () => console.log('Dont agree') },
      ],
      { cancelable: false },
    )
  }

  signUp = async () => {
    this.closeKeyboard()
    const { username, firstName, lastName, phoneNumber } = this.state
    const payload = {
      first: firstName,
      ln: lastName,
      handle: username.toLowerCase(),
      pwd: phoneNumber,
      phone: phoneNumber,
    }
    this.props.signupRequest(payload)
  }

  gotoTerms = () => {
    Linking.openURL(this.termsUrl)
  }

  gotoPrivacy = () => {
    Linking.openURL(this.privacyUrl)
  }

  render() {
    const { username, firstName, lastName, phoneNumber } = this.state
    const { status, message } = this.props
    return (
      <View style={screenStyles.ROOT}>
        <View style={screenStyles.contentContainer}>
          <Text style={screenStyles.logoText}>reel</Text>
          <Text style={screenStyles.introText}>Last step!</Text>
          {status === 'checking' && (
            <Text style={screenStyles.availabilityText}>Checking availability</Text>
          )}
          {status === 'unavailable' &&
            username != '' && (
              <Text
                style={screenStyles.availabilityText}
              >{`Username ${username} is already taken`}</Text>
            )}
          <TextInput
            autoCapitalize="none"
            value={username}
            onChangeText={this.onChangeUsername}
            placeholder="Username"
            style={[
              screenStyles.nameTextInput,
              {
                borderColor: status === 'unavailable' && username ? colors.red : colors.lightergrey,
              },
            ]}
            underlineColorAndroid={colors.transparent}
            returnKeyType="done"
          />
          <TextInput
            value={firstName}
            onChangeText={firstName => this.setState({ firstName })}
            placeholder="First Name"
            style={[screenStyles.nameTextInput, { borderColor: colors.lightergrey }]}
            autoCapitalize="none"
            underlineColorAndroid={colors.transparent}
            returnKeyType="done"
          />
          <TextInput
            value={lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder="Last Name"
            style={[screenStyles.nameTextInput, { borderColor: colors.lightergrey }]}
            autoCapitalize="none"
            underlineColorAndroid={colors.transparent}
            returnKeyType="done"
          />
          {message != '' && <Text style={screenStyles.errorText}>{message}</Text>}
          <TouchableOpacity
            style={screenStyles.createButton}
            onPress={this.showTermsAlert}
            disabled={status === 'unavailable' || firstName === '' || lastName === ''}
          >
            <Text style={screenStyles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View style={screenStyles.bottomArea}>
          <Text style={screenStyles.introText}>By creating an account, you agree to our</Text>
          <View style={screenStyles.linkArea}>
            <TouchableOpacity onPress={this.gotoTerms}>
              <Text style={screenStyles.linkText}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={screenStyles.linkBetweenText}>and</Text>
            <TouchableOpacity onPress={this.gotoPrivacy}>
              <Text style={screenStyles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={screenStyles.LoginArea}>
          <Text style={screenStyles.bottomText}>{`Already have an account?`}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('login', { phone: phoneNumber })}
          >
            <Text style={[screenStyles.buttonText, { fontWeight: 'bold' }]}>{` Log in! `}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
  message: state.auth.message,
})

const mapDispatchToProps = dispatch => ({
  usernameRequest: (payload: any) => dispatch(AppActions.usernameRequest(payload)),
  signupRequest: (payload: any) => dispatch(AuthActions.signupRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp)
