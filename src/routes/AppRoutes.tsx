import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import HistoryIcon from "~/assets/history.svg";
import HomeIcon from "~/assets/home.svg";
import ProfileIcon from "~/assets/profile.svg";
import { History } from "~/screens/History";
import { Profile } from "~/screens/Profile";
import { HomeRoutes } from "./HomeRoutes";

type AppRoutesParamList = {
  home: undefined;
  history: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps =
  BottomTabNavigationProp<AppRoutesParamList>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

interface AppRoutesProps {}

export const AppRoutes: React.FC<AppRoutesProps> = () => {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          borderTopWidth: 0,
          paddingTop: sizes[6],
          paddingBottom: sizes[10],
          backgroundColor: colors.gray[600],
          height: Platform.OS === "android" ? "auto" : 96,
        },
      }}
    >
      <Screen
        name="home"
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistoryIcon fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIcon fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Navigator>
  );
};
