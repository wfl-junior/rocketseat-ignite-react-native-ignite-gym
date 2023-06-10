import { useNavigation } from "@react-navigation/native";
import type { AuthNavigatorRoutesProps } from "~/routes/AuthRoutes";

export function useAuthStackNavigation() {
  return useNavigation<AuthNavigatorRoutesProps>();
}
