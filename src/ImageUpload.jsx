import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [uniqueId, setUniqueId] = useState(1);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      const newImages = acceptedFiles.filter(file => file.type.startsWith('image/'));
      if (newImages.length < acceptedFiles.length) {
        alert('Only image files are supported.');
      }

      // Check for duplicate images
      const duplicateImages = newImages.filter(image => images.some(existingImage => existingImage.name === image.name && existingImage.size === image.size));
      if (duplicateImages.length > 0) {
        alert('Duplicate images detected. Please upload unique images.');
        return;
      }

      const imagePreviews = newImages.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      setImages(prevImages => [...prevImages, ...imagePreviews]);

      // Convert image information to JSON format
      const imageDataJson = newImages.map((image, index) => ({
        id: uniqueId + index,
        name: image.name,
        type: image.type,
        size: image.size,
        preview: image.preview
      }));
      setImageData(prevImageData => [...prevImageData, ...imageDataJson]);
      setUniqueId(uniqueId + newImages.length);
    }
  });

  const handleLogImageData = () => {
    if (imageData.length > 0) {
      const blob = new Blob([JSON.stringify(imageData, null, 2)], { type: 'application/json' });
      saveAs(blob, 'image_data.json');
    } else {
      alert('No images uploaded yet.');
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {
          isDragActive ? <p>Drop the image here ...</p> : <p>Click here to upload images</p>
        }
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <img key={index} src={image.preview} alt="Uploaded Image" />
        ))}
      </div>
      <button className = "json1" onClick={handleLogImageData}>Click here to download json file</button>
    </div>
  );
};

export default ImageUpload;
