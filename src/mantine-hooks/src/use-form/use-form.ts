import React, { useState } from 'react';
import { getInputOnChange } from '../use-input-state/use-input-state';

export type ValidationRule<T> = {
  readonly [P in keyof T]?: (value: T[P], values?: T) => boolean;
};

export type UseFormErrors<T> = {
  readonly [P in keyof T]?: React.ReactNode | null;
};

export interface UseForm<T> {
  validationRules?: ValidationRule<T>;
  errorMessages?: UseFormErrors<T>;
  initialValues: T;
}

export function useForm<T extends { [key: string]: any }>({
  initialValues,
  validationRules = {},
  errorMessages = {},
}: UseForm<T>) {
  type ValidationErrors = Record<keyof T, React.ReactNode>;

  const initialErrors = Object.keys(initialValues).reduce((acc, field) => {
    acc[field as keyof T] = null;
    return acc;
  }, {} as ValidationErrors);

  const [errors, setErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialValues);

  const resetErrors = () => setErrors(initialErrors);

  const reset = () => {
    setValues(initialValues);
    resetErrors();
  };

  const validate = () => {
    let isValid = true;

    const validationErrors = Object.keys(values).reduce((acc, field) => {
      if (
        validationRules &&
        typeof validationRules[field] === 'function' &&
        !validationRules[field](values[field], values)
      ) {
        acc[field as keyof T] = errorMessages[field] || true;
        isValid = false;
      } else {
        acc[field as keyof T] = null;
      }

      return acc;
    }, {} as ValidationErrors);

    setErrors(validationErrors);
    return isValid;
  };

  const validateField = (field: keyof T) =>
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]:
        typeof validationRules[field] === 'function'
          ? validationRules[field](values[field], values)
            ? null
            : errorMessages[field] || true
          : null,
    }));

  const setFieldError = (field: keyof T, error: React.ReactNode) =>
    setErrors((currentErrors) => ({ ...currentErrors, [field]: error }));

  const setFieldValue = <K extends keyof T, U extends T[K]>(field: K, value: U) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setFieldError(field, null);
  };

  const onSubmit = (handleSubmit: (values: T) => any) => (event?: React.FormEvent) => {
    event && event.preventDefault();
    validate() && handleSubmit(values);
  };

  const getInputProps = <K extends keyof T, U extends T[K]>(
    field: K,
    options?: { type?: 'checkbox' | 'default' }
  ) => ({
    [options?.type === 'checkbox' ? 'checked' : 'value']: values[field],
    onChange: getInputOnChange<U>((val: U | null | undefined) => setFieldValue(field, val)),
    error: errors[field] || undefined,
  });

  return {
    values,
    errors,
    validate,
    reset,
    setErrors,
    setValues,
    setFieldValue,
    setFieldError,
    validateField,
    resetErrors,
    onSubmit,
    getInputProps,
  };
}
