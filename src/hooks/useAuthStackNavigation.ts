import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "~/routes/AuthRoutes";

export function useAuthStackNavigation() {
  return useNavigation<AuthNavigatorRoutesProps>();
}
