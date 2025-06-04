
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      onFileSelect(pdfFile);
      console.log('PDF file dropped:', pdfFile.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
      console.log('PDF file selected:', file.name);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer",
          isDragOver 
            ? "border-cyan-400 bg-gradient-to-r from-blue-50 to-cyan-50" 
            : "border-blue-300 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "p-4 rounded-full transition-colors",
            isDragOver 
              ? "bg-gradient-to-r from-cyan-100 to-blue-100" 
              : "bg-gradient-to-r from-blue-100 to-cyan-100"
          )}>
            {isDragOver ? (
              <FileText className="h-8 w-8 text-cyan-600" />
            ) : (
              <Upload className="h-8 w-8 text-blue-600" />
            )}
          </div>
          
          <div>
            <p className="font-medium text-blue-900 mb-1">
              {isDragOver ? "Drop your PDF here" : "Upload Financial PDF Report"}
            </p>
            <p className="text-sm text-blue-600">
              Drop or select a financial report PDF (max 10MB)
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-300 text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:border-cyan-400"
          >
            Choose File
          </Button>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
