import { Heading, SectionList, Text, VStack } from "native-base";
import { HistoryCard } from "~/components/HistoryCard";
import { Loading } from "~/components/Loading";
import { ScreenHeader } from "~/components/ScreenHeader";
import { useExerciseHistory } from "~/hooks/useExerciseHistory";

interface HistoryProps {}

export const History: React.FC<HistoryProps> = () => {
  const { history, isLoading } = useExerciseHistory();

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          px={8}
          sections={history}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <HistoryCard exercise={item} />}
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
            history.length ? undefined : { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda.{"\n"}Vamos fazer exercícios
              hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  );
};
