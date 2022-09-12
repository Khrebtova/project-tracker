import React  from 'react'
import {useNavigate} from 'react-router-dom'

const Home = ({user, clients, employees, projects}) => {
  const navigate = useNavigate()
  
  if (!user) {
    return(
      <h3><a href='/login'>Please login</a></h3>
    )
  }

  return (
    <div>        
      <h2>Welcome {user.first_name} {user.last_name}! You have:</h2>
      <h4 onClick={()=>navigate('/employees')}>{employees.length} employees</h4>
      <h4 onClick={()=>navigate('/clients')}>{clients.length} clients</h4>
      <h4 onClick={()=>navigate('/projects')}>{projects.length} projects</h4>
      <h4 onClick={()=>navigate('/profile')}>{user.todos.length} items in your todo list</h4>          
    </div>
  )
}

export default Home