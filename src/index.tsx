import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCamera,
  faChevronLeft,
  faChevronRight,
  faFilePdf,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faPause,
  faPlay,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCamera,
  faChevronLeft,
  faFilePdf,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faPause,
  faPlay,
  faTimes,
  faChevronRight,
  faPlus
);

import ContatosPage from './pages/Contatos';
export const Contatos = ContatosPage;

import ChatPage from './pages/Chat';
export const Chat = ChatPage;

export default {
  multiply(a: number, b: number) {
    return Promise.resolve(a * b);
  },
};
