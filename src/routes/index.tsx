import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { THEME } from "~/theme";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";

const theme = DefaultTheme;
theme.colors.background = THEME.colors.gray[700];

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  const isAuthenticated = true;

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
