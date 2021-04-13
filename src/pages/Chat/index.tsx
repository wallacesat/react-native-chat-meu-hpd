/* eslint-disable react-hooks/exhaustive-deps */
import 'dayjs/locale/pt-br';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Slider from '@react-native-community/slider';
import guid from 'guid';
import { orderBy } from 'lodash';
import * as React from 'react';
import {
  Alert,
  Animated,
  Image,
  Linking,
  Modal,
  SafeAreaView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import {
  Actions,
  ActionsProps,
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  MessageText,
  MessageTextProps,
  RenderMessageAudioProps,
  RenderMessageVideoProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';

import ImagePicker from '../../components/ImagePicker';
import VideoPlayer from '../../components/VideoPlayer';
import useAuioRecorderPlayer from '../../hooks/useAudioRecorderPlayer';
import * as S from './styles';
import { ChatProps, Message, PdfBubnleProps, PictureTakenProps } from './types';

const Chat: React.FC<ChatProps> = ({
  contato,
  currentUser,
  handleOnSendMessage,
  renderThumbImageAudioSlider,
  onPressBackButton,
}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputIsEmpty, setInputIsEmpty] = React.useState(true);
  const [showImagePicker, setShowImagePicker] = React.useState(false);
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [videoURI, setVideoURI] = React.useState('');

  const [audioIsPlaying, setAudioIsPlaying] = React.useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = React.useState(false);
  const [
    currentAudioMessage,
    setCurrentAudioMessage,
  ] = React.useState<Message>();

  const [takePhoto, setTakePhoto] = React.useState(false);

  const {
    onStartPlay,
    onPausePlay,
    onStartRecord,
    onStopRecord,
    onStopPlay,
    state,
  } = useAuioRecorderPlayer();

  const translateX = new Animated.Value(0);

  React.useEffect(() => {
    const msgs = contato.messages.map(
      (contatoMessages) =>
        ({
          _id: contatoMessages._id,
          text: contatoMessages.text,
          pdf: contatoMessages.pdf,
          image: contatoMessages.image,
          audio: contatoMessages.audio,
          audioDurationTime: contatoMessages.audioDurationTime,
          video: contatoMessages.video,
          videoThumb: contatoMessages.videoThumb,
          sent: contatoMessages.sent,
          received: contatoMessages.received,
          pending: contatoMessages.pending,
          createdAt: contatoMessages.createdAt,
          user: contatoMessages.user || {
            _id: contato.id,
            name: contato.name,
            avatar: contato.avatar,
          },
        } as IMessage)
    );

    setMessages(orderBy(msgs, ['createdAt'], ['desc']));
  }, [contato]);

  React.useEffect(() => {
    const translate = inputIsEmpty ? 0 : 70;

    Animated.spring(translateX, {
      bounciness: 8,
      toValue: translate,
      useNativeDriver: true,
    }).start();
  }, [inputIsEmpty]);

  function prepareDataToSend(msgs: any) {
    const newContato = {
      ...contato,
      ...{
        messages: [
          ...contato.messages,
          ...msgs.map((msg: any) => ({
            ...msg,
            ...{ pending: true, sent: undefined, received: undefined },
          })),
        ],
      },
    };

    return newContato;
  }

  const onSend = React.useCallback(
    (msgs = []) => {
      handleOnSendMessage(prepareDataToSend(msgs));
    },
    [contato]
  );

  function handleInputChange(text: string) {
    if (!text) {
      if (!inputIsEmpty) {
        setInputIsEmpty(true);
      }
    } else {
      if (inputIsEmpty) {
        setInputIsEmpty(false);
      }
    }
  }

  const EmptyChat = () => (
    <S.EmptyChat>
      <S.EmptyChatContent>
        <S.Text style={{ transform: [{ scaleX: -1 }, { rotate: '180deg' }] }}>
          Nenhuma mensagem ainda
        </S.Text>
      </S.EmptyChatContent>
    </S.EmptyChat>
  );

  const handleStartAudioRecorder = () => {
    onStartRecord();
    setIsRecordingAudio(true);
  };

  const handleStopAudioRecorder = async () => {
    setIsRecordingAudio(false);
    const result = await onStopRecord();

    const newMessage: Message = {
      _id: guid.raw(),
      audio: result,
      audioDurationTime: state.recordTime,
      user: currentUser,
      createdAt: new Date(),
      pending: true,
      sent: undefined,
      received: undefined,
      text: '',
    };
    handleOnSendMessage(prepareDataToSend([newMessage]));
  };

  const renderSendeButton = (
    props: Readonly<SendProps<Message>> &
      Readonly<{
        children?: React.ReactNode;
      }>
  ) => (
    <S.RightInputActionButtons
      {...(isRecordingAudio
        ? {
            style: {
              height: '100%',
              backgroundColor: '#f66',
              marginBottom: 0,
              marginRight: 0,
              marginVertical: 15,
              width: 80,
            },
          }
        : {})}
    >
      <>
        {!isRecordingAudio && (
          <>
            <Send {...props} containerStyle={{ height: 20, marginRight: 15 }}>
              <FontAwesomeIcon icon="paper-plane" color="#037bfc" size={20} />
            </Send>
            <S.ActionButton
              style={{ marginRight: 15 }}
              onPress={() => {
                setTakePhoto(true);
              }}
            >
              <FontAwesomeIcon icon="camera" color="#999" size={20} />
            </S.ActionButton>
          </>
        )}
        <S.ActionButton
          onLongPress={handleStartAudioRecorder}
          onPressOut={handleStopAudioRecorder}
        >
          <FontAwesomeIcon
            icon={'microphone'}
            color={isRecordingAudio ? '#f43' : '#999'}
            size={20}
          />
        </S.ActionButton>
      </>
    </S.RightInputActionButtons>
  );

  const handleDocumentPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      const newMessage: Message = {
        _id: guid.raw(),
        pdf: {
          name: res.name,
          uri: res.uri,
        },
        user: currentUser,
        createdAt: new Date(),
        pending: true,
        sent: undefined,
        received: undefined,
        text: '',
      };
      handleOnSendMessage(prepareDataToSend([newMessage]));
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Operação cancelada pelo usuário!');
      } else {
        //For Unknown Error
        Alert.alert('Erro ao selecionar arquivo:' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const renderAttachButton = (
    props: Readonly<ActionsProps> &
      Readonly<{
        children?: React.ReactNode;
      }>
  ) =>
    !isRecordingAudio && (
      <Actions
        {...props}
        icon={() => (
          <FontAwesomeIcon icon={'paperclip'} color="#999" size={20} />
        )}
        onPressActionButton={handleDocumentPicker}
      />
    );

  const handleHeaderLightBox = (close: () => void) => (
    <SafeAreaView>
      <S.LightboxContainer onPress={close}>
        <FontAwesomeIcon icon="times" size={20} color="rgba(255,255,255,0.2)" />
      </S.LightboxContainer>
    </SafeAreaView>
  );

  function isPdf(text: string) {
    return text.split('.').pop()?.toLowerCase() === 'pdf';
  }

  const renderMessageText = (
    messageText: Readonly<MessageTextProps<Message>> &
      Readonly<{
        children?: React.ReactNode;
      }>
  ) => (
    <MessageText
      {...messageText}
      textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
      customTextStyle={{
        fontSize: 14,
        color: messageText.position === 'right' ? '#fff' : '#333',
      }}
    />
  );

  const PdfBubble: React.FC<PdfBubnleProps> = ({
    document,
    position,
    currentMessage,
  }) => {
    if (!document) {
      return null;
    }

    const isLeft = position === 'left';

    const handleClick = () => {
      if (
        document.uri.startsWith('https://') ||
        document.uri.startsWith('http://')
      ) {
        Linking.canOpenURL(document.uri).then((supported) => {
          if (supported) {
            Linking.openURL(document.uri);
          } else {
            console.log('URI não suportada pelo browser: ' + document);
          }
        });
      } else {
        FileViewer.open(document.uri)
          .then(() => {
            // Do whatever you want
            console.log('Success');
          })
          .catch((_err) => {
            // Do whatever you want
            console.log('URI não suportada: ' + _err);
          });
      }
    };

    return !isPdf(document.uri) ? null : (
      <S.PdfPreview activeOpacity={0.7} onPress={handleClick}>
        <S.PdfIcon
          style={{
            backgroundColor: !isLeft
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(0,0,0,0.12)',
          }}
        >
          <FontAwesomeIcon icon={'file-pdf'} color="#f43" size={50} />
        </S.PdfIcon>
        <S.FileName
          numberOfLines={2}
          style={{ color: !isLeft ? '#fff' : '#037bfc' }}
        >
          {currentMessage?.pdf?.name || currentMessage?.pdf?.uri}
        </S.FileName>
      </S.PdfPreview>
    );
  };

  const handlePlayMessage = (message?: Message) => {
    if (!message) {
      return;
    }

    setCurrentAudioMessage(message);
    onStartPlay(message.audio);
    setAudioIsPlaying(true);
  };

  const handlePauseMessage = () => {
    onPausePlay();
    setAudioIsPlaying(false);
  };

  React.useEffect(() => {
    if (
      state.currentDurationSec !== 0 &&
      state.currentDurationSec === state.currentPositionSec
    ) {
      onStopPlay();
      setCurrentAudioMessage(undefined);
      setAudioIsPlaying(false);
    }
  }, [state.duration, state.playTime, onStopPlay]);

  const renderMessageAudio = (props: RenderMessageAudioProps<Message>) => {
    const { currentMessage, position } = props;
    const isLeft = position === 'left';

    if (!currentMessage?.audio) {
      return;
    }

    return (
      <S.AudioPlayer>
        <S.AudioPlayerContainer
          style={{
            backgroundColor: isLeft
              ? 'rgba(0, 0, 0, 0.07)'
              : 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {currentMessage?._id !== currentAudioMessage?._id ||
          !audioIsPlaying ? (
            <S.PlayStopIcon
              activeOpacity={0.6}
              onPress={() => handlePlayMessage(currentMessage)}
            >
              <FontAwesomeIcon
                icon="play"
                color={isLeft ? 'rgba(0,0,0,0.6)' : '#fff'}
                size={20}
              />
            </S.PlayStopIcon>
          ) : (
            <S.PlayStopIcon
              activeOpacity={0.6}
              onPress={() => handlePauseMessage()}
            >
              <FontAwesomeIcon
                icon="pause"
                color={isLeft ? 'rgba(0,0,0,0.6)' : '#fff'}
                size={20}
              />
            </S.PlayStopIcon>
          )}

          <S.AudioSlider>
            <Slider
              nativeID={String(currentMessage?._id)}
              style={{ width: 180, height: 30 }}
              minimumValue={0}
              maximumValue={Number(state.currentDurationSec)}
              minimumTrackTintColor={
                isLeft ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)'
              }
              maximumTrackTintColor="rgba(0,0,0,0.3)"
              thumbImage={
                renderThumbImageAudioSlider
                  ? renderThumbImageAudioSlider(isLeft)
                  : undefined
              }
              value={
                currentMessage?._id === currentAudioMessage?._id
                  ? Number(state.currentPositionSec)
                  : 0
              }
            />
          </S.AudioSlider>
          <S.DurationTime style={{ color: isLeft ? '#037bfc' : '#fff' }}>
            {audioIsPlaying
              ? state.playTime
              : currentMessage?.audioDurationTime}
          </S.DurationTime>
        </S.AudioPlayerContainer>
      </S.AudioPlayer>
    );
  };

  const renderMessageVideo = (props: RenderMessageVideoProps<Message>) => {
    const { currentMessage } = props;
    const video = currentMessage?.video;
    const videoThumb = currentMessage?.videoThumb;

    if (!video) {
      return null;
    }

    return (
      <S.VideoContainer
        activeOpacity={0.7}
        onPress={() => {
          setVideoURI(video);
          setShowVideoModal(true);
        }}
      >
        <Image
          source={{
            uri: videoThumb,
          }}
          style={{ flex: 1 }}
        />
        <S.VideoButtonPlay>
          <FontAwesomeIcon
            icon="play"
            size={40}
            color="rgba(255,255,255,0.4)"
          />
        </S.VideoButtonPlay>
      </S.VideoContainer>
    );
  };

  const renderCustomView = (
    props: Readonly<BubbleProps<Message>> &
      Readonly<{
        children?: React.ReactNode;
      }>
  ) => {
    const { currentMessage, position } = props;
    const document = currentMessage?.pdf;

    if (document) {
      return (
        <PdfBubble
          document={document}
          position={position}
          currentMessage={currentMessage}
        />
      );
    }

    return null;
  };

  const handlePictureTaken = (data: PictureTakenProps) => {
    const node = data?.node;
    const uri = data?.uri;

    if (!data) {
      return;
    }

    if (node) {
      const { image } = node;

      const imageURI = image?.uri;

      const newMessage: Message = {
        _id: guid.raw(),
        image: imageURI,
        user: currentUser,
        createdAt: new Date(),
        pending: true,
        sent: undefined,
        received: undefined,
        text: '',
      };
      handleOnSendMessage(prepareDataToSend([newMessage]));

      setTakePhoto(false);
    } else {
      const newMessage: Message = {
        _id: guid.raw(),
        image: uri,
        user: currentUser,
        createdAt: new Date(),
        pending: true,
        sent: undefined,
        received: undefined,
        text: '',
      };
      handleOnSendMessage(prepareDataToSend([newMessage]));

      setTakePhoto(false);
    }
  };

  const renderComposer = (
    props: Readonly<ComposerProps> &
      Readonly<{
        children?: React.ReactNode;
      }>
  ) => {
    return (
      (isRecordingAudio && (
        <S.RecordingComposer>
          <FontAwesomeIcon icon={'microphone'} color="#fff" size={22} />
          <S.TimeContainer>
            <S.Time>{state.recordTime}</S.Time>
            <S.Label>Gravando...</S.Label>
          </S.TimeContainer>
        </S.RecordingComposer>
      )) || <Composer {...props} />
    );
  };

  const VideoModal = () => {
    return (
      <Modal>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          {handleHeaderLightBox(() => setShowVideoModal(false))}
          <VideoPlayer videoURI={videoURI} />
        </SafeAreaView>
      </Modal>
    );
  };

  const renderBubble = (
    props: Readonly<BubbleProps<Message>> &
      Readonly<{
        children?: React.ReactNode;
      }>
  ) => {
    return (
      <Bubble
        {...props}
        renderMessageVideo={renderMessageVideo}
        renderMessageAudio={renderMessageAudio}
      />
    );
  };

  return (
    <S.Container>
      {!takePhoto ? (
        <>
          <S.Header>
            <S.BackButton activeOpacity={0.7} onPress={onPressBackButton}>
              <FontAwesomeIcon icon={'chevron-left'} color="#999" size={20} />
            </S.BackButton>
            <S.HeaderContent activeOpacity={0.7}>
              <S.Avatar source={{ uri: contato.avatar }} />
              <S.Name>{contato.name}</S.Name>
            </S.HeaderContent>
          </S.Header>
          <GiftedChat
            disableComposer={isRecordingAudio}
            messages={messages}
            shouldUpdateMessage={({ currentMessage }) =>
              currentMessage?.video || currentMessage?.audio ? true : false
            }
            placeholder="Escreva uma mensagem..."
            locale={'pt-br'}
            onSend={(msgs) => onSend(msgs)}
            user={currentUser}
            renderUsernameOnMessage={contato.isGroup}
            alignTop
            showAvatarForEveryMessage={true}
            renderAvatar={() => null}
            renderChatEmpty={() => <EmptyChat />}
            renderSend={renderSendeButton}
            renderActions={renderAttachButton}
            alwaysShowSend
            onInputTextChanged={handleInputChange}
            renderComposer={renderComposer}
            renderBubble={renderBubble}
            renderMessageText={renderMessageText}
            renderCustomView={renderCustomView}
            lightboxProps={{
              renderHeader: handleHeaderLightBox,
              springConfig: {
                tension: 200,
                friction: 15,
                useNativeDriver: false,
              },
            }}
          />
          {showVideoModal && <VideoModal />}
        </>
      ) : (
        <ImagePicker
          onClickGallery={() => setShowImagePicker(true)}
          onClose={() => setShowImagePicker(false)}
          onPictureTaken={handlePictureTaken}
          onSelect={handlePictureTaken}
          opened={showImagePicker}
          cameraIsOn={true}
          onCancel={() => setTakePhoto(false)}
        />
      )}
    </S.Container>
  );
};

export default Chat;
