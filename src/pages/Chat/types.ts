import { ImageURISource } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';

import { Contato } from '../Contatos/types';

export interface Message extends IMessage {
  pdf?: {
    name?: string;
    uri: string;
  };
  audioDurationTime?: string;
  videoThumb?: string;
}

export interface GalleryImageProps {
  node?: {
    group_name?: string;
    image?: {
      playableDuration?: number | string | null;
      uri?: string;
      filename?: string;
      width?: number;
      height?: number;
    };
    location?: {
      speed?: number;
      latitude?: number;
      longitude?: number;
      heading?: number;
      altitude?: number;
    };
    timestamp?: number;
    type?: string;
  };
}

export interface PictureTakenProps extends GalleryImageProps {
  width?: number;
  height?: number;
  uri?: string;
}
export interface DocumentTakenProps extends GalleryImageProps {
  fileCopyUri?: string;
  name?: string;
  size?: number;
  type?: string;
  uri?: string;
}

export type ChatProps = {
  contato: Contato;
  currentUser: {
    _id: string | number;
    name: string;
  };
  handleOnSendMessage: (message: Message, contato: Contato) => void;
  renderThumbImageAudioSlider?: (isLeft: boolean) => ImageURISource;
  onPressBackButton?: () => void;
};

export type PdfBubnleProps = {
  position: 'left' | 'right';
  document?: {
    name?: string;
    uri: string;
  };
  currentMessage?: Message;
};
