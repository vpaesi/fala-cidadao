import React from 'react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'info';
}

export const Alert: React.FC<AlertProps> = ({ message, type = 'info' }) => {
  const colors = {
    error: 'text-red-500',
    success: 'text-green-500',
    info: 'text-blue-500',
  };

  return <p className={`text-sm mt-1 ${colors[type]}`}>{message}</p>;
};