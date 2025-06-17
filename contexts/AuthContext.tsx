import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signInUserData = (userData) => {
    setUser(userData);
    router.replace("/(tabs)");
  };

  const signOut = () => {
    setUser(null);
    router.push("/(auth)/index");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signInUserData, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
