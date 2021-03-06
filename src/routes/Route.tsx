// essa página cria um gerador de rotas personalizado para redirecionar usuarios autenticados
import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  // faz com que retorne um componente do tip {componente} nao {<componente/>}
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { usuario } = useAuth();
  // dentro do render que mudamos o comportamento do react ler as rotas, podendo colocar rotas privadas que serao somente acessadas por usuarios autenticados

  return (
    <ReactDOMRoute
      {...rest}
      // esse location é para pegar o histórico
      render={({ location }) => {
        return isPrivate === !!usuario ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
