// Section.js
import React from 'react';
import './section.css';
import { IconContext } from 'react-icons';
import { FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Section({ title, items }) {
    const navigate = useNavigate();

    const playItem = (item) => {
        if(item.type === 'track') {
            navigate('/', { state: { track: item } });
        } else if (item.type === 'album') {
            navigate('/', { state: { id: item.id, type: item.type } });
        } else if (item.type === 'playlist') {
            navigate('/', { state: { id: item.id, type: item.type } });
        }
    };
    return (
        <div className="section">
            <h2 className='section-title'>{title}</h2>
            <div className="section-row">
                {items.map(item => (
                    <div key={item.id} className="item" onClick={() => playItem(item)}>
                        <div className="item-fade">
                            <IconContext.Provider value={{ size: '40px', color: '#f95959' }}>
                                <FaPlayCircle />
                            </IconContext.Provider>
                        </div>
                        <img src={item.images ? item.images[0]?.url : item.album.images[0]?.url} alt={item.name} />
                        <p className='item-title'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;
