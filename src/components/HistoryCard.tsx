import { HStack, Heading, Text, VStack } from "native-base";
import type { ExerciseHistoryDTO } from "~/types/ExerciseHistoryDTO";

interface HistoryCardProps {
  exercise: ExerciseHistoryDTO;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ exercise }) => (
  <HStack
    px={5}
    py={4}
    mb={3}
    w="full"
    rounded="md"
    bg="gray.600"
    alignItems="center"
    justifyContent="space-between"
  >
    <VStack mr={5} flex={1}>
      <Heading
        color="white"
        fontSize="md"
        numberOfLines={1}
        fontFamily="heading"
        textTransform="capitalize"
      >
        {exercise.group}
      </Heading>

      <Text color="gray.100" fontSize="lg" numberOfLines={1}>
        {exercise.name}
      </Text>
    </VStack>

    <Text color="gray.300" fontSize="md">
      {exercise.hour}
    </Text>
  </HStack>
);
