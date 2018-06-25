import * as React from 'react'
import { View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Icons from 'react-native-vector-icons/FontAwesome'
import LaunchScreen from '../containers/landing/launch'
import LoginScreen from '../containers/landing/login'
import PINScreen from '../containers/landing/pin'
import SignUpScreen from '../containers/landing/signup'

const LandingNavigator = StackNavigator(
  {
    launch: {
      screen: LaunchScreen,
      navigationOptions: {},
    },
    pin: {
      screen: PINScreen,
      navigationOptions: {},
    },
    login: {
      screen: LoginScreen,
      navigationOptions: {},
    },
    signup: {
      screen: SignUpScreen,
      navigationOptions: {},
<<<<<<< HEAD
    },
=======
    }
>>>>>>> Refactor navigation flow
  },
  {
    initialRouteName: 'launch',
    headerMode: 'none',
<<<<<<< HEAD
    navigationOptions: {},
=======
    navigationOptions: {}
>>>>>>> Refactor navigation flow
  },
)

export default LandingNavigator
