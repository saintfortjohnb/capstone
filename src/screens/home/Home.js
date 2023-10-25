import React, { useEffect, useState } from 'react'
import './home.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Playlists from '../library/Playlists'
import Feed from '../feed/Feed'
import Search from '../search/Search'
import Favorites from '../favorites/Favorites'
import Sidebar from '../../components/sidebar/Sidebar'
import Login from '../auth/Login'
import { setClientToken } from '../../Spotify'
import PlayerBar from '../../components/sidebar/PlayerBar'

export default function Home() {
  const [token, setToken] = useState('');

  const getTokenFromURL = () => {
    const hash = window.location.hash;
    window.location.hash = '/feed';
    const token = hash.split('&')[0].split('=')[1];
    return token;
  };

  useEffect(() => {
    let currentToken = window.localStorage.getItem('token') || getTokenFromURL();

    if (currentToken) {
        window.localStorage.setItem('token', currentToken);
        setToken(currentToken);
        setClientToken(currentToken);
    } else {
      window.location = '/feed';
    }
  }, []);

  return (!token ? <Login /> :
    <Router>
      <div className='main-body'>
        <Sidebar />
        <Routes>
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/search" element={<Search token={token} />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <div className='player-bar'>
          <PlayerBar token={token} />
        </div>
      </div>
    </Router>
  )
}
