import React, { useEffect } from 'react';

const ImageGrid = ({ images }) => {
  useEffect(() => {
    console.log('Images:', images);
  }, [images]);

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.preview} alt="Uploaded Image" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
