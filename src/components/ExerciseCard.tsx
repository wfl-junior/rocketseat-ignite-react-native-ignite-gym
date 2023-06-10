import { Entypo } from "@expo/vector-icons";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import type { ExerciseDTO } from "~/types/ExerciseDTO";

interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  ...props
}) => (
  <TouchableOpacity activeOpacity={0.6} {...props}>
    <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
      <Image
        w={16}
        h={16}
        mr={4}
        rounded="md"
        resizeMode="cover"
        alt="Imagem do exercício"
        source={{
          uri: "https://blog.totalpass.com.br/wp-content/uploads/2022/12/treino-de-costas-remada-unilateral.jpg",
        }}
      />

      <VStack flex={1}>
        <Heading color="white" fontSize="lg" fontFamily="heading">
          {exercise.name}
        </Heading>

        <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
          {exercise.series} séries x {exercise.repetitions} repetições
        </Text>
      </VStack>

      <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
    </HStack>
  </TouchableOpacity>
);
