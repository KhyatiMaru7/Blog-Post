// Loader.js
import React from 'react';
import Lottie from 'react-lottie-player';
import loaderAnimation from '../assets/Loading.json'; // Ensure this is correct

const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
      zIndex: 1000,
    }}>
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Loader;
