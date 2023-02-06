import {NativeBaseProvider} from 'native-base';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AppContainer = ({children}: Props) => {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
};

export default AppContainer;
