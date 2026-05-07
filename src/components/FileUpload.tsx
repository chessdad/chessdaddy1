import React, { useState } from 'react';
import '../styles/FileUpload.css';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileSelect(content);
      };
      reader.readAsText(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileSelect(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      className={`file-upload ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-input"
        accept=".pgn"
        onChange={handleChange}
        hidden
      />
      <label htmlFor="file-input" className="upload-label">
        <Upload size={32} />
        <p>Drag and drop PGN file here or click to select</p>
      </label>
    </div>
  );
};

export default FileUpload;