import { useFocusEffect } from "@react-navigation/native";
import { useToast } from "native-base";
import { useCallback, useState } from "react";
import { api } from "~/lib/api";
import type { ExerciseHistorySectionDTO } from "~/types/ExerciseHistoryDTO";
import { AppError } from "~/utils/AppError";

export function useExerciseHistory() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<ExerciseHistorySectionDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      api
        .get<ExerciseHistorySectionDTO[]>("/history")
        .then(({ data }) => setHistory(data))
        .catch(error => {
          let errorMessage = "Não foi possível buscar os dados do histórico.";

          if (error instanceof AppError) {
            errorMessage = error.message;
          }

          toast.show({
            placement: "top",
            bgColor: "red.600",
            title: errorMessage,
            id: "get-exercise-history-error",
          });
        })
        .finally(() => setIsLoading(false));
    }, []),
  );

  return {
    history,
    isLoading,
  };
}
