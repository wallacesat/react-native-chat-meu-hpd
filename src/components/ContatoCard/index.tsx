// import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import dayjs from 'dayjs';
import { orderBy } from 'lodash';

import * as S from './styles';
import { ContatoCardProps } from './types';

const ContatoCard: React.FC<ContatoCardProps> = ({ contato, onPress }) => {
  const lastMessage = orderBy(
    contato.messages,
    (item) => item.createdAt,
    'desc'
  );

  return (
    <S.Container activeOpacity={0.7} onPress={onPress}>
      <S.AvatarContainer>
        <S.Avatar source={{ uri: contato.avatar }} />
      </S.AvatarContainer>
      <S.ContatoInfo>
        <S.Name>{contato.name}</S.Name>
        <S.LastMessage>{lastMessage[0]?.text || ''}</S.LastMessage>
      </S.ContatoInfo>
      <S.RightContent>
        <S.LastMessage>
          {lastMessage[0]?.createdAt
            ? dayjs(lastMessage[0]?.createdAt).format('hh:mm')
            : ''}
        </S.LastMessage>
        <S.ArrowIcon>
          <FontAwesomeIcon icon="chevron-right" color="#999" size={14} />
        </S.ArrowIcon>
      </S.RightContent>
    </S.Container>
  );
};

export default ContatoCard;
