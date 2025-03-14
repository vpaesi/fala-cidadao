import React from 'react';

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="imagemUrl" className="block text-sm font-medium text-gray-700">
        Upload de Imagem
      </label>
      <div className="mt-1 flex items-center">
        <input
          type="file"
          id="imagemUrl"
          accept="image/*"
          onChange={onChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
    </div>
  );
};