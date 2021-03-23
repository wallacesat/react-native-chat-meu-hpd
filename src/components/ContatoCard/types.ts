import { GestureResponderEvent } from 'react-native';

import { Contato } from '../../pages/Contatos/types';

export type User = {
  _id: string | number;
  name: string;
  avatar: string;
};

export type Message = {
  _id: string | number;
  text?: string;
  pdf?: {
    name?: string;
    uri: string;
  };
  createdAt: Date;
  user?: User;
  image?: string;
  audio?: string;
  audioDurationTime?: string;
  video?: string;
  videoThumb?: string;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
};

export type ContatoCardProps = {
  contato: Contato;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};
