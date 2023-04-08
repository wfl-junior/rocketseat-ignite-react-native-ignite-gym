import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Exercise } from "~/screens/Exercise";
import { History } from "~/screens/History";
import { Home } from "~/screens/Home";
import { Profile } from "~/screens/Profile";

type AppRoutesParamList = {
  home: undefined;
  exercise: undefined;
  history: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps =
  BottomTabNavigationProp<AppRoutesParamList>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

interface AppRoutesProps {}

export const AppRoutes: React.FC<AppRoutesProps> = () => (
  <Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
    <Screen name="home" component={Home} />
    <Screen name="history" component={History} />
    <Screen name="profile" component={Profile} />
    <Screen name="exercise" component={Exercise} />
  </Navigator>
);
