import React, { useContext } from 'react';
import { PhotosContext } from "./PhotosContext";
import { ThemeContext } from "./ThemeContext";
import './PhotoList.css';
// Use functional or class component based on your preference.
// Make it a default export.

export default function PhotosList(props) {
  const ctx = useContext(PhotosContext)
  const theme = useContext(ThemeContext)
  console.log(theme.dark);
  return (
      <ThemeContext.Provider value={theme.dark}>
		  <div id="photos-list-container" className="sdiv">
			  <ul id="photos-list">
				{ctx.photos.map((photo) => <li><h3 className="stitle">{photo.title}</h3><img className="simg" src={photo.imgSrc} /></li>)}
			  </ul>
			  <button onClick={ctx.fetchPhotos}>Fetch photos</button>
		  </div>
	  </ThemeContext.Provider>
  );
}