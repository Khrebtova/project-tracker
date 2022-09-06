import React from 'react'
import { useNavigate, Link} from 'react-router-dom'

const NavBar = ({user}) => {
    const navigate = useNavigate()   

    const loggedinButtons = () => {
        return (
            <>                
                <div style={{justifySelf: 'center', marginRight: '100px'}}>
                    <Link style={{color: "white", marginLeft: '20px', marginRight: '20px'}} to='/clients'>Clients</Link>
                    <Link style={{color: "white", marginLeft: '20px', marginRight: '20px'}} to='/projects'>Projects</Link>
                    <Link style={{color: "white", marginLeft: '20px', marginRight: '20px'}} to='/employees'>Employees</Link>                       
                </div>
                <Link style={{color: "white", marginLeft: '20px' }} to='/user'>👤Profile</Link>
                <Link style={{color: "white", marginRight: '20px'}} to='/logout' >Log Out</Link>                
            </>
        )
    }

    const loggedOutButtons = () => {
        return (
            <>                             
                <Link style={{color: "white"}} to='/login'>Log In</Link>
                <Link style={{color: "white"}} to='/signup'>Create an account</Link>                 
            </>
        )
    }

    return (
        <header className='App-header'>
            <h3 className='App-logo' onClick={() => navigate('/')}>Project Tracker</h3>        
            {user ? loggedinButtons() : loggedOutButtons()}        
        </header>   
    )
}

export default NavBar;
