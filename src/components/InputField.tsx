import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'textarea' | 'email' | 'password';
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  errorMessage?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  readOnly = false,
  required = false,
  style,
  errorMessage,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div>
        {type === 'textarea' ? (
          <textarea
            id={id}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errorMessage ? 'border-red-500' : ''
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            required={required}
            style={{ ...style }}
            rows={4}
          />
        ) : (
          <input
            type={type}
            id={id}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errorMessage ? 'border-red-500' : ''
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            required={required}
            style={{ ...style }}
          />
        )}
      </div>
      {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};