import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";
import { Group } from "~/components/Group";
import { HomeHeader } from "~/components/HomeHeader";

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
      </VStack>
    </VStack>
  );
};
