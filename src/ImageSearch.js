import React, { useEffect, useState } from "react";
import axios from "axios";

const UNSPLASH_API_KEY = "ga8IsBpwAEmRh6o-dqreQJioUMNPdMD7Q3oav4K4ysU"; // Replace with your API key
const API_URL = "https://api.unsplash.com/search/photos";

const ImageSearch = ({ setSelectedImage }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { query, per_page: 10 },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        },
      });
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="user-details">
        <h3>Name : Ahishek</h3> <h3>Email :akey9009@gmail.com </h3>
      </div>

      {loading && <p>Loading...</p>}

      <div className="image-results grid-container">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image.urls.regular)}
          >
            <img src={image.urls.thumb} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
