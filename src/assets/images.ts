import { type ImageSourcePropType } from "react-native";

import default_avatar from "./images/default-avatar.png";

type ImagesType = Record<string, ImageSourcePropType>;
const images: ImagesType = {
  default_avatar,
};

export default images;
