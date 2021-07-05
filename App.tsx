import 'regenerator-runtime';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { enableScreens } from 'react-native-screens';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

import DataProvider from './providers/DataProvider';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import config from './aws-config';

Amplify.configure(config);

enableScreens();

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva[colorScheme]}>
          <DataProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </DataProvider>
        </ApplicationProvider>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: false,
});
