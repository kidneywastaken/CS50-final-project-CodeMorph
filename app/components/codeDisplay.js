import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import saveAs from 'file-saver';

export default function CodeDisplay({ file, aiResponse, fileName, type, transformation, removeData }) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [preview, setPreview] = useState(true);
  const [diffEnabled, setDiffEnabled] = useState(false);

  // Change selected view to preview
  const handlePreview = () => {
    setPreview(true);
    document.getElementById("previewBtn").style.backgroundColor = "#0f0f0f";
    document.getElementById("diffBtn").style.backgroundColor = "transparent";
  };

  // Change selected view to Diff View
  const handleDiffView = () => {
    setPreview(false);
    document.getElementById("diffBtn").style.backgroundColor = "#0f0f0f";
    document.getElementById("previewBtn").style.backgroundColor = "transparent";
  };

  // Checks for uploaded user file
  useEffect(() => {
    if (file) {
      setFileUploaded(true)
    }
  }, [file]);

  // Checks for ChatGPT response
  useEffect(() => {
    if (aiResponse != null) {
      // Changes view to Diff View
      setDiffEnabled(true);
      setPreview(false);
      document.getElementById("diffBtn").style.backgroundColor = "#0f0f0f";
      document.getElementById("previewBtn").style.backgroundColor = "transparent";
    }
  }, [aiResponse]);

  // Gets transformed file type and extension
  const getFileType = () => {
    const normalizedLang = type.toLowerCase().trim();
    const extensions = {
      'javascript': '.js',
      'typescript': '.ts',
      'python': '.py',
      'java': '.java',
      'c++': '.cpp',
      'php': '.php',
    };

    return {Ext: extensions[normalizedLang]};
  };

  // Removes file extension
  function removeFileExtension(filename) {
    return filename.replace(/\.[^/.]+$/, "");
  };

  // Downloads transformed file
  const handleDownload = () => {
    // Create file name
    let fileInfo = getFileType();
    let fileNameWithoutExt = removeFileExtension(fileName);
    let outputFileName = fileNameWithoutExt + fileInfo.Ext;
    console.log(outputFileName)

    // Creates transformed file
    const blob = new Blob([aiResponse], { type: 'text/plain;charset=utf-8' }); 
    
    // Downloads transformed file
    saveAs(blob, outputFileName);
  };
  
  // Removes data for new propmt
  useEffect(() => {
    if (removeData) {
      // Set to default
      setDiffEnabled(false);
      setPreview(true);
      setFileUploaded(false);
      document.getElementById("previewBtn").style.backgroundColor = "#0f0f0f";
      document.getElementById("diffBtn").style.backgroundColor = "transparent";
    };
  }, [removeData]);

  return (
    <div >
      <div className="flex flex row">
        <div className="basis-8/10 border rounded-lg m-6 p-1 BtnDrop">
          <button style={{width: "50%", backgroundColor: "#0f0f0f"}} className="darkBtn" id="previewBtn"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button style={{width: "50%" }} className="darkBtn" id="diffBtn"
            onClick={handleDiffView} disabled={!diffEnabled}
          >
            Diff View
          </button>
        </div>
        <div className="basis-2/10 rounded-lg m-6 p-4">
        </div>
      </div>

      <div className="flex flex row mb-4">
        <div className="basis-8/10 border rounded-lg ml-6 mr-6 p-4 code-preview">
          {preview ? 
          (<div>
            <h1 className="text-2xl font-bold m-2 mb-6">Preview</h1>
            <div className="border rounded-lg m-2 p-4 BtnDrop code-preview overflow-x-auto" style={{minHeight: "100px",}}>
              {!fileUploaded ? (<p>Upload a file to preview...</p>) : (<pre><code>{file}</code></pre>)}
            </div>
          </div>) :
          (<div>
            <div className="flex flex row">
              <div className="basis-14/16">
                <h1 className="text-2xl font-bold m-2 mb-6">Comparison</h1>
              </div>
              <div className="basis-2/16">
                <button onClick={handleDownload} className=" newPrompt font-semibold" style={{marginTop: "6%"}}>
                  <div className="flex flex-row">
                    <Download className="basis-2/10 w-5 h-5"/>
                    <p className="basis-8/10">Download</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex flex row">
              <div className="basis-5/10">
              <h2 className="text-sm ml-2">
                Original 
              </h2>
              </div>
              <div className="basis-5/10">
              <h2 className="text-sm ml-2">
                Transformed
              </h2>
              </div>
            </div>
            <div className="flex flex row">
              <div className="basis-5/10 border rounded-lg m-2 p-4 BtnDrop code-box">
                <pre><code>{file}</code></pre>
              </div>
              <div className="basis-5/10 border rounded-lg m-2 p-4 BtnDrop code-box">
                <pre><code>{aiResponse}</code></pre>
              </div>
            </div>
          </div>)}
        </div>
        <div className="basis-2/10 ml-6 mr-6 p-4">
        </div>
      </div>
    </div>
  );
};

