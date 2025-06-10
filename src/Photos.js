import React from "react";
import "./Photos.css";

export default function Photos({ photos }) {
  if (!photos || photos.length === 0) return null;

  return (
    <section className="Photos">
      <h3 className="mb-3">Related Images</h3>
      <div className="row">
        {photos.map((photo, index) => (
          <div className="col-4 mb-3" key={photo.id || index}>
            <a
              href={photo.src.original}
              target="_blank"
              rel="noreferrer"
              className="d-block"
            >
              <img
                src={photo.src.landscape}
                alt={photo.alt || `Related image ${index + 1}`}
                className="img-fluid rounded shadow-sm"
                style={{ aspectRatio: "4/3", objectFit: "cover" }}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
