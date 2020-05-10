import React from "react";
import Angeli from '../assets/images/angeli.jpg';

const Hero = () => {
  return (
    <main>
   <div className="new-hero">
    <img src={Angeli} alt="a photo of Angeli"/>
    <h2><span>Angeli's Next Tattoo.</span></h2>
    </div>
    </main>
  );
};

export default Hero;
