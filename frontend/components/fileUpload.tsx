/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';

interface FileUploadZaymaProps {
  onFileSelect?: (file: File) => void;
  onPreviewChange?: (preview: string) => void;
}

export function FileUploadZayma({
  onFileSelect,
  onPreviewChange,
}: FileUploadZaymaProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewLogo, setPreviewLogo] = useState<string>('');

  const handleLogoChange = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        setPreviewLogo(preview);
        if (onPreviewChange) {
          onPreviewChange(preview);
        }
      };
      reader.readAsDataURL(file);

      setFiles([file]);

      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload value={files} onChange={handleLogoChange} accept="image/*" />
      {previewLogo && (
        <div className="mt-4">
          <img
            src={previewLogo}
            alt="Logo preview"
            className="max-w-[200px] mx-auto"
          />
        </div>
      )}
    </div>
  );
}
