
import { Navbar } from "./Navbar";

import Lottie from 'react-lottie-player'
import lottieJson from '../assets/error.json'

export default function NotFound() {
  
  return (
    <>
      <Navbar />
     
      <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 500, height: 400, 
       }}
    />
     </>
  );
}
