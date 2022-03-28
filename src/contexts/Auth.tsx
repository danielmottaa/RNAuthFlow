import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from "react";
import { Alert } from 'react-native';
import { authService } from "../services/authServices";

export interface IAuthData {
  token: string;
  email: string;
  name: string;
}

export interface IAuthContext {
  authData?: IAuthData
  signIn: (email: string, password: string) => Promise<IAuthData>;
  signOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
  }, []);

  async function loadFromStorage() {
    const auth = await AsyncStorage.getItem('@AuthData');

    if(auth) {
      setAuthData(JSON.parse(auth));
    }
    setLoading(false);
  }

  async function signIn(email: string, password: string) {

    try {
      const auth = await authService.signIn(email, password);
      setAuthData(auth);
      AsyncStorage.setItem('@AuthData', JSON.stringify(auth));
      return auth;

    } catch (error) {
      Alert.alert(error.message, 'tente novamente');
    }
  }

  async function signOut(): Promise<void> {
    setAuthData(undefined);
    AsyncStorage.removeItem('@AuthData');
    return;
  }

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}