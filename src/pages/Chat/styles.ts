import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fff;
`;

export const Header = styled.View`
  width: 100%;
  height: 50px;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const HeaderContent = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  height: 100%;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  padding: 5px;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin: 0 10px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const EmptyChat = styled.View`
  flex: 1;
  align-items: center;
  height: 35px;
`;

export const EmptyChatContent = styled.View`
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  background-color: #eee;
`;

export const Text = styled.Text`
  color: #888;
  font-size: 12px;
`;

export const RightInputActionButtons = styled(Animated.View)`
  flex-direction: row;
  margin-right: 15px;
  margin-bottom: 12px;
  padding: 4px 0;
  padding-left: 5px;
`;

export const ActionButton = styled.TouchableOpacity`
  position: relative;
`;

export const LightboxContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
  padding-right: 20px;
  padding-top: 10px;
`;

export const PdfPreview = styled.TouchableOpacity`
  margin: 3px;
  width: 130px;
  align-items: center;
`;

export const PdfIcon = styled.View`
  width: 100%;
  padding: 10px 0;
  align-items: center;
  border-radius: 12px;
`;

export const FileName = styled.Text`
  margin-top: 10px;
  font-size: 14px;
`;

export const AudioPlayer = styled.View`
  width: 220px;
  padding: 3px;
`;

export const AudioPlayerContainer = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  border-radius: 11px;
  height: 50px;
`;

export const DurationTime = styled.Text`
  font-size: 10px;
  position: absolute;
  bottom: 2px;
  left: 30px;
`;

export const PlayStopIcon = styled.TouchableOpacity`
  margin: 0 5px;
`;

export const AudioSlider = styled.View`
  width: 175px;
`;

export const RecordingComposer = styled.View`
  flex: 1;
  flex-direction: row;
  height: 100%;
  align-items: center;
  background-color: #f43;
  padding: 0 10px;
`;

export const TimeContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

export const Time = styled.Text`
  font-size: 20px;
  color: #fff;
  width: 70px;
`;

export const Label = styled.Text`
  flex: 1;
  color: #fff;
`;

export const VideoContainer = styled.TouchableOpacity`
  width: 250px;
  height: 140px;
  margin: 3px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

export const VideoButtonPlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
