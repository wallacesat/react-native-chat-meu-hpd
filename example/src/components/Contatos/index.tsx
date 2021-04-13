import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useChat } from '../../contexts/ChatContext';
import { Contatos } from 'react-native-chat-meu-hpd';
import { Contato } from 'src/pages/Contatos/types';

const ContatosWrapper: React.FC = () => {
  const { contatosData } = useChat();
  const navigation = useNavigation();

  function onContatoPress(contato: Contato) {
    navigation.navigate('Chat', {
      contatoId: contato.id,
    });
  }

  return <Contatos contatos={contatosData} onContatoPress={onContatoPress} />;
};

export default ContatosWrapper;
