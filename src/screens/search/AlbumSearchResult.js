import React from 'react'
import './albumSearchResult.css'

export default function AlbumSearchResult({ album, chooseAlbum }) {
    function handlePlayAlbum() {
        if (chooseAlbum) chooseAlbum(album);
    }

  return (
    <div className='album-info'
        onClick={handlePlayAlbum}
        style={{cursor: 'pointer'}}>
        <img className='album-image' src={album.albumUrl} alt='album-art'/>
        <div>
            <div className='album-title'>{album.title}</div>
            <div className='album-artist'>{album.artist}</div>
        </div>
    </div>
  )
}
