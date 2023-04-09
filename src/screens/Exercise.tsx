import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import BodyIcon from "~/assets/body.svg";

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

        <HStack mt={3} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodyIcon />

            <Text color="gray.200" textTransform="capitalize" ml={1}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
