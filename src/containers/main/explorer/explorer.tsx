import * as React from 'react'
import { Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import AppActions from '../../../actions/app'
import RoundAvatar from '../../../components/shared/avatar/avatar'
import * as screenStyles from './explorer.styles'
const window = Dimensions.get('window')

export interface ExplorerScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  loginRequest?: () => void
}

export interface ExplorerScreenState {
  isBusy: boolean
}

class ExplorerScreen extends React.Component<ExplorerScreenProps, ExplorerScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  toLogin = () => {
    this.props.navigation.navigate('login')
  }

  render() {
    const strip = [1, 2, 3, 4, 5]
    const topHeight = (window.width - 57) / 3
    const imageURL = 'http://d1e9n6uw5itnwz.cloudfront.net/user/273_photo.jpg'
    return (
      <View style={screenStyles.ROOT}>
        <ScrollView style={screenStyles.scrollContainer}>
          <View>
            <Text>{`Top`}</Text>
            <View style={screenStyles.topContainer}>
              <ScrollView
                ref="trendingView"
                bounces={false}
                alwaysBounceHorizontal={false}
                bouncesZoom={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                width={window.width}
              >
                {strip.map(index => {
                  <TouchableOpacity onPress={() => console.log('clicked top avatar!')}>
                    <RoundAvatar
                      newContent={true}
                      hasContent={false}
                      size={topHeight}
                      uri={imageURL}
                    />
                  </TouchableOpacity>
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExplorerScreen)
