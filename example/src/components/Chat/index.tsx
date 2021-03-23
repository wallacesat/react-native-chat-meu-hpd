import React from 'react';
import { Chat } from 'react-native-chat-meu-hpd';

import { ChatProps } from 'src/pages/Chat/types';

const ChatWrapper: React.FC<ChatProps> = ({
  contato,
  currentUser,
  handleOnSendMessage,
}) => {
  return (
    <Chat
      contato={contato}
      currentUser={currentUser}
      handleOnSendMessage={handleOnSendMessage}
    />
  );
};

export default ChatWrapper;
