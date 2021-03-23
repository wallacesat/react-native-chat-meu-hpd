import * as React from 'react';

import CameraOverlay from '../CameraOverlay';
import ImageUploader from '../ImageUploader';
import * as S from './styles';
import { ImagePickerProps } from './types';

const ImagePicker: React.FC<ImagePickerProps> = ({
  cameraIsOn,
  onPictureTaken,
  onCancel,
  onClickGallery,
  opened,
  onClose,
  onSelect,
}) => {
  const [galleryPreview, setGalleryPreview] = React.useState('');

  return (
    <S.Container>
      <CameraOverlay
        isVisible={cameraIsOn}
        onPictureTaken={onPictureTaken}
        onCancelPicture={() => {
          onCancel && onCancel();
          return null;
        }}
        galleryPreview={galleryPreview}
        onOpenGallery={onClickGallery}
        asBase64={false}
      />
      <ImageUploader
        opened={opened}
        lastPhoto={(photo) => {
          setGalleryPreview(photo);
        }}
        onClose={onClose}
        onSelect={onSelect}
      />
    </S.Container>
  );
};

export default ImagePicker;
