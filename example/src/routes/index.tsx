import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Chat from '../components/Chat';
import Contatos from '../components/Contatos';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <Stack.Navigator initialRouteName="Contatos">
      <Stack.Screen name="Contatos" component={Contatos} />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default App;
