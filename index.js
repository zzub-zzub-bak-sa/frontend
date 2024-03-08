/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RCTAccessibilityManager. This may lead to deadlocks',
]);

AppRegistry.registerComponent(appName, () => App);
