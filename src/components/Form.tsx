import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
    </form>
  );
};
