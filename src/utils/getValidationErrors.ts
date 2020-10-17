import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
  // o key nao quer dizer nada, essa interface é um objeto que pode ser tring dos dois lados apenas
}

// funcao para colocar o erro em cada input produzido de dentro do erro do YUP Validation Error

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
