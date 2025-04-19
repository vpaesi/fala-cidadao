import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingScreenProps {
    size?: number;
    color?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ size = 48, color = 'text-indigo-600' }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size={size} color={color} />
        </div>
    );
};
