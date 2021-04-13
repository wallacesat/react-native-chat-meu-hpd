import { findIndex } from 'lodash';
import * as React from 'react';
import { Contato } from 'src/pages/Contatos/types';

import { ChatContextProps, ChatProviderProps, CurrentUserProps } from './types';
import { contatos } from '../mocks/contatos';

export const ChatContext = React.createContext<ChatContextProps>(
  {} as ChatContextProps
);

export const useChat = (): ChatContextProps => React.useContext(ChatContext);

export function ChatProvider(props: ChatProviderProps): JSX.Element {
  const { children } = props;

  const [contatosData, setContatosData] = React.useState<Contato[]>([]);
  const [currentUser, setCurrentUser] = React.useState<CurrentUserProps>({
    _id: 'id',
    name: 'Wallace Saturnino',
  });

  function sendNewMessageContato(contato: Contato) {
    const oldDataIndex = findIndex(contatosData, (d) => d.id === contato.id);
    let newData = new Array(...contatosData);
    newData[oldDataIndex] = contato;

    setContatosData(newData);
  }

  React.useEffect(() => {
    console.tron.log({ initialData: contatos });
    setContatosData(contatos as Contato[]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        contatosData,
        sendNewMessageContato,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
