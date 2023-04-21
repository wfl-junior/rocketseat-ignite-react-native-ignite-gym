import { Heading, SectionList, Text, VStack } from "native-base";
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
          <Heading
            mb={3}
            mt={10}
            fontSize="md"
            color="gray.200"
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length ? undefined : { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda.{"\n"}Vamos fazer exercícios
            hoje?
          </Text>
        )}
      />
    </VStack>
  );
};
