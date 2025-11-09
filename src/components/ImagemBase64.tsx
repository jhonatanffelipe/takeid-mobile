import { Image } from "react-native";

type ImagemBase64Props = {
  base64: string;
  height?: number;
  width?: number;
};

export function ImagemBase64({ base64, height, width }: ImagemBase64Props) {
  return (
    <Image
      source={{ uri: `data:image/png;base64,${base64}` }}
      style={{ width: width || 100, height: height || 100, borderRadius: 8 }}
      resizeMode="cover"
    />
  );
}
