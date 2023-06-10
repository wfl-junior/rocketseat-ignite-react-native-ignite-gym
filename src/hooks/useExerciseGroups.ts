import { useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "~/lib/api";
import { AppError } from "~/utils/AppError";

export function useExerciseGroups() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    api
      .get<string[]>("/groups")
      .then(({ data }) => {
        if (!data.length) return;
        setGroups(data);
        setSelectedGroup(data[0]);
      })
      .catch(error => {
        let errorMessage = "Não foi possível buscar os dados dos grupos.";

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
  }, []);

  return {
    groups,
    isLoading,
    selectedGroup,
    setSelectedGroup,
  };
}
