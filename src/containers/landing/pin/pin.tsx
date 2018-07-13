import * as React from 'react'
import { Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { create } from 'apisauce'
import * as qs from 'query-string'
import { parseNumber, formatNumber } from 'libphonenumber-js'
import AuthActions from '../../../actions/auth'
import { BackButton } from '../../../components/shared'
import * as screenStyles from './pin.styles'
import { colors } from '../../../themes'

export interface PINScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
  gettokenRequest?: (payload: any) => void
  checktokenRequest?: (payload: any) => void
}

export interface PINScreenState {
  isBusy: boolean,
  routed: string,
  countryCode: string,
  phoneNumber: string,
  validNumber: boolean,
  sendingText: boolean,
  phoneNumberSubmitted: boolean,
  verificationCode: Array<string>,
  error: boolean,
}

class PIN extends React.Component<PINScreenProps, PINScreenState> {
  codeInput: Array<any>
  api: any
  AUTH_KEY: string = 'ffaf4b736f342c3c3aace3d86fb72341'
  BASE_URL: string = 'https://www.net-networking.com/mobile_api'

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
      verificationCode: ['', '', '', '', '', ''],
      error: false,
    }
    this.codeInput = []
    this.api = create({
      baseURL: this.BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  toLogin = phoneNumber => {
    this.props.navigation.navigate('login', {
      phoneNumber: phoneNumber,
    })
  }

  toSignup = phoneNumber => {
    this.props.navigation.navigate('signup', {
      phoneNumber: phoneNumber,
    })
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
    this.setState ({ countryCode })
  }

  onChangePhoneNumber = phoneNumber => {
    const validNumber = phoneNumber.length === 10
    this.setState({ phoneNumber, validNumber })
  }

  onChangeVerificationCode = (index, text) => {
    if (!text) {
      return
    }

    const { verificationCode } = this.state
    verificationCode[index] = text
    this.setState({ verificationCode })

    if (index < 5) {
      this.codeInput[index+1].focus()
    } else {
      this.checkVerificationCode()
    }
  }

  checkVerificationCode = async () => {
    const { phoneNumber, verificationCode, routed } = this.state

    const payload = {
      phone: phoneNumber,
      verification: verificationCode.join(''),
    }
    this.props.checktokenRequest(payload)

    // const { phoneNumber, verificationCode, routed } = this.state

    // const reqBody = qs.stringify({
    //   phone: phoneNumber,
    //   verification: verificationCode.join(''),
    //   AUTH_KEY: this.AUTH_KEY,
    // })
    // const response = await this.api.post('check_verification_token', reqBody)
    // console.log('*********', response)
    // if (response.data.status === 'success') {
    //   routed === 'login' ? this.toLogin(phoneNumber) : this.toSignup(phoneNumber)
    // }
  }

  submitNumber = async () => {
    this.setState({ phoneNumberSubmitted: true })
    const { phoneNumber } = this.state
    const payload = {
      phone: phoneNumber,
    }
    this.props.gettokenRequest(payload)
  //   this.setState({ phoneNumberSubmitted: true })
  //   const { phoneNumber } = this.state

  //   const reqBody = qs.stringify({
  //     phone: phoneNumber,
  //     AUTH_KEY: this.AUTH_KEY,
  //   })
  //   const response = await this.api.post('get_challenge_token', reqBody)
  }

  formatNumber = () => {
    const { phoneNumber } = this.state
    const parsed = parseNumber(phoneNumber, 'US')
    const number = formatNumber(parsed, 'National')
    return number
  }

  resendCode = () => {
    alert(`We're sending another code to ${this.formatNumber()}. Please wait up to 3 minutes before requesting another`)
    this.submitNumber()
  }

  render() {
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

    let introText = ""
    let bottomText = ""
    let bottomBtnText = ""
    if (phoneNumberSubmitted) {
      introText = "Please enter the six-digit verification code sent to the number provided"
      bottomText = "Wrong number?"
      bottomBtnText = "Go back!"
    } else {
      if (routed === 'login') {
        introText = "Enter the phone number associated with your account!"
        bottomText = "Don't you have an account?"
        bottomBtnText = "Create one!"
      } else {
        introText = "Let's get you verified!"
        bottomText = "Already have an account?"
        bottomBtnText = "Log In!"  
      }
    }

    const listArrary = [0, 1, 2, 3, 4, 5]

    return (
      <View style={screenStyles.ROOT}>
        { bgImage }
        <BackButton onBack={() => this.goBack()}/>
        <Text
          style={screenStyles.logoText}
        >
          {'reel'}
        </Text>
        <Text style={screenStyles.introText}>
          { introText }
        </Text>
        { phoneNumberSubmitted ? (
          <View>
            <View style={screenStyles.codeArea}>
              {listArrary.map((key) => {
                return (
                  <TextInput
                    onFocus = {() => {
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
                    onChangeText={text =>
                      this.onChangeVerificationCode(key, text)
                    }
                    underlineColorAndroid="rgba(0,0,0,0)"
                    keyboardType="phone-pad"
                    style={screenStyles.codeTextInput}
                    width={40}
                  />
                )
              })}
            </View>
            {this.state.error && (
              <Text>
                That code is invalid. Please try again
              </Text>
            )}
            <TouchableOpacity
              onPress={() => this.resendCode()}
              style={[screenStyles.sendButton, { marginTop: 0 }]}
            >
              <Text style={[screenStyles.buttonText, { fontWeight: 'bold' }]}>
                Resend Verification
              </Text>
            </TouchableOpacity>
          </View>
        ): (
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
              <Text style={screenStyles.buttonText}>
                Send Verification
              </Text>
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
})

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(AuthActions.loginRequest()),
  gettokenRequest: (payload: any) => dispatch(AuthActions.gettokenRequest(payload)),
  checktokenRequest: (payload: any) => dispatch(AuthActions.checktokenRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PIN)
