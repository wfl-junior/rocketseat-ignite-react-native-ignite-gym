import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { Fragment } from "react";
import { ExerciseCard } from "~/components/ExerciseCard";
import { Group } from "~/components/Group";
import { HomeHeader } from "~/components/HomeHeader";
import { Loading } from "~/components/Loading";
import { useExerciseGroups } from "~/hooks/useExerciseGroups";
import { useExercisesByGroup } from "~/hooks/useExercisesByGroup";
import { useHomeStackNavigation } from "~/hooks/useHomeStackNavigation";
import type { ExerciseDTO } from "~/types/ExerciseDTO";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { navigate } = useHomeStackNavigation();
  const {
    groups,
    selectedGroup,
    setSelectedGroup,
    isLoading: isLoadingGroups,
  } = useExerciseGroups();

  const { exercises, isLoading: isLoadingExercises } =
    useExercisesByGroup(selectedGroup);

  function handleSelectGroup(group: string) {
    return () => {
      setSelectedGroup(group);
    };
  }

  function handleOpenExerciseDetails(exerciseId: ExerciseDTO["id"]) {
    return () => {
      navigate("exercise", { exerciseId });
    };
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoadingGroups ? (
        <Loading />
      ) : (
        <Fragment>
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

          {isLoadingExercises ? (
            <Loading />
          ) : (
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
                keyExtractor={exercise => exercise.id.toString()}
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
          )}
        </Fragment>
      )}
    </VStack>
  );
};
