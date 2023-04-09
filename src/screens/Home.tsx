import { HStack, VStack } from "native-base";
import { useState } from "react";
import { Group } from "~/components/Group";
import { HomeHeader } from "~/components/HomeHeader";

enum GroupType {
  Costas = "Costas",
  Ombro = "Ombro",
}

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [selectedGroup, setSelectedGroup] = useState(GroupType.Costas);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack>
        {Object.values(GroupType).map(group => (
          <Group
            key={group}
            name={group}
            isActive={selectedGroup === group}
            onPress={() => setSelectedGroup(group)}
          />
        ))}
      </HStack>
    </VStack>
  );
};
