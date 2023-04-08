import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { THEME } from "~/theme";
import { AuthRoutes } from "./AuthRoutes";

const theme = DefaultTheme;
theme.colors.background = THEME.colors.gray[700];

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => (
  <Box flex={1} bg="gray.700">
    <NavigationContainer theme={theme}>
      <AuthRoutes />
    </NavigationContainer>
  </Box>
);
