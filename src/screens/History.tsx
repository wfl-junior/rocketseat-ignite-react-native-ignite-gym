import { VStack } from "native-base";
import { HistoryCard } from "~/components/HistoryCard";
import { ScreenHeader } from "~/components/ScreenHeader";

interface HistoryProps {}

export const History: React.FC<HistoryProps> = () => (
  <VStack flex={1}>
    <ScreenHeader title="Histórico de Exercícios" />
    <HistoryCard />
    <HistoryCard />
    <HistoryCard />
  </VStack>
);
