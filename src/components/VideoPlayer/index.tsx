// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import * as React from 'react';
// import all the components we are going to use
import { StyleSheet, View } from 'react-native';
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
//Import React Native Video to play video
import Video, { OnLoadData, OnProgressData } from 'react-native-video';

import { VideoPlayerProps } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoURI }) => {
  const videoPlayer = React.useRef<Video>(null);

  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const [playerState, setPlayerState] = React.useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = React.useState<
    'stretch' | 'contain' | 'cover' | 'none' | undefined
  >('contain');

  const onSeek = (seek: number) => {
    //Handler for change in seekbar
    videoPlayer.current?.seek(seek);
  };

  const onPaused = (state: PLAYER_STATES) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(state);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(0);
  };

  const onProgress = (data: OnProgressData) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType === 'contain') {
      setScreenType('cover');
    } else {
      setScreenType('contain');
    }
  };

  const onSeeking = (time: number) => setCurrentTime(time);

  return (
    <View style={styles.container}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        fullscreen={isFullScreen}
        source={{
          uri: videoURI,
        }}
        style={styles.mediaPlayer}
        volume={10}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        isFullScreen={isFullScreen}
        containerStyle={{}}
        children={null}
      />
    </View>
  );
};

export default VideoPlayer;
