import React, { useEffect, useState } from 'react'
import './playlists.css'
import apiClient from '../../Spotify'
import { IconContext } from 'react-icons';
import { FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Playlists() {
  const [playlists, setPlaylists] = useState(null);
  
  useEffect(() => {
    apiClient.get('me/playlists').then(function(response) {
      setPlaylists(response.data.items);
    })
  }, [])

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate('/', {state: {id: id, type: 'playlist'} });
  }
    
  return (
    <div className='screen-container'>
      <div className='library-body'>
        {playlists?.map((playlist) => 
          <div className='playlist-card' key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
            <img src={playlist.images[0].url} className='playlist-image' alt='Playlist-Cover' />
            <div className='playlist-details'>
              <p className='playlist-title'>{playlist.name}</p>
              <p className='playlist-subtitle'>{playlist.tracks.total} Songs</p>
            </div>
            <div className='playlist-fade'>
              <IconContext.Provider value={{size: '50px', color: '#f95959' }}>
                <FaPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
