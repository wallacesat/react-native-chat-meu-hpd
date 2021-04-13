import React from 'react';
import { Chat } from 'react-native-chat-meu-hpd';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useChat } from '../../contexts/ChatContext';
import { ChatScreenRouteProp } from '../../routes/types';
import { find } from 'lodash';
import { Contato } from 'src/pages/Contatos/types';

const ChatWrapper: React.FC = () => {
  const { contatosData, currentUser, sendNewMessageContato } = useChat();

  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const { contatoId } = route.params;

  return (
    <Chat
      contato={
        find(contatosData, (contato) => contato.id === contatoId) as Contato
      }
      currentUser={currentUser}
      handleOnSendMessage={sendNewMessageContato}
      onPressBackButton={() => navigation.goBack()}
    />
  );
};

export default ChatWrapper;
