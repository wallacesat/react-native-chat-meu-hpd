export type ImageUploaderProps = {
  opened: boolean;
  lastPhoto: (uri: string) => void;
  onClose: () => void;
  onSelect: (item: any) => void;
};

export type PhotosPageInfo = {
  endCursor?: string;
  hasNextPage?: boolean;
};
