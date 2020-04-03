import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import EditScreen from './EditScreen';
import CreateScreen from './EditScreen';
import ProfileScreenMenu from '../components/ProfileScreenMenu';

const Navigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({header: null}),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: <ProfileScreenMenu />,
    }),
  },
  EditProfile: {
    screen: EditScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: <ProfileScreenMenu />,
    }),
  },
  CreateProfile: {
    screen: CreateScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: <ProfileScreenMenu />,
    }),
  },
});

const AppNavigator = createAppContainer(Navigator);

export default AppNavigator;
