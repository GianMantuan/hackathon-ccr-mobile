import React from 'react';
import {StatusBar} from 'react-native';
import {Root} from 'native-base';

import Routes from './routes';

export default function App() {
  return (
    <Root>
      <StatusBar barStyle="default" />
      <Routes />
    </Root>
  );
}
