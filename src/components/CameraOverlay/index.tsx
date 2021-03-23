/* eslint-disable react-native/no-inline-styles */
// import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import { CameraOverlayProps } from './types';

const styles = StyleSheet.create({
  photoIconWrapper: {
    width: 80,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bottomButtonsContainer: {
    width: '90%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    width: 80,
    height: 80,
  },
});

const CameraOverlay: React.FC<CameraOverlayProps> = ({
  isVisible = false,
  onPictureTaken,
  onCancelPicture = () => null,
  onOpenGallery,
  pictureSize = {
    width: 640,
    height: 480,
  },
  renderMask,
  galleryPreview,
  asBase64 = true,
  type = RNCamera.Constants.Type.back,
}) => {
  const cameraRef = React.useRef<RNCamera>(null);

  const [takingPicture, setTakingPicture] = React.useState(false);

  const onPicture = async () => {
    try {
      if (cameraRef.current) {
        setTakingPicture(true);

        const options = {
          quality: 0.5,
          base64: asBase64,
          width: pictureSize.width,
          height: pictureSize.height,
          forceUpOrientation: true,
          fixOrientation: true,
        };
        const data = await cameraRef.current.takePictureAsync(options);

        if (onPictureTaken) {
          onPictureTaken(data);
        }
      }
    } catch (err) {
      console.log('erro ao tirar foto', err.message);
      Alert.alert('Erro ao capturar imagem da câmera');
    } finally {
      setTakingPicture(false);
    }
  };

  const PictureButton = ({ onPress }: { onPress: () => Promise<void> }) => (
    <TouchableOpacity
      onPress={!takingPicture ? onPress : () => null}
      style={styles.photoIconWrapper}
      disabled={takingPicture}
    >
      {!takingPicture && (
        <FontAwesomeIcon icon="camera" size={32} color="rgba(255,255,255,1)" />
      )}
      {takingPicture && (
        <ActivityIndicator size="small" color="rgb(255,255,255)" />
      )}
    </TouchableOpacity>
  );

  const CancelButton = ({ onPress = () => null }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.cancelButton}
        hitSlop={{
          top: 30,
          right: 30,
          bottom: 30,
          left: 30,
        }}
      >
        <Text
          style={[
            {
              color: 'rgba(255,255,255,1)',
              fontSize: 16,
            },
          ]}
        >
          Cancelar
        </Text>
      </TouchableOpacity>
    );
  };

  const GalleryButton = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
      <Image
        source={{ uri: galleryPreview }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
      />
    </TouchableOpacity>
  );

  return (
    <>
      {isVisible && (
        <RNCamera
          ref={cameraRef}
          style={[
            { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
            {
              zIndex: 1,
            },
          ]}
          type={type}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permissão para acessar a câmera',
            message:
              'O app requer permissão para acessar a câmera do dispositivo',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar',
          }}
          captureAudio={false}
        >
          <View
            style={[
              {
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, .2)',
                justifyContent: 'flex-end',
                alignItems: 'center',
                zIndex: 2,
                paddingBottom: 25,
              },
            ]}
          >
            <View style={styles.bottomButtonsContainer}>
              <CancelButton onPress={onCancelPicture} />
              <PictureButton onPress={onPicture} />
              {(galleryPreview && <GalleryButton onPress={onOpenGallery} />) ||
                null}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            {renderMask && <>{renderMask()}</>}
          </View>
        </RNCamera>
      )}
    </>
  );
};

export default CameraOverlay;
