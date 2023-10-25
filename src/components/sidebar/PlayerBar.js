import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../../Spotify';
import SpotifyPlayer from 'react-spotify-web-playback'

export default function PlayerBar({token}) {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (location?.state?.tracks) {
      setTracks(location.state.tracks);
      setCurrentTrack(location.state.tracks[location.state.currentIndex]?.track);
      setCurrentIndex(location.state.currentIndex);
      setPlay(true);
    } 
    else if (location?.state?.track) {
      setTracks([location.state.track]);
      setCurrentTrack(location.state.track);
      setPlay(true);
    }
    else if (location?.state?.type === 'album') {
      apiClient.get(`albums/${location.state?.id}/tracks`)
      .then((res) => {
        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0]);
        setPlay(true);
      });
    }
    else if (location?.state?.type === 'playlist') {
      apiClient.get('playlists/' + location.state?.id +'/tracks')
      .then((res) => {
        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0].track);
        setPlay(true);
      });
    }
  }, [location.state])

  useEffect(() => {
    if (tracks[currentIndex]) {
        // If it's from a playlist, use .track, otherwise directly access the track
        setCurrentTrack(location.state?.type === 'playlist' ? tracks[currentIndex].track : tracks[currentIndex]);
        setPlay(true);
    }
  }, [currentIndex, tracks, location.state]);


  const handleNext = () => {
      if (currentIndex < tracks.length - 1) {
          setCurrentIndex(currentIndex + 1);
      } else {
          setCurrentIndex(0);
      }
      setPlay(true); // Ensure the song plays when we navigate to the next track
  };
    
  const handlePrev = () => {
      if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
      } else {
          setCurrentIndex(tracks.length - 1);
      }
      setPlay(true); // Ensure the song plays when we navigate to the previous track
  };

  return (
    <SpotifyPlayer
        getOAuthToken={cb => {cb(token)}}
        token={token}
        persistDeviceSelection
        components={{ rightButton: <button onClick={handleNext}>Next</button>,
                      leftButton: <button onClick={handlePrev}>Previous</button> }}
        showSaveIcon
        name='Echo'
        hideAttribution
        uris={play && currentTrack && currentTrack.id ? [`spotify:track:${currentTrack.id}`] : []}
        play={play}
        callback={state => {

          if (!state.isPlaying) setPlay(false);
        }}

        styles={{
          activeColor: '#fff',
          bgColor: '#233142',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#f95959',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
    />
  )
}
