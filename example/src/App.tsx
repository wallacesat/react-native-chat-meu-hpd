import 'react-native-gesture-handler';

if (__DEV__) {
  import('../ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';

import { ChatProvider } from './contexts/ChatContext';
import Routes from './routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <ChatProvider>
          <Routes />
        </ChatProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}
