import React from 'react';
import EntryForm from './components/entryform';
import Static from './components/static';

export default class App extends React.Component {

  render() {
    const trackPic = {
      backgroundImage: "url('/images/track.webp')",
      height: '100vh',
      objectFit: 'fill',
      width: '100%',
      backgroundSize: '1100px',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      backgroundPosition: '0% 100%'
    };
    return (
      <div style={trackPic}>
        <Static />
        <EntryForm />
      </div>
    );
  }
}
