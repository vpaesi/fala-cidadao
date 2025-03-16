import React from 'react';
import { SignupForm } from '../components/SignupForm';

export const Signup: React.FC = () => {

  return (
    <div 
    className="max-w-md mx-auto px-2 py-4" 
    style={{ border: '1px solid black', 
    borderRadius: 8, 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
    backgroundColor: 'white', 
    padding: 50, 
    marginTop: '2.5rem',
    marginBottom: '2.5rem',}}>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cadastro</h1>
      < SignupForm />
    </div>
  );
};