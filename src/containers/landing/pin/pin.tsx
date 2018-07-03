import * as React from 'react'
import { Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/FontAwesome'
import AppActions from '../../../actions/app'
import { BackButton } from '../../../components/shared'
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
  verificationCode: ['', '', '', '', '', ''],
  error: boolean,
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
      verificationCode: ['', '', '', '', '', ''],
      error: false,
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  toLogin = () => {
    this.props.navigation.navigate('signup')
  }

  render() {
    const { routed, phoneNumberSubmitted, countryCode, phoneNumber } = this.state

    let bgImage = null
    if (routed === 'login') {
      bgImage = (
        <Image
          resizeMode="cover"
          style={screenStyles.backgroundImage}
          source={require('../../../assets/img/girl.jpg')}
        />
      )
    }

    let introText = ""
    let bottomText = ""
    let bottomBtnText = ""
    if (phoneNumberSubmitted) {
      introText = "Please enter the six-digit verification code sent to the number provided"
      bottomText = "Already have an account?"
      bottomBtnText = "Log In!"
    } else {
      introText = "Let's get you verified!"
      bottomText = "Wrong number?"
      bottomBtnText = "Go back!"
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
        <Text>
          { introText }
        </Text>
        { phoneNumberSubmitted ? (
          <View>
            <View>
              {listArrary.map((key) => {
                return (
                  <TextInput
                    onFocus = {() => {
                    }}
                    maxLength={1}
                    key={`code-input-${key}`}
                    value={this.state.verificationCode[key]}
                    onChangeText={text =>
                      console.log('code text', text)
                    }
                    underlineColorAndroid="rgba(0,0,0,0)"
                    keyboardType="phone-pad"
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
              onPress={() => {}}
            >
              <Text>
                Resend Verification
              </Text>
            </TouchableOpacity>
          </View>
        ): (
          <View>
            <View>
              <TextInput
                width={60}
                value={countryCode}
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType="phone-pad"
                maxLength={4}
              />
              <TextInput
                placeholder="Phone Number"
                width="87%"
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType="phone-pad"
                value={phoneNumber}
                maxLength={14}
              />
            </View>
            <TouchableOpacity
              onPress={() => {}}
            >
              <Text>
                Send Verification
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text>{bottomText}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text>{bottomBtnText}</Text>
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
  loginRequest: () => dispatch(AppActions.loginRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PIN)
