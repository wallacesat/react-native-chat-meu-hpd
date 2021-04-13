import * as React from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';

type AudioRecorderPlayerState = {
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const useAudioRecorderPlayer = () => {
  const [state, setState] = React.useState<AudioRecorderPlayerState>({
    recordSecs: 0,
    recordTime: '00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00',
    duration: '00:00',
  });

  const onStartRecord = async (audioName?: string) => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissão de acesso',
            message:
              'Esse app necessita de acessar a biblioteca para enviar arquivos no chat',
            buttonPositive: 'ok',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissão de acesso',
            message:
              'Esse app necessita de acessar a biblioteca para enviar arquivos no chat',
            buttonPositive: 'ok',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const name = audioName || String(new Date().getTime());

    const path = Platform.select({
      ios: name + '.m4a',
      android: 'sdcard/' + name + '.mp4', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e: any) => {
      setState({
        ...state,
        ...{
          recordSecs: e.current_position,
          recordTime: audioRecorderPlayer
            .mmssss(Math.floor(e.current_position))
            .slice(0, 5),
        },
      });
      return;
    });
    return result;
    // console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      ...state,
      ...{
        recordSecs: 0,
        recordTime: '00:00',
      },
    });
    // console.log(result);
    return result;
  };

  const onStartPlay = async (uri?: string) => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer(uri);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e: any) => {
      setState({
        ...state,
        ...{
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer
            .mmssss(Math.floor(e.current_position))
            .slice(0, 5),
          duration: audioRecorderPlayer
            .mmssss(Math.floor(e.duration))
            .slice(0, 5),
        },
      });
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setState({
      ...state,
      ...{
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00',
        duration: '00:00',
      },
    });
  };

  return {
    state,
    onStartRecord,
    onStopRecord,
    onStartPlay,
    onPausePlay,
    onStopPlay,
  };
};

export default useAudioRecorderPlayer;
