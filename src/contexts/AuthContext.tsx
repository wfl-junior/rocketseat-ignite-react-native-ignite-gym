import { createContext, useCallback, useContext, useState } from "react";
import { api } from "~/lib/api";
import type { User } from "~/types/User";
import { SignInFormData } from "~/validation/sign-in";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);

  const signIn: AuthContextData["signIn"] = useCallback(async credentials => {
    const { data } = await api.post<{ user: User; accessToken: string }>(
      "/sessions",
      credentials,
    );

    setUser(data.user);
  }, []);

  const signOut: AuthContextData["signOut"] = useCallback(async () => {
    setUser(null);
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
