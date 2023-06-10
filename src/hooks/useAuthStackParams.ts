import { useRoute } from "@react-navigation/native";
import type { AuthRoutesParamList } from "~/routes/AuthRoutes";

export function useAuthStackParams<T extends keyof AuthRoutesParamList>() {
  const { params } = useRoute();
  return params as AuthRoutesParamList[T];
}
