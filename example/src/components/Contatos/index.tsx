import React from 'react';
import { Contatos } from 'react-native-chat-meu-hpd';

import { ContatosProps } from 'src/pages/Contatos/types';

const ContatosWrapper: React.FC<ContatosProps> = ({
  contatos,
  onContatoPress,
}) => {
  return <Contatos contatos={contatos} onContatoPress={onContatoPress} />;
};

export default ContatosWrapper;
