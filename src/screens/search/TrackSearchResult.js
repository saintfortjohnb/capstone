import React from 'react'
import './trackSearchResult.css'

export default function TrackSearchResult({ track, chooseTrack }) {

    function handlePlay() {
        chooseTrack(track)
    }

  return (
    <div className='search-info'
        style={{cursor: 'pointer'}}
        onClick={handlePlay}>
        <img className='search-image' src={track.albumUrl} alt='album-art'/>
        <div>
            <div className='search-title'>{track.title}</div>
            <div className='search-artist'>{track.artist}</div>
        </div>
    </div>
  )
}

