import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import { Loading } from "~/components/Loading";
import { AuthContextProvider } from "~/contexts/AuthContext";
import { Routes } from "~/routes";
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

      <AuthContextProvider>
        {areFontsReady ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
