import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "~/screens/SignIn";
import { SignUp } from "~/screens/SignUp";

type IAuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<IAuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<IAuthRoutes>();

interface AuthRoutesProps {}

export const AuthRoutes: React.FC<AuthRoutesProps> = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="signIn" component={SignIn} />
    <Screen name="signUp" component={SignUp} />
  </Navigator>
);
