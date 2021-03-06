import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  nome: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  usuario: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  usuario: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
// esse as AuthContext é só para tipar, porque de inicio na autenticacao ele nao tem nenhum valor
// abaixo sera o data recebido la no signin
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const usuario = localStorage.getItem('@GoBarber:usuario');

    if (token && usuario) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, usuario: JSON.parse(usuario) };
    }

    return {} as AuthState;
  }); // toda essa logica só será inicializada quando o usuario atualizar a página

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, usuario } = response.data;
    console.log(response.data);

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:usuario', JSON.stringify(usuario));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, usuario });
  }, []);
  // @GoBarber é um prefixo

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@GoBarber:usuario');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (usuario: User) => {
      localStorage.setItem('@GoBarber:usuario', JSON.stringify(usuario));
      setData({
        token: data.token,
        usuario,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ usuario: data.usuario, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
    // ao invé de passar todo o data do do useState, ele passou apenas o user do data onde ele apelidou de user
  ); // o children é tudo o que o AuthContext receber como filho irá aparecer no contexto
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser usado com o AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
