import React, { useState } from "react";
import ImageSearch from "./ImageSearch";
import CanvasEditor from "./CanvasEditor";
import "./App.css"; // Add your custom styles

const App = () => {
  const [selectedImage, setSelectedImage] = useState("");

  console.log("test", selectedImage);
  return (
    <div className="app">
      <h1>Image Search and Editor</h1>
      {!selectedImage ? (
        <ImageSearch setSelectedImage={setSelectedImage} />
      ) : (
        <CanvasEditor imageUrl={selectedImage} />
      )}
    </div>
  );
};

export default App;
