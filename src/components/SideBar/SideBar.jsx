import React, { useContext, useState } from 'react';
import './SideBar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img
                    onClick={() => setExtended(!extended)}
                    className='menu'
                    src={assets.menu_icon}
                    alt="Toggle Menu"
                />
                

                {extended && (
                    <div className="nav-buttons">
                        <Link to="/" className="nav-button">
                            Home
                        </Link>
                        <Link to="/infocollect" className="nav-button">
                            Add Data
                        </Link>
                        <Link to="/bot" className="nav-button">
                            Bot
                        </Link>
                        <Link to="/conversation" className="nav-button">
                            Conversation
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SideBar;
