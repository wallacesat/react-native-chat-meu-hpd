// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react';

import * as S from './styles';
import { HeaderLeftButtonProps } from './types';

const HeaderRightButton: React.FC<HeaderLeftButtonProps> = ({ onPress }) => {
  return (
    <S.Container activeOpacity={0.7} onPress={onPress}>
      <FontAwesomeIcon icon="chevron-left" color="#999" size={20} />
    </S.Container>
  );
};

export default HeaderRightButton;
