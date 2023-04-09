import { Center, Text } from "native-base";

export interface ExerciseParams {
  id: string;
}

interface ExerciseProps {}

export const Exercise: React.FC<ExerciseProps> = () => (
  <Center flex={1}>
    <Text color="white">Exercise</Text>
  </Center>
);
