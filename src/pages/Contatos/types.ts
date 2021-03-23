import { Message } from '../../components/ContatoCard/types';

export type Contato = {
  id: string;
  name: string;
  avatar: string;
  messages: Message[];
  isGroup?: boolean;
};

export type ContatosProps = {
  contatos: Contato[];
  onContatoPress: (contato: Contato) => void;
};
