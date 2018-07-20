import * as React from 'react'
import { Alert, Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { parseNumber, formatNumber } from 'libphonenumber-js'
import AuthActions from '../../../actions/auth'
import { BackButton } from '../../../components/shared'
import { colors } from '../../../themes'
import * as screenStyles from './pin.styles'

export interface PINScreenProps extends NavigationScreenProps<{}> {
  status: string
  pin: string
  gettokenRequest?: (payload: any) => void
}

export interface PINScreenState {
  routed: string
  countryCode: string
  phoneNumber: string
  phoneNumberSubmitted: boolean
  verificationCode: Array<string>
  invalidCode: boolean
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
      phoneNumberSubmitted: false,
      verificationCode: ['', '', '', '', '', ''],
      invalidCode: false,
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
    this.setState({ phoneNumber })
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
    const { verificationCode, routed, phoneNumber } = this.state
    const { pin } = this.props
    const code = pin.match(/\d/g).join('')
    if (code == verificationCode.join('')) {
      if (routed === 'login') {
        this.props.navigation.navigate('login', { phone: phoneNumber })
      } else {
        this.props.navigation.navigate('signup', { phone: phoneNumber })
      }
    } else {
      this.setState({ invalidCode: true })
    }
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

  backgroundImage = () => {
    const { routed } = this.state
    if (routed === 'login') {
      return (
        <Image
          resizeMode="cover"
          style={screenStyles.backgroundImage}
          source={require('../../../assets/img/girl.jpg')}
        />
      )
    } else {
      return null
    }
  }

  introText = () => {
    const { routed, phoneNumberSubmitted } = this.state
    let introText = ''
    if (phoneNumberSubmitted) {
      introText = 'Please enter the six-digit verification code sent to the number provided'
    } else {
      if (routed === 'login') {
        introText = 'Enter the phone number associated with your account!'
      } else {
        introText = "Let's get you verified!"
      }
    }
    return introText
  }

  bottomArea = () => {
    const { routed, phoneNumberSubmitted } = this.state

    let bottomText = ''
    let bottomBtnText = ''
    if (phoneNumberSubmitted) {
      bottomText = 'Wrong number?'
      bottomBtnText = 'Go back!'
    } else {
      if (routed === 'login') {
        bottomText = "Don't you have an account?"
        bottomBtnText = 'Create one!'
      } else {
        bottomText = 'Already have an account?'
        bottomBtnText = 'Log In!'
      }
    }

    return (
      <View style={screenStyles.bottomArea}>
        <Text style={screenStyles.bottomText}>{bottomText}</Text>
        <TouchableOpacity onPress={() => this.onSwitch()}>
          <Text style={[screenStyles.buttonText, { fontWeight: 'bold' }]}>{bottomBtnText}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  phonenumberArea = () => {
    const { routed, countryCode, phoneNumber } = this.state
    return (
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
            style={[screenStyles.codeTextInput, { textAlign: 'left', paddingLeft: 20 }]}
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
          style={[
            screenStyles.sendButton,
            {
              backgroundColor: routed === 'login' ? colors.purple : colors.transparent,
              borderColor: routed === 'login' ? colors.transparent : colors.white,
            },
          ]}
          disabled={phoneNumber.length !== 10}
        >
          <Text style={screenStyles.buttonText}>{`Send Verification`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  verificationCodeArea = () => {
    const listArrary = [0, 1, 2, 3, 4, 5]
    const { verificationCode } = this.state
    return (
      <View style={screenStyles.codeArea}>
        {listArrary.map(key => {
          return (
            <TextInput
              onFocus={() => {
                verificationCode[key] = ''
                this.setState({ verificationCode, invalidCode: false })
              }}
              ref={input => {
                this.codeInput.push(input)
              }}
              maxLength={1}
              key={`code-input-${key}`}
              value={verificationCode[key]}
              onChangeText={text => this.onChangeVerificationCode(key, text)}
              underlineColorAndroid="rgba(0,0,0,0)"
              keyboardType="phone-pad"
              style={screenStyles.codeTextInput}
              width={40}
            />
          )
        })}
      </View>
    )
  }

  render() {
    const { navigation } = this.props
    const { phoneNumberSubmitted, invalidCode } = this.state

    return (
      <View style={screenStyles.ROOT}>
        {this.backgroundImage()}
        <BackButton onBack={() => navigation.goBack()} />
        <Text style={screenStyles.logoText}>{'reel'}</Text>
        <Text style={screenStyles.introText}>{this.introText()}</Text>
        {phoneNumberSubmitted ? (
          <View>
            {this.verificationCodeArea()}
            {invalidCode && (
              <Text style={screenStyles.errroText}>{`That code is invalid. Please try again`}</Text>
            )}
            <TouchableOpacity
              onPress={() => this.resendCode()}
              style={[screenStyles.sendButton, { marginTop: 0 }]}
            >
              <Text style={[screenStyles.buttonText, { fontWeight: 'bold' }]}>
                {`Resend Verification`}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          this.phonenumberArea()
        )}
        {this.bottomArea()}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.auth.status,
  pin: state.auth.pin,
})

const mapDispatchToProps = dispatch => ({
  gettokenRequest: (payload: any) => dispatch(AuthActions.gettokenRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PIN)
