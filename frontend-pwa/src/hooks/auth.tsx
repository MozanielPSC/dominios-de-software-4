import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../service/api';

import { HeadersDefaults } from 'axios'

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

interface CommonHeaderProperties extends HeadersDefaults {
  authorization: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authed, setAuthed] = useState(false)

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@FindPackageApp: token');
    const user = localStorage.getItem('@FindPackageApp: user');

    if (token && user) {
      api.defaults.headers = {
        authorization: `Bearer ${token}`
      } as CommonHeaderProperties
      setAuthed(true);
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@FindPackageApp: token', token);
    localStorage.setItem('@FindPackageApp: user', JSON.stringify(user));

    api.defaults.headers = {
      authorization: `Bearer ${token}`
    } as CommonHeaderProperties
    setAuthed(true)
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FindPackageApp: token');
    localStorage.removeItem('@FindPackageApp: user');
    setAuthed(false)
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@FindPackageApp: user', JSON.stringify(user));
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
