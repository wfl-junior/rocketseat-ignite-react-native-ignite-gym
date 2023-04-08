import { Center, Text } from "native-base";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => (
  <Center flex={1}>
    <Text color="white">Profile</Text>
  </Center>
);
