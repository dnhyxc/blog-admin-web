import Compress from 'compressorjs';

interface IProps {
  file: File;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  mimeType?: string;
}

export const compressImage = ({
  file,
  quality = 0.2,
  maxWidth,
  maxHeight,
  mimeType = 'image/jpeg',
}: IProps): Promise<{ file: File; base64Url: string }> => {
  return new Promise((resolve, reject) => {
    const options = {
      quality,
      maxWidth,
      maxHeight,
      mimeType,
      success: (data: File) => {
        const reader = new FileReader();
        reader.onload = (e: Event) => {
          resolve({
            base64Url: (e.target as FileReader).result as string,
            file: data,
          });
        };
        reader.readAsDataURL(data);
      },
      error: function (err: Error) {
        reject(err.message);
      },
    };
    new Compress(file, options);
  });
};
