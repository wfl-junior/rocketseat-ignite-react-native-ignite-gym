import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "~/screens/SignIn";
import { SignUp } from "~/screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

interface AuthRoutesProps {}

export const AuthRoutes: React.FC<AuthRoutesProps> = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="sign-in" component={SignIn} />
    <Screen name="sign-up" component={SignUp} />
  </Navigator>
);
