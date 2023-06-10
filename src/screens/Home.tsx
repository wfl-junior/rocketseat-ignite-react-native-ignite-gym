import { useFocusEffect } from "@react-navigation/native";
import { FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";
import { ExerciseCard } from "~/components/ExerciseCard";
import { Group } from "~/components/Group";
import { HomeHeader } from "~/components/HomeHeader";
import { useHomeStackNavigation } from "~/hooks/useHomeStackNavigation";
import { api } from "~/lib/api";
import { AppError } from "~/utils/AppError";

export interface Exercise {
  id: string;
  title: string;
  description: string;
}

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const toast = useToast();
  const { navigate } = useHomeStackNavigation();
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      api
        .get<string[]>("/groups")
        .then(({ data }) => {
          if (!data.length) return;
          setGroups(data);
          setSelectedGroup(data[0]);
        })
        .catch(error => {
          let errorMessage = "Não foi possível buscar os grupos.";

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
        });
    }, []),
  );

  function handleSelectGroup(group: string) {
    return () => {
      setSelectedGroup(group);
    };
  }

  function handleOpenExerciseDetails(id: string) {
    return () => {
      navigate("exercise", { id });
    };
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        my={10}
        minH={10}
        maxH={10}
        horizontal
        data={groups}
        keyExtractor={group => group}
        _contentContainerStyle={{ px: 8 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: group }) => (
          <Group
            name={group}
            isActive={selectedGroup === group}
            onPress={handleSelectGroup(group)}
          />
        )}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          _contentContainerStyle={{ pb: 20 }}
          keyExtractor={exercise => exercise.id}
          ListEmptyComponent={() => (
            <Text color="gray.100">Não há exercícios...</Text>
          )}
          renderItem={({ item: exercise }) => (
            <ExerciseCard
              exercise={exercise}
              onPress={handleOpenExerciseDetails(exercise.id)}
            />
          )}
        />
      </VStack>
    </VStack>
  );
};
