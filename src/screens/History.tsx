import { Heading, SectionList, VStack } from "native-base";
import { useState } from "react";
import { HistoryCard } from "~/components/HistoryCard";
import { ScreenHeader } from "~/components/ScreenHeader";

interface HistoryProps {}

export const History: React.FC<HistoryProps> = () => {
  const [exercises, setExercises] = useState([
    {
      title: "27.08.2022",
      data: ["Puxada frontal"],
    },
    {
      title: "26.08.2022",
      data: ["Puxada frontal", "Remada unilateral"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        px={8}
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
      />
    </VStack>
  );
};
