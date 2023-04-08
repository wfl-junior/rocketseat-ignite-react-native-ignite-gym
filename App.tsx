import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import { Loading } from "~/components/Loading";
import { SignUp } from "~/screens/SignUp";
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

      {areFontsReady ? <SignUp /> : <Loading />}
    </NativeBaseProvider>
  );
};

export default App;
