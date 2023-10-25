import React, { useState, useEffect } from 'react';
import './feed.css';
import apiClient from '../../Spotify';
import Section from './Section';

export default function Feed() {
    const [newReleases, setNewReleases] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
    const [savedAlbums, setSavedAlbums] = useState([]);

    useEffect(() => {
        // Fetch new releases
      apiClient.get('browse/new-releases?limit=50').then(response => {
        setNewReleases(response.data.albums.items.map(item => ({ ...item, type: 'album' })));
      });

        // Fetch user's top tracks
      apiClient.get('me/top/tracks?limit=50').then(response => {
        setTopTracks(response.data.items.map(item => ({ ...item, type: 'track' })));
      });

        // Fetch featured playlists
      apiClient.get('browse/featured-playlists?limit=50').then(response => {
        setFeaturedPlaylists(response.data.playlists.items.map(item => ({ ...item, type:'playlist' })));
      });

      apiClient.get('me/albums?limit=50').then(response => {
        setSavedAlbums(response.data.items.map(item => ({ ...item.album, type:'album' }))); 
      })

    }, []);

    return (
        <div className='screen-container'>
            <Section title="New Releases" items={newReleases} />
            <Section title="Featured Playlists" items={featuredPlaylists} />
            <Section title="Your Top Tracks" items={topTracks} />
            <Section title="Your Saved Albums" items={savedAlbums} />
        </div>
    );
}