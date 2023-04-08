import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto_700Bold",
    color: "white",
    fontSize: 36,
  },
});

const App: React.FC = () => {
  const [areFontsReady] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      {areFontsReady && <Text style={styles.text}>Hello World</Text>}
    </View>
  );
};

export default App;
