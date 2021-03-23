import * as React from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';
// import Contatos from './components/Contatos';
import Chat from './components/Chat';

import { contatos } from './mocks/contatos';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Contatos contatos={contatos} onContatoPress={() => {}} /> */}
      <Chat
        contato={contatos[1]}
        currentUser={{ _id: 'sdf', name: 'Wallace' }}
        handleOnSendMessage={() => {}}
      />
    </SafeAreaView>
  );
}

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
