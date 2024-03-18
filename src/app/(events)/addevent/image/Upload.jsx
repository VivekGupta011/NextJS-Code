import React, { useState, useRef } from "react";
import uploadIcon from "./upload.png"; // Assuming correct path to upload.png
import Image from "next/image";

function Upload({ fileName, handleUpload, setUploadedImageUrl }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Function to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file upload
  const handleUploadClick = async () => {
    if (file) {
      const imageUrl = await handleUpload(file);
      if (imageUrl) {
        setUploadedImageUrl(imageUrl);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <div className="w-full h-full border-2 border-dashed p-4 bg-gray-100">
        {/* Display actual image */}
        <div className="mx-auto flex flex-col justify-center items-center">
          <div className="relative">
            <Image
              src={uploadIcon}
              alt="Upload Icon"
              className="mb-4"
              style={{ width: "20px", height: "20px" }}
            />
            <button
              className="absolute inset-0 w-full h-full bg-transparent"
              onClick={handleButtonClick}
            >
              {/* Invisible button covering the image */}
            </button>
          </div>
          <p className="mt-2 mb-2">Upload {fileName}</p>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {/* Display selected file or message */}
          {file ? <p>Selected File: {file.name}</p> : <p></p>}
          <button
           type="button" 
            onClick={handleUploadClick}
            className="bg-slate-900 text-white px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
