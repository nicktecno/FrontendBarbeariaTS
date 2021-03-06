import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

// Esse componente serve para englobar todos os contextos em um só para importar no App
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
