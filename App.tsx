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

const App = () => {
  return (
    <>
      <StatusBar
        animated
        translucent={false}
        backgroundColor={'black'}
        barStyle="light-content"
      />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  )
}

export default App;
