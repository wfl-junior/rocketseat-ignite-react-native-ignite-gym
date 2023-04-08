import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Box, NativeBaseProvider, Text } from "native-base";
import { StatusBar } from "react-native";

const App: React.FC = () => {
  const [areFontsReady] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider>
      <Box
        flex={1}
        backgroundColor="#202024"
        alignItems="center"
        justifyContent="center"
      >
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />

        {areFontsReady && (
          <Text fontFamily="Roboto_700Bold" color="white" fontSize={36}>
            Hello World
          </Text>
        )}
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
