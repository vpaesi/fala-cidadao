import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, description, footer }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm line-clamp-3">{description}</p> {/* Limita a 3 linhas */}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};
