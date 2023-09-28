/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './source/navigator/navigation'

const App = () => {
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
