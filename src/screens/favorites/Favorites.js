import React, { useEffect, useState } from 'react';
import './favorites.css';
import apiClient from '../../Spotify';
import { FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';

export default function Favorites() {
    const [favoriteTracks, setFavoriteTracks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get('me/tracks?limit=50').then(response => {
            setFavoriteTracks(response.data.items);
        });
    }, []);

    const playTrack = (id) => {
        const index = favoriteTracks.findIndex(item => item.track.id === id);
        const tracks = favoriteTracks.map(item => item.track);
        navigate('/favorites', { state: { tracks: tracks, currentIndex: index } });
    };

    function formatDuration(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        // Format the output as MM:SS
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div className='screen-container'>
            <div className='favorites-body'>
                {favoriteTracks?.map((trackItem) => {
                    const track = trackItem.track;
                    return (
                        <div className='track-card' key={track.id} onClick={() => playTrack(track.id)}>
                            <img src={track.album.images[0]?.url} className='track-image' alt='Track-Cover' />
                            <div className='track-info'>
                                <div className='track-details'>
                                    <p className='track-title'>{track.name}</p>
                                    <p className='track-subtitle'>{track.artists[0]?.name}</p>
                                    
                                </div>

                                <p className='track-time'>{formatDuration(track?.duration_ms)}</p>
                            </div>   
                            <div className='track-fade'>
                              <IconContext.Provider value={{size: '50px', color: '#f95959' }}>
                                <FaPlayCircle />
                              </IconContext.Provider>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
