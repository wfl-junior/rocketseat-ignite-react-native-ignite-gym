import { IImageProps, Image } from "native-base";

interface UserPhotoProps extends IImageProps {
  size: number;
}

export const UserPhoto: React.FC<UserPhotoProps> = ({ size, ...props }) => (
  <Image
    rounded="full"
    borderWidth={2}
    borderColor="gray.400"
    {...props}
    w={size}
    h={size}
  />
);
