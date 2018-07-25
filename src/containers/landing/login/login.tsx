import * as React from 'react'
import { Text, TouchableOpacity, View, ScrollView, Image, TextBase } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import setting from '../../../config/setting'
import AppActions from '../../../actions/app'
import * as screenStyles from './login.styles'

export interface LoginScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  profileData: Array<any>
  loginRequest?: (e: any) => void
  getprofileRequest?: (e: any) => void
}

export interface LoginScreenState {
  isBusy: boolean
  phoneNumber: string
}

class Login extends React.Component<LoginScreenProps, LoginScreenState> {
  constructor(props) {
    super(props)
    const phoneNumber = props.navigation.getParam('phone', '')
    this.state = {
      isBusy: false,
      phoneNumber: phoneNumber,
    }
    this.getProfiles()
  }

  gotoHome = async index => {
    const { phoneNumber } = this.state
    const { profileData } = this.props
    const payload = {
      user_name: profileData[index].user_handle,
      password: phoneNumber,
    }
    this.props.loginRequest(payload)
  }

  getProfiles = () => {
    const { phoneNumber } = this.state
    const payload = {
      phone: phoneNumber,
    }
    this.props.getprofileRequest(payload)
  }

  render() {
    const { profileData } = this.props
    return (
      <View style={screenStyles.ROOT}>
        <Text style={screenStyles.logoText}>reel</Text>
        <View style={screenStyles.scrollContainer}>
          <Text style={screenStyles.introText}>{`Select the profile you wish to access:`}</Text>
          <ScrollView
            style={screenStyles.scrollViewStyle}
            contentContainerStyle={screenStyles.scrollContentContainer}
          >
            {profileData.map((account, index) => {
              const profileImage = `${setting.IMAGE_URL}${account.user_id}_photo.jpg`
              return (
                <TouchableOpacity
                  style={screenStyles.profileButton}
                  key={`profile${index}`}
                  onPress={() => this.gotoHome(index)}
                >
                  <View style={screenStyles.profileContainer}>
                    <Image source={{ uri: profileImage }} style={screenStyles.profileImage} />
                    <Text style={screenStyles.profileName}>{account.user_handle}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
            <View style={{ height: 23 }} />
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
  profileData: state.app.profileData,
})

const mapDispatchToProps = dispatch => ({
  loginRequest: (payload: any) => dispatch(AppActions.loginRequest(payload)),
  getprofileRequest: (payload: any) => dispatch(AppActions.getprofileRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
