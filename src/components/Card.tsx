import React from 'react';

interface CardProps {
  imageUrl?: string;
  title: string;
  description: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, description, footer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};
