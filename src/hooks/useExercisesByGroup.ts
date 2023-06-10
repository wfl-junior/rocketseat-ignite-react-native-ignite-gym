import { useFocusEffect } from "@react-navigation/native";
import { useToast } from "native-base";
import { useCallback, useState } from "react";
import { api } from "~/lib/api";
import { ExerciseDTO } from "~/types/ExerciseDTO";
import { AppError } from "~/utils/AppError";

export function useExercisesByGroup(selectedGroup: string | null) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!selectedGroup) return;
      setIsLoading(true);

      api
        .get<ExerciseDTO[]>(`/exercises/bygroup/${selectedGroup}`)
        .then(({ data }) => setExercises(data))
        .catch(error => {
          let errorMessage = "Não foi possível buscar os exercícios.";

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
    }, [selectedGroup]),
  );

  return {
    exercises,
    isLoading,
  };
}
