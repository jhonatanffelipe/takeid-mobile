import { Image } from "react-native";

type ImagemBase64Props = {
  base64: string;
  height?: number;
  width?: number;
};

export function ImagemBase64({ base64, height, width }: ImagemBase64Props) {
  let mime = "jpeg";

  if (base64.startsWith("data:image/")) {
    return (
      <Image
        source={{ uri: base64 }}
        style={{ width: width || 100, height: height || 100, borderRadius: 4 }}
        resizeMode="cover"
      />
    );
  }

  if (base64.startsWith("iVBOR")) {
    mime = "png";
  }
  return (
    <Image
      source={{ uri: `data:image/${mime};base64,${base64}` }}
      style={{ width: width || 100, height: height || 100, borderRadius: 4 }}
      resizeMode="cover"
    />
  );
}
