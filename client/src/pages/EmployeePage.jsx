import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'

const EmployeePage = ({user}) => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    fetch(`/api/employees/${id}`)
    .then(res =>{
      if (res.ok) {
    res.json().then(data=>setEmployee(data))
    }else{
      res.json().then(data=>console.log(data.errors))
    }
  })
  }, [id])

  if (!user){
    navigate('/login')
  }

  if (!employee) {
    return <div>Loading...</div>
  }

  return (
    <div>      
      <h1>{employee.name}</h1>
      <h3>{employee.title}</h3>
      <h4>works with:</h4>
      {employee.clients.map(client => <li id={client.id} key={client.id} onClick={()=>navigate(`/clients/`+ client.id)}>{client.name}</li>)}
      <h4>project list: </h4>
      {employee.projects.map(project => <li id={project.id} key={project.id}>{project.name}</li>)}
    </div>
  )
}

export default EmployeePage