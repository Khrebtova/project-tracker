import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Client = ({client, onDeleteClient}) => {
  const [showProjects, setShowProjects] = useState(false)
  const listOfProjects = client.projects.map(project => project.completed ? <li key={project.id}>{project.name}, COMPLETED</li> : <li key={project.id}>{project.name}, IN PROGRESS</li>)

  const navigate = useNavigate()
  
  const handleDelete = () =>{    
    fetch(`/api/clients/${client.id}`, {method: 'DELETE'})
    .then(res => {
      if(res.ok) {
        onDeleteClient(client.id)
      }else{
        console.log('error: ', res.errors)
      }
    })  
  }

  const handleShowClient =() => {    
    navigate('/clients/' + client.id)
  }
  
  return (
    <div  onClick={()=>{setShowProjects(!showProjects)}} className='clientCard'>    
      <h3>{client.name}</h3>
      {client.projects.length === 1 ? <p> 1 project ↓</p> : <p>{client.projects.length} projects ↓</p>}
      {showProjects ? listOfProjects : null}
      {client.projects.length === 0 ? <button onClick={handleDelete}>Delete</button> : null}
      <button onClick={handleShowClient}>Go to Client page</button>      
    </div>
  )
}

export default Client