import React from 'react'
import { useNavigate, Link} from 'react-router-dom'

const NavBar = ({user}) => {
    const navigate = useNavigate()   

    const loggedinButtons = () => {
        return (
            <>                
                <div>
                    <Link className='nav-link' to='/clients'>Clients</Link>
                    <Link className='nav-link' to='/projects'>Projects</Link>
                    <Link className='nav-link' to='/employees'>Employees</Link>                       
                </div>
                <div>
                    <Link className='nav-link' to='/profile'>👤Profile</Link>
                    <Link className='nav-link' to='/logout' >Log Out</Link>                
                </div>
            </>
        )
    }

    const loggedOutButtons = () => {
        return (
            <>                             
                <Link className='nav-link' to='/login'>Log In</Link>
                <Link className='nav-link' to='/signup'>Create an account</Link>                 
            </>
        )
    }

    return (
        <header className='App-header'>
            <h2 className='App-logo' onClick={() => navigate('/')}>Project Tracker</h2>        
            {user ? loggedinButtons() : loggedOutButtons()}        
        </header>   
    )
}

export default NavBar;
