import React, {Component} from 'react';

import {Provider} from 'react-redux';

import configureStore from './src/redux/store/configureStore';
import HomeScreen from './src/HomeScreen';

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
  }
}
