import { useFocusEffect } from "@react-navigation/native";
import { useToast } from "native-base";
import { useCallback, useState } from "react";
import { api } from "~/lib/api";
import { ExerciseDTO } from "~/types/ExerciseDTO";
import { AppError } from "~/utils/AppError";

export function useExerciseById(exerciseId: ExerciseDTO["id"]) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO | null>(null);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      api
        .get<ExerciseDTO>(`/exercises/${exerciseId}`)
        .then(({ data }) => setExercise(data))
        .catch(error => {
          let errorMessage = "Não foi possível buscar os dados do exercício.";

          if (error instanceof AppError) {
            errorMessage = error.message;
          }

          toast.show({
            duration: 5000,
            placement: "top",
            bgColor: "red.600",
            title: errorMessage,
            id: "sign-in-error",
          });
        })
        .finally(() => setIsLoading(false));
    }, [exerciseId]),
  );

  return {
    exercise,
    isLoading,
  };
}
