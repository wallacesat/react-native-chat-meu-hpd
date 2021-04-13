import { ReactNode } from 'react';

import { Contato } from 'src/pages/Contatos/types';

export type CurrentUserProps = {
  _id: string | number;
  name: string;
};

export interface ChatContextProps {
  contatosData: Contato[];
  sendNewMessageContato: (contato: Contato) => void;
  currentUser: CurrentUserProps;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserProps>>;
}

export type ChatProviderProps = {
  children: ReactNode;
};
