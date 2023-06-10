import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Fragment, useState } from "react";
import { TouchableOpacity } from "react-native";
import BodyIcon from "~/assets/body.svg";
import RepetiotionsIcon from "~/assets/repetitions.svg";
import SeriesIcon from "~/assets/series.svg";
import { Button } from "~/components/Button";
import { Loading } from "~/components/Loading";
import { useExerciseById } from "~/hooks/useExerciseById";
import { useTabNavigation } from "~/hooks/useTabNavigation";
import { api } from "~/lib/api";
import type { ExerciseDTO } from "~/types/ExerciseDTO";
import { AppError } from "~/utils/AppError";
import { API_BASE_URL } from "~/utils/constants";

export interface ExerciseParams {
  exerciseId: ExerciseDTO["id"];
}

interface ExerciseProps {}

export const Exercise: React.FC<ExerciseProps> = () => {
  const toast = useToast();
  const { params } = useRoute();
  const { goBack, navigate } = useTabNavigation();
  const [isMarkingAsDone, setIsMarkingAsDone] = useState(false);

  const { exerciseId } = params as ExerciseParams;
  const { exercise, isLoading } = useExerciseById(exerciseId);

  async function handleMarkAsDone() {
    setIsMarkingAsDone(true);

    try {
      await api.post("/history", { exercise_id: exerciseId });

      toast.show({
        placement: "top",
        bgColor: "green.700",
        id: "mark-exercise-as-done-error",
        title: "Parabéns! Exercício registrado no seu histórico.",
      });

      navigate("history");
    } catch (error) {
      let errorMessage = "Não foi possível marcar o exercício como realizado.";

      if (error instanceof AppError) {
        errorMessage = error.message;
      }

      toast.show({
        placement: "top",
        bgColor: "red.600",
        title: errorMessage,
        id: "sign-in-error",
      });
    } finally {
      setIsMarkingAsDone(false);
    }
  }

  return (
    <VStack flex={1}>
      {isLoading || !exercise ? (
        <Loading />
      ) : (
        <Fragment>
          <VStack p={8} pt={12} bg="gray.600">
            <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
              <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
            </TouchableOpacity>

            <HStack mt={3} justifyContent="space-between" alignItems="center">
              <Heading
                fontSize="lg"
                flexShrink={1}
                color="gray.100"
                fontFamily="heading"
              >
                {exercise.name}
              </Heading>

              <HStack alignItems="center">
                <BodyIcon />

                <Text color="gray.200" textTransform="capitalize" ml={1}>
                  {exercise.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <ScrollView>
            <VStack p={8}>
              <Box rounded="lg" overflow="hidden" mb={3}>
                <Image
                  h={80}
                  w="full"
                  resizeMode="cover"
                  alt="Imagem do exercício"
                  source={{
                    uri: `${API_BASE_URL}/exercise/demo/${exercise.demo}`,
                  }}
                />
              </Box>

              <VStack bg="gray.600" rounded="md" p={4} pt={5}>
                <HStack
                  alignItems="center"
                  justifyContent="space-around"
                  mb={6}
                >
                  <HStack>
                    <SeriesIcon />

                    <Text color="gray.200" ml={2}>
                      {exercise.series} séries
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetiotionsIcon />

                    <Text color="gray.200" ml={2}>
                      {exercise.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button
                  onPress={handleMarkAsDone}
                  isLoading={isMarkingAsDone}
                  title="Marcar como realizado"
                />
              </VStack>
            </VStack>
          </ScrollView>
        </Fragment>
      )}
    </VStack>
  );
};
