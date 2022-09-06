import React, {useState} from 'react'

const Project = ({project, clients, employees, onDeleteProject, onUpdateProject}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(project.name)
  const [clientId, setClientId] = useState(project.client.id)
  const [employeeId, setEmployeeId] = useState(project.employee.id)
  const [completed, setCompleted] = useState(project.completed)
  const [errors, setErrors] = useState([])
  
  const handleDelete = () => {
    fetch(`/projects/${project.id}`, { method: 'DELETE' })
    .then((res)=> {if (res.ok){
      onDeleteProject(project.id)
    }})
  }

  const dropDownClients = () => {
    return clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)
  }
  const dropDownEmployees = () => {
      return employees.map(employee => <option key={employee.id} value={employee.id}>{employee.name}, {employee.title}</option>)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedProject = {
      name: name,
      client_id: clientId,
      employee_id: employeeId,
      completed: completed
    }
    fetch(`/api/projects/${project.id}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json','accept': 'application/json'},
      body: JSON.stringify(updatedProject)
    })
    .then(res => {
            if(res.ok) {
                res.json().then(data => {
                    onUpdateProject(data)
                    setIsEditing(false)                    
                })
            } else {
                res.json().then(data => setErrors(data.errors))
            }
    })
    .catch(err => console.log(err)) 
  }

  const editProject = () => {
    return(      
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            id="projectname"
            autoComplete="off"
            value = {name}
            placeholder = "Project name"
            onChange = {(e) => setName(e.target.value)}
            style={{width: '200px', margin: '5px'}}
        />        
        <select  
        value={clientId} 
        onChange={(e) => setClientId(e.target.value)}
        style={{width: '200px', margin: '5px'}}
        >
            <option value="">Select a client</option>
            {dropDownClients()}
        </select>        
        <select 
        value={employeeId} 
        onChange={(e) => setEmployeeId(e.target.value)}
        style={{width: '200px', margin: '5px'}}
        >
            <option value="">Select a employee</option>
            {dropDownEmployees()}
        </select>
        <label htmlFor='completed'>Completed</label>
        <input id='completed' type={'checkbox'} checked={completed} onChange={(e) => setCompleted(e.target.checked)}/>
        {errors? errors.map(error => <p key={error}>{error}</p>) : null}
        <button type="submit" style={{width: '200px', margin: '5px'}}>Save</button>
    </form>
    
    )
  }

  const showProject =()=>{
    return(
      <div>
        <div style={{backgroundColor: '#6a80adb0', fontSize: '20px'}}>
          {project.name.toUpperCase()}
        </div>        
        {project.completed ? <p style={{backgroundColor: 'white', color: "green", fontStyle: 'oblique'}}>COMPLETED!</p> : <p style={{backgroundColor: 'white',color: "red", fontStyle: 'oblique'}}>IN PROGRESS</p>}
        <div >
          Client: {project.client.name}
        </div>
        <div >
          Employee: {project.employee.name}, {project.employee.title}
        </div>
        <div>
          <button onClick={()=> {setIsEditing(!isEditing)}}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="projectCard">
      {isEditing ? editProject() : showProject()}
    </div>
  )
}

export default Project