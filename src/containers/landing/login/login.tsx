import * as React from 'react'
import { Text, TouchableOpacity, View, ScrollView, Image, TextBase } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import * as qs from 'query-string'
import AppActions from '../../../actions/app'
import * as screenStyles from './login.styles'
import { create } from 'apisauce'

export interface LoginScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
}

export interface LoginScreenState {
  isBusy: boolean,
  phoneNumber: string,
  accounts: Array<any>,
}

class Login extends React.Component<LoginScreenProps, LoginScreenState> {
  api: any
  AUTH_KEY: string = 'ffaf4b736f342c3c3aace3d86fb72341'
  BASE_URL: string = 'https://www.net-networking.com/mobile_api'

  constructor(props) {
    super(props)
    const phoneNumber = props.navigation.getParam('phoneNumber', '')
    this.state = {
      isBusy: false,
      phoneNumber: phoneNumber,
      accounts: [],
    }
    console.log('*****', phoneNumber)
    this.api = create({
      baseURL: this.BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    })
    this.getProfiles()
  }

  toLogin = () => {
    this.props.navigation.navigate('pin')
  }

  getProfiles = async() => {
    const { phoneNumber } = this.state

    const reqBody = qs.stringify({
      phone: phoneNumber,
      AUTH_KEY: this.AUTH_KEY,
    })

    const response = await this.api.post('show_users_with_phone', reqBody)
    console.log('*********', response)
    this.setState({ accounts: response.data })
  }

  render() {
    const { accounts } = this.state
    return (
      <View style={screenStyles.ROOT}>
        <Text style={screenStyles.logoText}>
          reel
        </Text>
        <View style={screenStyles.scrollContainer}>
          <Text style={screenStyles.introText}>
            Select the profile you wish to access:
          </Text>
          <ScrollView style={screenStyles.scrollViewStyle} contentContainerStyle={screenStyles.scrollContentContainer}>
            {accounts.map((account, index) => {
              const profileImage = `https://d1e9n6uw5itnwz.cloudfront.net/user/${account.user_id}_photo.jpg`
              return (
                <TouchableOpacity
                  style={screenStyles.profileButton}
                  key={`profile${index}`}
                  onPress={() => {
                    console.log('*****', index, profileImage)
                  }}
                >
                  <View style={screenStyles.profileContainer}>
                    <Image source={{uri: profileImage}} style={screenStyles.profileImage}/>
                    <Text style={screenStyles.profileName}>{account.user_handle}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
