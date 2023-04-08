import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { History } from "~/screens/History";
import { Home } from "~/screens/Home";
import { Profile } from "~/screens/Profile";

type IAppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<IAppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<IAppRoutes>();

interface AppRoutesProps {}

export const AppRoutes: React.FC<AppRoutesProps> = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="home" component={Home} />
    <Screen name="history" component={History} />
    <Screen name="profile" component={Profile} />
  </Navigator>
);
