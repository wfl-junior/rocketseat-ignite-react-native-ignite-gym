import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Center, NativeBaseProvider, Text } from "native-base";
import { StatusBar } from "react-native";
import { Loading } from "~/components/Loading";

const App: React.FC = () => {
  const [areFontsReady] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider>
      <Center flex={1} backgroundColor="#202024">
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
      </Center>
    </NativeBaseProvider>
  );
};

export default App;
