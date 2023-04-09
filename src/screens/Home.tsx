import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";
import { ExerciseCard } from "~/components/ExerciseCard";
import { Group } from "~/components/Group";
import { HomeHeader } from "~/components/HomeHeader";

export interface Exercise {
  id: string;
  title: string;
  description: string;
}

enum GroupType {
  Costas = "Costas",
  Biceps = "Bíceps",
  Triceps = "Tríceps",
  Ombro = "Ombro",
}

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [groups, setGroups] = useState(() => Object.values(GroupType));
  const [selectedGroup, setSelectedGroup] = useState(GroupType.Costas);
  const [exercises, setExercises] = useState<Exercise[]>(() => [
    {
      id: "1",
      title: "Puxada frontal",
      description: "3 séries x 12 repetições",
    },
    {
      id: "2",
      title: "Remada curvada",
      description: "3 séries x 12 repetições",
    },
    {
      id: "3",
      title: "Remada unilateral",
      description: "3 séries x 12 repetições",
    },
    {
      id: "4",
      title: "Levantamento terra",
      description: "3 séries x 12 repetições",
    },
  ]);

  function handleSelectGroup(group: GroupType) {
    return () => {
      setSelectedGroup(group);
    };
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        my={10}
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
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          _contentContainerStyle={{ pb: 20 }}
          keyExtractor={exercise => exercise.id}
          renderItem={({ item: exercise }) => (
            <ExerciseCard exercise={exercise} />
          )}
        />
      </VStack>
    </VStack>
  );
};
