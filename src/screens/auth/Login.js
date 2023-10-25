import React, { useEffect, useState } from 'react'
import './login.css'
import { loginEndoint } from '../../Spotify'

export default function Login() {
  // State to capture any error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check the URL for any error messages after a redirect from Spotify's login
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error_description');
    
    if (errorMessage) {
      setError(errorMessage);
    }
  }, []);

  return (
    <div className='login-page'>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' 
          alt='logo-spotify' 
          className='logo' 
        />
        <a href={loginEndoint}>
          <div className='login-btn'>LOG IN</div>
        </a>
        {error && <div className="error-message">{error}</div>}
    </div>
  )
}
