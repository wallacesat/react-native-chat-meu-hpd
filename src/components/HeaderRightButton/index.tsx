// import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react';

import * as S from './styles';
import { HeaderRightuttonProps } from './types';

const HeaderLeftButton: React.FC<HeaderRightuttonProps> = ({ onPress }) => {
  return (
    <S.Container activeOpacity={0.7} onPress={onPress}>
      <FontAwesomeIcon icon="plus" color="#333" size={12} />
    </S.Container>
  );
};

export default HeaderLeftButton;
