import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const NewProjectForm = ({setShowForm, clients, employees, onAddProject}) => {
    
    const navigate = useNavigate()    
    const [name, setName] = useState('')
    const [clientId, setClientId] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [errors, setErrors] = useState([])
    
    const dropDownClients = () => {
        return clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)
    }
    
    const dropDownEmployees = () => {
        return employees.map(employee => <option key={employee.id} value={employee.id}>{employee.name}, {employee.title}</option>)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newProject = {
            name: name,
            client_id: clientId,
            employee_id: employeeId
        }
        fetch('/api/projects', {
            method: 'POST',
            headers: {'content-type': 'application/json', 'accept': 'application/json'},
            body: JSON.stringify(newProject)
        })
        .then(res => {
                if(res.ok) {
                    res.json().then(data => {
                        onAddProject(data)
                        setShowForm(false)
                        navigate('/projects')
                    })
                } else {
                    res.json().then(data => {
                        setErrors(data.errors)                        
                    })
                }
        })
        .catch(err => console.log(err))        
    }

  return (
      <div className='App-form'>
        <h3 className='App-logo'>New Project</h3>
        {errors? errors.map(error => <p className="error" key={error}>{error}</p>) : null}
        <form className='App-form-input' onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="projectname"
                autoComplete="off"
                value = {name}
                placeholder = "Project name"
                onChange = {(e) => setName(e.target.value)}
            />
            
            <select className='dropdown' onChange={(e) => setClientId(e.target.value)}>
                <option value="">Select a client</option>
                {dropDownClients()}
            </select>
            
            <select className='dropdown' onChange={(e) => setEmployeeId(e.target.value)}>
                <option value="">Select a employee</option>
                {dropDownEmployees()}
            </select>
            <button className="submit-button" type="submit">Submit</button>
            <button className="cancel-button" onClick={() => setShowForm(false)}>X</button>
        </form>
    </div>
  )
}

export default NewProjectForm