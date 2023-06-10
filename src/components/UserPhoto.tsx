import { IImageProps, Image } from "native-base";
import userPhotoDefault from "~/assets/userPhotoDefault.png";
import { useAuthContext } from "~/contexts/AuthContext";
import { API_BASE_URL } from "~/utils/constants";

interface UserPhotoProps extends Omit<IImageProps, "source" | "alt"> {
  size: number;
}

export const UserPhoto: React.FC<UserPhotoProps> = ({ size, ...props }) => {
  const { user } = useAuthContext();

  return (
    <Image
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      alt="Foto do usuário"
      {...props}
      w={size}
      h={size}
      source={
        user?.avatar
          ? { uri: `${API_BASE_URL}/avatar/${user.avatar}` }
          : userPhotoDefault
      }
    />
  );
};
