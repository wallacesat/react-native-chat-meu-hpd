/* eslint-disable react-hooks/exhaustive-deps */
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import * as React from 'react';
import { Dimensions, Platform, TouchableOpacity } from 'react-native';
import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { ImageUploaderProps, PhotosPageInfo } from './types';

const windowDimensions = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
  },
  photo: {
    width: windowDimensions.width / 3,
    height: windowDimensions.width / 3,
  },
});

const ImageUploader: React.FC<ImageUploaderProps> = ({
  opened,
  lastPhoto,
  onClose,
  onSelect,
}) => {
  const refRBSheet = React.useRef<RBSheet>(null);
  const [photos, setPhotos] = React.useState<PhotoIdentifier[]>();
  const [photosPageInfo, setPhotosPageInfo] = React.useState<PhotosPageInfo>();

  // TODO: extrair a lógica que recupera as imagens para um hook
  React.useEffect(() => {
    async function exec() {
      await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
        .then((r) => {
          setPhotos(r.edges);
          lastPhoto(r.edges[0] && r.edges[0].node.image.uri);
          setPhotosPageInfo({
            endCursor: r.page_info.end_cursor,
            hasNextPage: r.page_info.has_next_page,
          });
        })
        .catch((err) => {
          console.log('Erro ao acessar a galeria', err);
        });
    }
    async function getPermission() {
      if (isAndroid) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permissão de acesso',
            message: 'Meu HPD gostaria de acessar sua galeria.',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar',
          }
        );
        if (result !== 'granted') {
          Alert.alert('O acesso à galeria foi negado.');
          return;
        }
        exec();
      } else {
        exec();
      }
    }
    getPermission();
  }, []);

  React.useEffect(() => {
    if (opened) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [opened]);

  async function paginatePhotos() {
    if (photosPageInfo?.hasNextPage) {
      await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
        after: photosPageInfo.endCursor,
      }).then((r) => {
        console.log(r);
        setPhotos([...(photos || []), ...r.edges]);
        setPhotosPageInfo({
          endCursor: r.page_info.end_cursor,
          hasNextPage: r.page_info.has_next_page,
        });
      });
    }
  }

  function onSelectPhoto(item: CameraRoll.PhotoIdentifier) {
    onSelect(item);
    refRBSheet.current?.close();
  }

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        height={windowDimensions.height / 1.4}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        onClose={onClose}
        closeDuration={300}
        closeOnPressMask
        closeOnPressBack
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingTop: 10,
            paddingHorizontal: 1,
            elevation: 6,
          },
          draggableIcon: {
            backgroundColor: '#ddd',
          },
        }}
      >
        <FlatList
          numColumns={3}
          // style={styles.photosList}
          data={photos}
          // closeDuration={300}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => onSelectPhoto(item)}
            >
              <Image
                style={styles.photo}
                source={{ uri: item.node.image.uri }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.node.image.filename || 'not-key'}
          onEndReached={paginatePhotos}
          onEndReachedThreshold={0.5}
        />
      </RBSheet>
    </View>
  );
};

export default ImageUploader;
