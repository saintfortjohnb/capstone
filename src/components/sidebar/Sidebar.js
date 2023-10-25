import React, { useEffect, useState } from 'react'
import './sidebar.css'
import SidebarButton from './SidebarButton'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { MdLibraryBooks, MdFavorite, MdOutlineFeed} from 'react-icons/md';
import apiClient from '../../Spotify';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [image, setImage] = useState("https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg");
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get('me').then(response => {
            setImage(response.data.images[1].url);
        })
    }, []);

    function logout() {
        window.localStorage.removeItem('token');
        navigate('/');
    }
  return (
    <div className='sidebar-container'>
        <img src={image} className='profile-image' alt='profile-pic' />
        <div>
            <SidebarButton title='Feed' to='/feed' icon={<MdOutlineFeed />} />
            <SidebarButton title='Search' to='/search' icon={<FaSearch />} />
            <SidebarButton title='Favorites' to='/favorites' icon={<MdFavorite />} />
            <SidebarButton title='Playlists' to='/' icon={<MdLibraryBooks />} />
        </div>
        <SidebarButton title='Logout' to='' icon={<FaSignOutAlt />} onClick={logout} />
    </div>
  )
}
