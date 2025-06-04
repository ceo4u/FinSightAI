
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
            ? "border-navy-400 bg-navy-50" 
            : "border-navy-200 hover:border-navy-300 hover:bg-slate-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "p-4 rounded-full transition-colors",
            isDragOver ? "bg-navy-100" : "bg-slate-100"
          )}>
            {isDragOver ? (
              <FileText className="h-8 w-8 text-navy-600" />
            ) : (
              <Upload className="h-8 w-8 text-slate-600" />
            )}
          </div>
          
          <div>
            <p className="font-medium text-navy-700 mb-1">
              {isDragOver ? "Drop your PDF here" : "Upload Financial PDF Report"}
            </p>
            <p className="text-sm text-slate-500">
              Drop or select a financial report PDF (max 10MB)
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-navy-200 text-navy-600 hover:bg-navy-50"
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
