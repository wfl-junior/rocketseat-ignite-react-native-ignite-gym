import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

export interface ExerciseParams {
  id: string;
}

interface ExerciseProps {}

export const Exercise: React.FC<ExerciseProps> = () => {
  const { goBack } = useNavigation();

  return (
    <VStack flex={1}>
      <VStack p={8} pt={12} bg="gray.600">
        <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};
