import * as React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import {
  SVGExplore,
  SVGExplorePlus,
  SVGHome,
  SVGHomePlus,
  SVGCameraPlus,
} from '../components/shared'
import { equals } from 'ramda'
import { colors } from '../themes'
import * as screenStyles from './app-controls.styles'

const HeaderLeft = () => (
  <View style={screenStyles.leftContainer}>
    <Image source={require('../assets/logo_title.png')} style={screenStyles.leftImage} />
  </View>
)

const HeaderRight = ({ navigation }) => (
  <View style={screenStyles.leftContainer}>
    <Image source={require('../assets/logo_title.png')} style={screenStyles.leftImage} />
  </View>
)

interface DSTabBarProps extends NavigationScreenProps {}
interface DSTabBarState {
  route: String
  visible: boolean
}

class ReelTabBar extends React.Component<DSTabBarProps, DSTabBarState> {
  constructor(props) {
    super(props)
    this.state = {
      route: 'Manage',
      visible: false,
    }
  }

  handlePressTabs = route => {
    this.setState({ route })
    this.props.navigation.navigate(route)
  }

  render() {
    const { route, visible } = this.state
    return (
      <View style={screenStyles.tabContainer}>
        <TouchableOpacity
          style={screenStyles.tabItem}
          onPress={() => this.handlePressTabs('Explorer')}
        >
          <View>
            {equals(route, 'Explorer')
              ? SVGExplorePlus(25, colors.grey)
              : SVGExplore(25, colors.darkgrey)}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={screenStyles.tabCamera}
          onPress={() => this.handlePressTabs('Camera')}
        >
          <View style={screenStyles.tabCameraView}>{SVGCameraPlus(50, colors.grey)}</View>
        </TouchableOpacity>
        <TouchableOpacity style={screenStyles.tabItem} onPress={() => this.handlePressTabs('Home')}>
          <View>
            {equals(route, 'Home') ? SVGHomePlus(25, colors.grey) : SVGHome(25, colors.darkgrey)}
          </View>
        </TouchableOpacity>
        <View style={screenStyles.tabBack} />
      </View>
    )
  }
}

export { ReelTabBar, HeaderLeft, HeaderRight }
