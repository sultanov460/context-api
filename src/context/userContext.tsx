import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserContext {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const userContext = createContext({} as UserContext);
export const useUser = () => useContext(userContext);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = (u: User) => {
    setUser(u);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
}
