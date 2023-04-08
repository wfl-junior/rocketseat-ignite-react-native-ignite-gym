import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider, Text } from "native-base";
import { StatusBar } from "react-native";
import { Loading } from "~/components/Loading";
import { THEME } from "~/theme";

const App: React.FC = () => {
  const [areFontsReady] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      {areFontsReady ? (
        <Text fontFamily="Roboto_700Bold" color="white" fontSize={36}>
          Hello World
        </Text>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
};

export default App;
