export type ImagePickerProps = {
  cameraIsOn?: boolean;
  onPictureTaken: (data: any) => void;
  onCancel?: () => void;
  onClickGallery: () => void;
  opened: boolean;
  onClose: () => void;
  onSelect: (item: any) => void;
};
