import React from 'react';
import '../styles/Splash.css'; 


const SplashPage = ({ onLogin, onSignup, onGuest }) => {  
  return (
    <div className="splash-container">
      <img src="/MorgueEscapeLogo.svg" alt="Morgue Escape Logo" className='logo' />
      <h1 className="title">Morgue Escape</h1>
      <div className="button-group">
        <button onClick={onLogin}>Login</button>
        <button onClick={onSignup}>Sign Up</button>
        <button onClick={onGuest}>Continue as Guest</button>
      </div>
    </div>
  );
};

export default SplashPage;