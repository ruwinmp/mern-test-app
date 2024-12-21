import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='row'>
                <button type="button" className="nav-btn" onClick={() => navigate('/')}>Home</button>
                <button type="button" className="nav-btn" onClick={() => navigate('/user')}>User</button>
            </div>
        </>
    )
}

export default Navbar