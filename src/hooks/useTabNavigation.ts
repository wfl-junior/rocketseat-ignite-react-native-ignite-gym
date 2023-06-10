import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "~/routes/AppRoutes";

export function useTabNavigation() {
  return useNavigation<AppNavigatorRoutesProps>();
}
