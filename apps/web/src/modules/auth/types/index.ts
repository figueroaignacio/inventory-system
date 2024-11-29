export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  userName?: string;
  setUserName: (name: string) => void;
}
