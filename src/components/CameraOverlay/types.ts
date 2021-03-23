export type CameraOverlayProps = {
  isVisible?: boolean;
  onPictureTaken: (data: any) => void;
  onCancelPicture: () => null;
  onOpenGallery: () => void;
  pictureSize?: {
    width: number;
    height: number;
  };
  renderMask?: () => void;
  galleryPreview?: string;
  asBase64?: boolean;
  type?: any;
};
