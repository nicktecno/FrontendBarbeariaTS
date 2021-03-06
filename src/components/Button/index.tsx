import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// esse children sao as propriedades herdadas do index do signIn, o que está escrito Entrar no caso e o resto sao as propriedades de dentro do elemento
const Button: React.FC<ButtonProps> = ({ children, loading, ...resto }) => (
  <Container type="button" {...resto}>
    {loading ? 'Carregando...' : children}
  </Container>
);
export default Button;
