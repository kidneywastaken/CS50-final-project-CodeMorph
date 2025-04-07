import React, { useState, useEffect } from "react";

export default function FileUploader({ onFileSelect, onRemoveData }) {
  const [file, setFile] = useState(null);
  const [loadingFile, setLoadingFile] = useState(true);
  let data = {};

  // Opens file selector
  const openFileSelector = () => {
    document.getElementById("fileSelector").click();
  };

  // Sets user's file data 
  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
    data["fileName"] = event.target.files[0].name;

    const reader = new FileReader();
    
    reader.onload = function(e) {
      const text = e.target.result;
      data["file"] = text;
      onFileSelect?.(data); 
    };
    reader.readAsText(event.target.files[0]);

    setLoadingFile(false);
    onFileSelect?.(null); 
  };

  // formats user's file's size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  // Removes user's file
  const onFileRemoved = () => {
    setLoadingFile(true);
  };

  // Removes data for new prompt
  useEffect(() => {
    if (onRemoveData) {
      setLoadingFile(true);
      setFile(null);
      data = {};
      console.log(data);
    }
  }, [onRemoveData])
  
  return (
    <div className="space-y-4">
      {loadingFile ? (
        <div
          className={`m-2 border-2 border-dashed rounded-lg p-8 text-center fileLoader transition-colors cursor-pointer`}
          onClick={openFileSelector}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-white-500">
              Drag and drop your file here, or click to select
            </p>
            <p className="text-xs text-gray-400">
              Supports .js, .py, .txt, and other code files
            </p>
            <input
              id="fileSelector"
              type="file"
              className="hidden"
              accept=".js,.ts,.py,.java,.c,.cpp,.cs,.php,.rb,.go,.rs,.txt,.html,.css,.json"
              onChange={handleFileChange}
            />
            <p className="text-sm text-white-700">Select a file</p>
          </div>
        </div>
      ) : (
        <div className="m-2 mb-6 p-4 fileLoaded rounded-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div className="ml-2">
              <p className="text-sm font-medium text-white">{file.name} </p>
              <p className="text-xs text-white">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              className="ml-auto text-gray-400 hover:text-red-500"
              onClick={onFileRemoved}
              aria-label="Remove file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

