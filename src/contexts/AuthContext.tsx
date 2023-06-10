import { createContext, useCallback, useContext } from "react";
import { useMMKVObject } from "react-native-mmkv";
import { api } from "~/lib/api";
import { storage } from "~/lib/storage";
import type { User } from "~/types/User";
import { USER_STORAGE_KEY } from "~/utils/constants";
import { SignInFormData } from "~/validation/sign-in";

interface AuthContextData {
  user: User | undefined;
  isAuthenticated: boolean;
  signOut: () => void;
  signIn: (credentials: SignInFormData) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useMMKVObject<User>(USER_STORAGE_KEY, storage);

  const signIn: AuthContextData["signIn"] = useCallback(async credentials => {
    const { data } = await api.post<{ user: User }>("/sessions", credentials);
    setUser(data.user);
  }, []);

  const signOut: AuthContextData["signOut"] = useCallback(() => {
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
