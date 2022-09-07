import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Employee = ({employee, onDeleteEmployee}) => {
  const [showProjects, setShowProjects] = useState(false)
  const [errors, setErrors] = useState([])
  const listOfProjects = employee.projects.map(project => project.completed ? <li key={project.id}>{project.name}, COMPLETED</li> : <li key={project.id}>{project.name}, IN PROGRESS</li>)
  const navigate = useNavigate()

  const handleDelete = () =>{
    fetch(`/api/employees/${employee.id}`, {method: 'DELETE'})
    .then(res => {
      if(res.ok) {
        onDeleteEmployee(employee.id)
      }else{
        res.json().then(err=> setErrors(...errors, err.errors))
      }
    }) 
  }

  const handleShowEmployee =() => {    
    navigate('/employees/' + employee.id)
  }

  return (
    <div onClick={()=>{setShowProjects(!showProjects)}} className='clientCard'>      
      <h4>{employee.name}, {employee.title}</h4>      
      {employee.projects.length === 1 ? <p> 1 project ↓</p> : <p>{employee.projects.length} projects ↓</p>}      
      {showProjects ? listOfProjects : null} 
      {employee.projects.length === 0 ? <button onClick={handleDelete}>Delete</button> : null} 
      <button onClick={handleShowEmployee}>Go to Employee page</button> 
      {errors ? errors.map(error => <p className='error' key={error}>{error}</p>): null}     
    </div>
  )
}

export default Employee