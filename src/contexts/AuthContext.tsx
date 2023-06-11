import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMMKVObject } from "react-native-mmkv";
import { api } from "~/lib/api";
import { storage } from "~/lib/storage";
import type { UserDTO } from "~/types/UserDTO";
import { STORAGE_KEYS } from "~/utils/constants";
import { SignInFormData } from "~/validation/sign-in";

interface SignInResponse {
  user: UserDTO;
  token: string;
  refresh_token: string;
}

interface AuthContextData {
  signOut: () => void;
  isAuthenticated: boolean;
  user: UserDTO | undefined;
  isFetchingAccessToken: boolean;
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
  const [isFetchingAccessToken, setIsFetchingAccessToken] = useState(true);
  const [user, setUser] = useMMKVObject<UserDTO>(STORAGE_KEYS.user, storage);

  useEffect(() => {
    const refreshToken = storage.getString(STORAGE_KEYS.refreshToken);

    if (!refreshToken) {
      setUser(undefined);
      return setIsFetchingAccessToken(false);
    }

    api
      .post<{ token: string; refresh_token: string }>(
        "/sessions/refresh-token",
        {
          refresh_token: refreshToken,
        },
      )
      .then(({ data }) => {
        storage.set(STORAGE_KEYS.refreshToken, data.refresh_token);
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
      })
      .catch(() => {
        storage.delete(STORAGE_KEYS.refreshToken);
        setUser(undefined);
      })
      .finally(() => setIsFetchingAccessToken(false));
  }, []);

  const signIn: AuthContextData["signIn"] = useCallback(async credentials => {
    const { data } = await api.post<SignInResponse>("/sessions", credentials);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    storage.set(STORAGE_KEYS.refreshToken, data.refresh_token);
    setUser(data.user);
  }, []);

  const signOut: AuthContextData["signOut"] = useCallback(() => {
    delete api.defaults.headers.Authorization;
    storage.delete(STORAGE_KEYS.refreshToken);
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isFetchingAccessToken,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
