import { createContext, useCallback, useContext } from "react";
import { useMMKVObject } from "react-native-mmkv";
import { api } from "~/lib/api";
import { storage } from "~/lib/storage";
import type { User } from "~/types/User";
import { STORAGE_KEYS } from "~/utils/constants";
import { SignInFormData } from "~/validation/sign-in";

interface SignInResponse {
  user: User;
  token: string;
  refresh_token: string;
}

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
  const [user, setUser] = useMMKVObject<User>(STORAGE_KEYS.user, storage);

  const signIn: AuthContextData["signIn"] = useCallback(async credentials => {
    const { data } = await api.post<SignInResponse>("/sessions", credentials);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    storage.set(STORAGE_KEYS.accessToken, data.token);
    setUser(data.user);
  }, []);

  const signOut: AuthContextData["signOut"] = useCallback(() => {
    delete api.defaults.headers.Authorization;
    storage.delete(STORAGE_KEYS.accessToken);
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
