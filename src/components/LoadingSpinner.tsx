import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = 'text-indigo-600',
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${color}`}
      style={{ width: size, height: size }}
    ></div>
  );
};
