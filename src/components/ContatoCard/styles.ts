import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  flex-direction: row;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 1px;
`;

export const AvatarContainer = styled.View`
  width: 50px;
  height: 100%;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;

export const ContatoInfo = styled.View`
  margin-left: 10px;
  flex: 1;
  height: 100%;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

export const RightContent = styled.View`
  width: 50px;
  height: 100%;
  align-items: flex-end;
`;

export const LastMessage = styled.Text`
  margin-top: 10px;
  font-size: 11px;
  color: #777;
`;

export const ArrowIcon = styled.View`
  margin-top: 10px;
`;
