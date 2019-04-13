import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './containers/Home';
import ARAssistant from './containers/ARAssistant';
import Icon from 'react-native-vector-icons/FontAwesome';

const ACTIVE_COLOR = "#ffffff";
const INACTIVE_COLOR = '#d8d8d8';


const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  ARAssistant: { screen: ARAssistant }
  //All the screens for Support tab will go here
  //Can ignore Login - I am working off of Hunter Native
});

const App = createAppContainer(MainNavigator);
// const App = createAppContainer(AppTabNavigator)

export default App;