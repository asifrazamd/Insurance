import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ImageGrid from './ImageGrid';

const App = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = uploadedImages => {
    setImages(uploadedImages);
  };

  return (
    <div>
      <ImageUpload onImageUpload={handleImageUpload} />
      <ImageGrid images={images} />
    </div>
  );
};

export default App;
