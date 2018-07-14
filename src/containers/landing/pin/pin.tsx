import * as React from 'react'
import { Alert, Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { parseNumber, formatNumber } from 'libphonenumber-js'
import { equals } from 'ramda'
import AuthActions from '../../../actions/auth'
import { BackButton } from '../../../components/shared'
import { colors } from '../../../themes'
import * as screenStyles from './pin.styles'

export interface PINScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  pin: string
  gettokenRequest?: (payload: any) => void
  checktokenRequest?: (payload: any) => void
}

export interface PINScreenState {
  routed: string
  countryCode: string
  phoneNumber: string
  validNumber: boolean
  phoneNumberSubmitted: boolean
  verificationCode: Array<string>
}

class PIN extends React.Component<PINScreenProps, PINScreenState> {
  codeInput: Array<any>

  constructor(props) {
    super(props)
    const routedFrom = props.navigation.getParam('from', 'login')
    this.state = {
      routed: routedFrom,
      countryCode: '+1',
      phoneNumber: '',
      validNumber: false,
      phoneNumberSubmitted: false,
      verificationCode: ['', '', '', '', '', ''],
    }
    this.codeInput = []
  }

  onSwitch = () => {
    const { routed, phoneNumberSubmitted } = this.state

    if (phoneNumberSubmitted) {
      this.setState({ phoneNumberSubmitted: false, phoneNumber: '' })
    } else {
      if (routed === 'login') {
        this.setState({ routed: 'signup' })
      } else {
        this.setState({ routed: 'login' })
      }
    }
  }

  onChangeCountryCode = text => {
    let countryCode = text
    if (countryCode.indexOf('+') === -1) {
      countryCode = '+' + countryCode
    }
    this.setState({ countryCode })
  }

  onChangePhoneNumber = phoneNumber => {
    const validNumber = phoneNumber.length === 10
    this.setState({ phoneNumber, validNumber })
  }

  onChangeVerificationCode = (index, text) => {
    if (!text) return

    const { verificationCode } = this.state
    verificationCode[index] = text
    this.setState({ verificationCode })

    if (index < 5) {
      this.codeInput[index + 1].focus()
    } else {
      this.checkVerificationCode()
    }
  }

  checkVerificationCode = () => {
    const { phoneNumber, verificationCode, routed } = this.state

    const payload = {
      phone: phoneNumber,
      verification: verificationCode.join(''),
    }
    this.props.checktokenRequest(payload)
  }

  submitNumber = () => {
    this.setState({ phoneNumberSubmitted: true })
    const payload = { phone: this.state.phoneNumber }
    this.props.gettokenRequest(payload)
  }

  formatNumber = () => {
    const { phoneNumber } = this.state
    const parsed = parseNumber(phoneNumber, 'US')
    const number = formatNumber(parsed, 'National')
    return number
  }

  resendCode = () => {
    Alert.alert(
      `We're sending another code to ${this.formatNumber()}. Please wait up to 3 minutes before requesting another`,
    )
    this.submitNumber()
  }

  render() {
    const { navigation, status } = this.props
    const { routed, phoneNumberSubmitted, countryCode, phoneNumber, validNumber } = this.state

    let bgImage = null
    let sendButtonStyle = null

    if (routed === 'login') {
      bgImage = (
        <Image
          resizeMode="cover"
          style={screenStyles.backgroundImage}
          source={require('../../../assets/img/girl.jpg')}
        />
      )
      sendButtonStyle = {
        backgroundColor: colors.purple,
      }
    } else {
      sendButtonStyle = {
        borderWidth: 1,
        borderColor: colors.white,
      }
    }

    let introText = ''
    let bottomText = ''
    let bottomBtnText = ''
    if (phoneNumberSubmitted) {
      introText = 'Please enter the six-digit verification code sent to the number provided'
      bottomText = 'Wrong number?'
      bottomBtnText = 'Go back!'
    } else {
      if (routed === 'login') {
        introText = 'Enter the phone number associated with your account!'
        bottomText = "Don't you have an account?"
        bottomBtnText = 'Create one!'
      } else {
        introText = "Let's get you verified!"
        bottomText = 'Already have an account?'
        bottomBtnText = 'Log In!'
      }
    }

    const listArrary = [0, 1, 2, 3, 4, 5]

    return (
      <View style={screenStyles.ROOT}>
        {bgImage}
        <BackButton onBack={() => navigation.goBack()} />
        <Text style={screenStyles.logoText}>{'reel'}</Text>
        <Text style={screenStyles.introText}>{introText}</Text>
        {phoneNumberSubmitted ? (
          <View>
            <View style={screenStyles.codeArea}>
              {listArrary.map(key => {
                return (
                  <TextInput
                    onFocus={() => {
                      const { verificationCode } = this.state
                      verificationCode[key] = ''
                      this.setState({ verificationCode })
                    }}
                    ref={input => {
                      this.codeInput.push(input)
                    }}
                    maxLength={1}
                    key={`code-input-${key}`}
                    value={this.state.verificationCode[key]}
                    onChangeText={text => this.onChangeVerificationCode(key, text)}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    keyboardType="phone-pad"
                    style={screenStyles.codeTextInput}
                    width={40}
                  />
                )
              })}
            </View>
            {equals(status, 'error') && <Text>That code is invalid. Please try again</Text>}
            <TouchableOpacity
              onPress={() => this.resendCode()}
              style={[screenStyles.sendButton, { marginTop: 0 }]}
            >
              <Text style={[screenStyles.buttonText, { fontWeight: 'bold' }]}>
                Resend Verification
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={screenStyles.middleArea}>
            <View style={screenStyles.codeArea}>
              <TextInput
                style={screenStyles.codeTextInput}
                width={60}
                value={countryCode}
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType="phone-pad"
                maxLength={4}
                onChangeText={this.onChangeCountryCode}
              />
              <TextInput
                style={[screenStyles.codeTextInput, { textAlign: 'left' }]}
                placeholder="Phone Number"
                width="73%"
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType="phone-pad"
                value={phoneNumber}
                maxLength={14}
                onChangeText={this.onChangePhoneNumber}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.submitNumber()}
              style={[screenStyles.sendButton, sendButtonStyle]}
              disabled={!validNumber}
            >
              <Text style={screenStyles.buttonText}>Send Verification</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={screenStyles.bottomArea}>
          <Text style={screenStyles.bottomText}>{bottomText}</Text>
          <TouchableOpacity onPress={() => this.onSwitch()}>
            <Text style={[screenStyles.buttonText, { fontWeight: 'bold' }]}>{bottomBtnText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
  pin: state.auth.pin,
})

const mapDispatchToProps = dispatch => ({
  gettokenRequest: (payload: any) => dispatch(AuthActions.gettokenRequest(payload)),
  checktokenRequest: (payload: any) => dispatch(AuthActions.checktokenRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PIN)
