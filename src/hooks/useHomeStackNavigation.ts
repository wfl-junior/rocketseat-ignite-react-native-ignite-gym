import { useNavigation } from "@react-navigation/native";
import type { HomeNavigatorRoutesProps } from "~/routes/HomeRoutes";

export function useHomeStackNavigation() {
  return useNavigation<HomeNavigatorRoutesProps>();
}
