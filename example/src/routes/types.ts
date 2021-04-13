import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Contatos: undefined;
  Chat: {
    contatoId: string;
  };
};

/* SCREEN NAVIGATION PROPS */
export type ContatosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Contatos'
>;
export type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;

/* SCREEN ROUTE PROPS */
export type ContatosScreenRouteProp = RouteProp<RootStackParamList, 'Contatos'>;
export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
