import React from 'react';
// import NavBar from './navbar';

export default function Static(props) {
  const trackPic = {
    backgroundImage: "url('/images/track.webp')",
    minHeight: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10% 50%'
  };
  return (
    <div style={trackPic}>
      { props.children }
    </div>
  );
}
