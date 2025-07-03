import React, { useState } from "react";
import "./ImageFilter.css"; // Import the CSS file for styling

const images = [
  {
    src: "/Thalia at sunrise.webp",
    alt: "Runner in the city",
    tags: ["runner", "athlete", "outdoor"]
  },
  {
    src: "/Dumbo.webp",
    alt: "Bridge portrait",
    tags: ["bridge", "landscape"]
  },
  {
    src: "/Ground Zero Anniversary.webp",
    alt: "skyline",
    tags: ["skyline", "landscape", "NYC", "911"]
  },
  {
    src: "/Worldfair.webp",
    alt: "art piece",
    tags: ["art", "installation", "world", "NYC", "globe"]
  },
  {
    src: "/Worldsfair 2.webp",
    alt: "statue portrait",
    tags: ["statue", "landscape", "NYC", "art", "plane"]
  },
  
  // ...more images
];

export default function ImageFilter() {
  const [query, setQuery] = useState("");
  const filteredImages = images.filter(img =>
    img.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="image-filter-container">
      <input
        type="text"
        placeholder="Type a tag (e.g., runner, art, bridge...)"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "100%",
          marginTop: "2rem"
        }}
      />
      <div className="gallery">
        {query === "" ? (
          <p style={{ color: "#888" }}>Enter a tag to see images.</p>
        ) : filteredImages.length === 0 ? (
          <p>No images found.</p>
        ) : (
          filteredImages.map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} loading="lazy" className="gallery-img" />
          ))
        )}
      </div>
    </div>
  );
}
