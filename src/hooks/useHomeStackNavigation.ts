import { useNavigation } from "@react-navigation/native";
import { HomeNavigatorRoutesProps } from "~/routes/HomeRoutes";

export function useHomeStackNavigation() {
  return useNavigation<HomeNavigatorRoutesProps>();
}
