import * as React from 'react'
import { Text, TouchableOpacity, View, TextInput, Keyboard, Alert, Linking } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { create } from 'apisauce'
import * as qs from 'query-string'
import AppActions from '../../../actions/app'
import * as screenStyles from './signup.styles'
import { colors } from '../../../themes'
import { KeyboardSpacer } from '../../../components'

export interface SignupScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
}

export interface SignupScreenState {
  isBusy: boolean,
  phoneNumber: string,
  username: string,
  firstName: string,
  lastName: string,
  checkingName: boolean,
  nameAvailability: boolean,
  errorMessage: string,
}

class SignUp extends React.Component<SignupScreenProps, SignupScreenState> {
  api: any
  AUTH_KEY: string = 'ffaf4b736f342c3c3aace3d86fb72341'
  BASE_URL: string = 'https://www.net-networking.com/mobile_api'
  termsUrl: string = 'https://www.reel-social.com/terms'
  privacyUrl: string = 'https://www.reel-social.com/privacy-policy'

  constructor(props) {
    super(props)
    const phoneNumber = props.navigation.getParam('phoneNumber', '')
    this.state = {
      isBusy: false,
      phoneNumber: phoneNumber,
      username: '',
      firstName: '',
      lastName: '',
      checkingName: false,
      nameAvailability: false,
      errorMessage: '',
    }

    this.api = create({
      baseURL: this.BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    })
  }

  closeKeyboard = () => {
    Keyboard.dismiss()
  }

  gotoHome = () => {
    this.props.navigation.navigate('main')
  }

  onChangeUsername = async(username) => {
    username = username.replace(/\W/g, '')

    this.setState({ username, checkingName: true })
    const reqBody = qs.stringify({
      handle: username,
      AUTH_KEY: this.AUTH_KEY,
    })

    const response = await this.api.post('is_name_available', reqBody)
    this.setState({ checkingName: false })
    if (response) {
      const nameAvailability = response.data.status === 'success'
      this.setState({ nameAvailability })
    }
  }

  showTermsAlert = () => {
    this.closeKeyboard()
    Alert.alert(
      '',
      'Do you agree to our terms of service?',
      [
        { text: 'Yes, agree!', onPress: () => this.signUp() },
        { text: 'Don\'t agree!', onPress: () => console.log('Dont agree') },
      ],
      { cancelable: false },
    )
  }

  signUp = async() => {
    this.closeKeyboard()

    const { username, firstName, lastName, phoneNumber } = this.state
    const reqBody = qs.stringify({
      AUTH_KEY: this.AUTH_KEY,
      first: firstName,
      ln: lastName,
      handle: username.toLowerCase(),
      pwd: phoneNumber,
      phone: phoneNumber,
    })
    const response = await this.api.post('create_user', reqBody)
    console.log('*********', response)
    if (response.data.status === 'success') {
      this.gotoHome()
    } else {
      this.setState({ errorMessage: response.data.message })
    }
  }

  gotoTerms = () => {
    Linking.openURL(this.termsUrl)
  }  

  gotoPrivacy = () => {
    Linking.openURL(this.privacyUrl)
  }

  render() {
    const { checkingName, nameAvailability, username, firstName, lastName, errorMessage } = this.state
    return (
      <View style={screenStyles.ROOT}>
        <View style={screenStyles.contentContainer}>
          <Text style={screenStyles.logoText}>reel</Text>
          <Text style={screenStyles.introText}>Last step!</Text>
          {checkingName ? (
            <Text style={screenStyles.availabilityText}>Checking availability</Text>
          ) : (
            <Text style={screenStyles.availabilityText}>{''}</Text>
          )}
          {!nameAvailability && username !='' ? (
            <Text style={screenStyles.availabilityText}>{`Username ${username} is already taken`}</Text>
          ) : (
            <Text style={screenStyles.availabilityText}>{''}</Text>
          )}
          <TextInput
            autoCapitalize="none"
            value={username}
            onChangeText={this.onChangeUsername}
            placeholder="Username"
            style={[screenStyles.nameTextInput, {borderColor: !nameAvailability && username ? colors.red : colors.lightergrey}]}
            underlineColorAndroid={colors.transparent}
            returnKeyType='done'
          />
          <TextInput
            value={firstName}
            onChangeText={firstName => this.setState({ firstName })}
            placeholder="First Name"
            style={[screenStyles.nameTextInput, {borderColor: colors.lightergrey}]}
            autoCapitalize="none"
            underlineColorAndroid={colors.transparent}
            returnKeyType='done'
          />
          <TextInput
            value={lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder="Last Name"
            style={[screenStyles.nameTextInput, {borderColor: colors.lightergrey}]}
            autoCapitalize="none"
            underlineColorAndroid={colors.transparent}
            returnKeyType='done'
          />
          {errorMessage !='' && (
            <Text style={screenStyles.errorText}>{errorMessage}</Text>
          )}
          <TouchableOpacity
            style={screenStyles.createButton}
            onPress={this.showTermsAlert}
            disabled={!nameAvailability || firstName==='' || lastName===''}
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
        <KeyboardSpacer />
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
