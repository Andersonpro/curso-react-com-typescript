import { createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLogadoContextData {
  nomeDoUsuario: string;
  logout: () => void;
}

interface IUsuarioLogadoProviderProps {
  children: React.ReactNode;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProviderProps> = ({children}) => {
  const [nome, setNome] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setNome('Anderson');
    }, 1000);
  });


  const handleLogout = useCallback(() => {
    console.log('Lougout Executou');
  }, []);

  return (
    <UsuarioLogadoContext.Provider value={{nomeDoUsuario: nome, logout: handleLogout}}>
      {children}
    </UsuarioLogadoContext.Provider>
  );
}