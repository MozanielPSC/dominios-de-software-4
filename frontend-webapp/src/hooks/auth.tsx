import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../service';

interface User {
  name: string;
  id: string;
  avatar_url: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  authed: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authed, setAuthed] = useState(false)

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@FindPackage: token');
    const user = localStorage.getItem('@FindPackage: user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setAuthed(true);
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@FindPackage: token', token);
    localStorage.setItem('@FindPackage: user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setAuthed(true)
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FindPackage: token');
    localStorage.removeItem('@FindPackage: user');
    setAuthed(false)
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@FindPackage: user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, authed }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
