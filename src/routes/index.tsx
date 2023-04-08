import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./AuthRoutes";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => (
  <NavigationContainer>
    <AuthRoutes />
  </NavigationContainer>
);
