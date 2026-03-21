import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      id="hero-header"
      className="relative text-white text-center flex flex-col justify-center items-center h-[50vh] md:h-[60vh] overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 w-full h-full">
        <img
          src="https://raw.githubusercontent.com/manuarias/correla_voz_repository/refs/heads/main/assets/heroImg.jpg"
          alt=""
          className="w-full h-full object-cover animate-kenburns"
        />
      </div>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl mb-4 animate-murga-glow">
          Correla Voz
        </h1>
        <p className="text-base md:text-lg max-w-3xl mx-auto animate-text-enter-delay" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}>
          El fuego del carnaval vivo. 11 años de alegría y arte, llevando crítica, alegría y abrazo comunitario a todes. Hacemos que se prendan los bombos, el baile y la garganta para decir lo que otros callan. Somos la chispa que enciende la calle.
        </p>
      </div>
    </header>
  );
};

export default Header;
