import * as React from 'react';

import ContatoCard from '../../components/ContatoCard';
import * as S from './styles';
import { ContatosProps } from './types';

const Contatos: React.FC<ContatosProps> = ({ contatos, onContatoPress }) => {
  return (
    <S.Container>
      <S.ContatosContainer>
        {contatos.map((contato) => (
          <ContatoCard
            key={contato.id}
            contato={contato}
            onPress={() => onContatoPress(contato)}
          />
        ))}
      </S.ContatosContainer>
    </S.Container>
  );
};

export default Contatos;
