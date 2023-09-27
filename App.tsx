/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './source/navigator/navigation'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <>
      <StatusBar
        animated
        translucent={false}
        backgroundColor={'black'}
        barStyle="light-content"
      />
      <Navigation />
    </>
  )
}

export default App;
