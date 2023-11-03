/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './source/navigator/navigation'
import { Provider } from 'react-redux'
import { store } from './source/redux'
import { RootSiblingParent } from 'react-native-root-siblings';
import PlatformType from './source/utils/PlatformType'
import colors from './source/utils/colors'

const App = () => {
  return (
    <>
      <StatusBar
        animated
        translucent={false}
        backgroundColor={colors.themeGreen}
        barStyle={PlatformType.android ? "light-content" : "dark-content"}
      />
      <Provider store={store}>
        <RootSiblingParent>
          <Navigation />
        </RootSiblingParent>
      </Provider>
    </>
  )
}

export default App;
