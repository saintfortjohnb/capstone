import React from 'react'
import './artistSearchResult.css'

export default function ArtistSearchResult({ artist }) {
  return (
    <div className='artist-info'
        style={{cursor: 'pointer'}}>
        <img className='artist-image' src={artist.albumUrl} alt='artist-art'/>
        <div>
            <div className='artist-title'>{artist.title}</div>
        </div>
    </div>
  )
}
