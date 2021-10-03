import React from 'react';
import audiLogo from 'images/audiLogo-01.png';

const Sidebar = () => {
    return (
        <nav className='w-72 border'>
            <img src={audiLogo} alt="Audi brand" className='w-'/>
        </nav>
    );
};

export default Sidebar;
