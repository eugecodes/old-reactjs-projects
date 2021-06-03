
import React from 'react';
export const d = {
    photos: [
	{
		title: 'Photo #1',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1024px-Check_green_icon.svg.png'
	}, 
	{
		title: 'Photo #2',
		imgSrc: 'https://play-lh.googleusercontent.com/gd7vl3Bb-PPYSzae1LJSO3gsuhY5u6vlpbB2CPa-sC5MzWVZo9zo4Q1ImKbrbbDGtA'
	}
  ],
  fetchPhotos: () => {
    return Promise.resolve()
  }
};
export const PhotosContext = React.createContext(d);