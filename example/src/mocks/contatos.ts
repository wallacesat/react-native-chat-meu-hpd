import { Contato } from '../../../src/pages/Contatos/types';

export const contatos: Contato[] = [
  {
    id: '1',
    name: 'Wallace Saturnino',
    avatar: 'https://placeimg.com/140/140/any',
    messages: [
      {
        _id: 1,
        text: 'Boa tarde pessoal',
        createdAt: new Date('February 23, 2021 11:26:02'),
      },
      {
        _id: 2,
        text: 'Como estão as coisas por aí?',
        createdAt: new Date('February 25, 2021 11:27:35'),
      },
      {
        _id: 3,
        text: 'Tudo certo por aqui, e por aí?',
        createdAt: new Date('February 25, 2021 11:31:01'),
        user: {
          _id: '5',
          name: 'Wallace Saturnino',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    id: '2',
    name: 'Frederico Gadelha',
    avatar: 'https://placeimg.com/140/140/any',
    messages: [
      {
        _id: 1,
        image: 'http://www.portodiassaude.com.br/img/logo/logo-meta.png',
        text:
          'Olha Essa imagem aqui, achei ela muito interessante, eu encontrei na net por aí...',
        createdAt: new Date('February 25, 2021 14:21:11'),
      },
      {
        _id: 2,
        video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        text: 'Depois dá uma olhada nesse vídeo...',
        createdAt: new Date('February 25, 2021 14:29:11'),
      },
      {
        _id: 3,
        pdf: {
          uri:
            'https://www.ufjf.br/baccan/files/2011/07/Apostila-PREPARO-DE-AMOSTRAS-Anal%c3%adtica-Avan%c3%a7ada.pdf',
        },
        createdAt: new Date('February 25, 2021 14:29:11'),
      },
    ],
  },
  {
    id: '3',
    name: 'Diogo Porto Dias',
    avatar: 'https://placeimg.com/140/140/any',
    messages: [
      {
        _id: 1,
        text: 'Boa tarde Wallace',
        createdAt: new Date('February 25, 2021 14:21:11'),
      },
      {
        _id: 2,
        text: 'Estou resolvendo aquele assunto já',
        createdAt: new Date('February 25, 2021 14:21:36'),
      },
    ],
  },
  {
    id: '4',
    name: 'Recepção Porto Dias',
    avatar: 'https://placeimg.com/140/140/any',
    isGroup: true,
    messages: [
      {
        _id: 1,
        text: 'Boa tarde pessoal',
        createdAt: new Date('February 23, 2021 11:26:02'),
        user: {
          _id: '2',
          name: 'Frederico Gadelha',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Esse é o grupo da recepção do Porto Dias',
        createdAt: new Date('February 25, 2021 11:27:35'),
        user: {
          _id: '2',
          name: 'Frederico Gadelha',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Show de bola, to dentro!',
        createdAt: new Date('February 25, 2021 11:31:01'),
        user: {
          _id: '5',
          name: 'Wallace Saturnino',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        text: 'Boa tarde pessoal!',
        createdAt: new Date('February 25, 2021 11:31:01'),
        user: {
          _id: '3',
          name: 'Diogo Porto Dias',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
];
