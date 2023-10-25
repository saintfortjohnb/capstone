import React, { useState, useEffect } from 'react';
import './search.css'
import apiClient from '../../Spotify';
import TrackSearchResult from './TrackSearchResult';
import { useNavigate } from 'react-router-dom';
import AlbumSearchResult from './AlbumSearchResult';
import ArtistSearchResult from './ArtistSearchResult';

export default function Search({token}) {
    const [search, setSearch] = useState('');
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const navigate= useNavigate();

    function chooseTrack(track) {
        navigate('/search', {state: { track } });
    }

    function chooseAlbum(album) {
        navigate('/search', { state: { id: album.id, type: 'album' } });
    }

    function transformTrack(track) {
        const largestTrackImage = track.album.images.reduce(
            (largest, image) => {
                if (image.height > largest.height) return image;
                return largest;
            },
            track.album.images[0]
        );

        return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: largestTrackImage.url,
            id: track.id,
        };
    }

    function transformAlbum(album) {
        const largestAlbumImage = album.images.reduce(
            (largest, image) => {
                if (image.height > largest.height) return image;
                return largest;
            },
            album.images[0]
        );

        return {
            artist: album.artists[0].name,
            title: album.name,
            uri: album.uri,
            albumUrl: largestAlbumImage.url,
            id: album.id,
        };
    }

    function transformArtist(artist) {
        if (!artist || !Array.isArray(artist.images) || artist.images.length === 0) {
            console.error();
            return null;
        }
    
        const largestArtistImage = artist.images.reduce(
            (largest, image) => {
                if (image && typeof image.height === 'number' && image.height > largest.height) return image;
                return largest;
            },
            artist.images[0]
        );
    
        if (!largestArtistImage || !largestArtistImage.url) {
            console.error("Invalid image data:", largestArtistImage);
            return null;
        }
    
        return {
            title: artist.name,
            id: artist.id,
            albumUrl: largestArtistImage.url,
            uri: artist.uri,
        }
    }    

    useEffect(() => {

        function fetchTracks(search) {
            apiClient.get(`search?q=${search}&type=track`)
                .then(response => {
                    setTracks(response.data.tracks.items.map(transformTrack).filter(Boolean));
                })
                .catch(err => {
                    console.error(err);
                });
        }
        
        function fetchArtists(search) {
            apiClient.get(`search?q=${search}&type=artist`)
                .then(response => {
                    setArtists(response.data.artists.items.map(transformArtist).filter(Boolean));
                })
                .catch(err => {
                    console.error(err);
                });
        }
    
        function fetchAlbums(search) {
            apiClient.get(`search?q=${search}&type=album`)
                .then(response => {
                    setAlbums(response.data.albums.items.map(transformAlbum).filter(Boolean));
                })
                .catch(err => {
                    console.error(err);
                });
        }

        if (!search) {
            setTracks([]);
            setAlbums([]);
            setArtists([]);
            return;
        }
    
        if (!token) return;
    
        fetchTracks(search);
        fetchAlbums(search);
        fetchArtists(search);
    
    }, [search, token]);

    return (
        <div className='screen-container'>
            <input 
                className='search-bar flex'
                type="search" 
                placeholder="Search Songs/Artists" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
            />
            <div className='results-container flex'>
                <div className='left-container'>
                    {tracks && tracks.length > 0 && (
                        <div className='track-results'>
                            <h3>Tracks</h3>
                            {tracks.map(track => (
                                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                            ))}
                        </div>
                    )}
                </div>
                <div className='right-container'>
                    {artists && artists.length > 0 && (
                        <div className='artist-results'>
                            <h3>Artists</h3>
                            {artists.map(artist => (
                                <ArtistSearchResult artist={artist} key={artist.uri} />
                            ))}
                        </div>
                    )}
                    {albums && albums.length > 0 && (
                        <div className='album-results'>
                            <h3>Albums</h3>
                            {albums.map(album => (
                                <AlbumSearchResult album={album} key={album.uri} chooseAlbum={chooseAlbum} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
