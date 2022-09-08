import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = ({onLogout}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('/api/logout', {
            method: "DELETE"
        })
        .then(() => {            
                onLogout(null)
                navigate('/login')
            }
        )        
    }

  return (
    <div>
        <h2>Are you sure you want to log out? </h2>
        <button className='submit-button' onClick={handleLogout}>YES! Log out</button>
        <button className='submit-button' onClick={() => navigate('/')}>NO! Stay logged in</button>
    </div>
  )
}

export default Logout