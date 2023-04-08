import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Exercise } from "~/screens/Exercise";
import { Home } from "~/screens/Home";

type HomeRoutesParamList = {
  default: undefined;
  exercise: undefined;
};

export type HomeNavigatorRoutesProps =
  NativeStackNavigationProp<HomeRoutesParamList>;

const { Navigator, Screen } = createNativeStackNavigator<HomeRoutesParamList>();

interface HomeRoutesProps {}

export const HomeRoutes: React.FC<HomeRoutesProps> = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="default" component={Home} />
    <Screen name="exercise" component={Exercise} />
  </Navigator>
);
