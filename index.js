/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreAllLogs();

const ignoreWarns = [
    "Setting a timer for a long period of time",
    "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
    "ViewPropTypes will be removed",
    "AsyncStorage has been extracted from react-native",
    "EventEmitter.removeListener",
];
const warn = console.warn;
console.warn = (...arg) => {
    for (let i = 0; i < ignoreWarns.length; i++) {
        if (arg[0].startsWith(ignoreWarns[i])) return;
    }
    warn(...arg);
};
