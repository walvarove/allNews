import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_IDENTIFIER } from "../lib/constants";
import { PathRoutes } from "../lib/Menu";
import { IUser, LoginRequest, LoginResponse } from "../models/User";
import { ApiService } from "../services/api.service";
import { UsersService } from "../services/auth.service";

interface AuthContextType {
  user: Partial<IUser> | null;
  loading?: boolean;
  accessToken?: string | null;
  error?: any;
  isLogged?: boolean;
  setError: (error?: any) => void;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth(): AuthContextType {

  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>();

  const navigate = useNavigate();

  const getUserProfile = async () => {
    try {
      const user = await UsersService.getProfile();
      setUser(user);
    } catch {
      setAccessToken(null);
      localStorage.removeItem(ACCESS_TOKEN_IDENTIFIER);
    }
  };

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    return await UsersService.login(credentials)
      .then((loginResponse: LoginResponse) => {
        localStorage.setItem(
          ACCESS_TOKEN_IDENTIFIER,
          loginResponse.accessToken
        );
        ApiService.setAccessToken(loginResponse.accessToken);
        getUserProfile();
        setError(false);
      })
      .catch(error => { setError(error.message);})
      .finally(() => setLoading(false));
  };

  function logout() {
    setAccessToken(null);
    setUser(null);
    navigate(PathRoutes.HOME);
    localStorage.removeItem(ACCESS_TOKEN_IDENTIFIER);
  }

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_IDENTIFIER);
    setAccessToken(token);
    if (!user && token) {
        ApiService.setAccessToken(token);
      getUserProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    loading,
    error,
    setError,
    accessToken,
    login,
    logout,
  };
}
