import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'

const ClientPage = ({user, clients}) => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  
  useEffect(() => {
    setClient(clients.find(client => client.id === parseInt(id)))
  }, [id, clients])

  if (!user){
    navigate('/login')
  }

  if (!client) {
    return <div>Loading...</div>
  }

  return (
    <div>           
        <h1>{client.name}</h1>
        <h4>Works with: </h4>
        {client.employees.map(employee => <li id={employee.id} key={employee.id} onClick={()=>navigate(`/employees/`+ employee.id)}>{employee.name}, {employee.title}</li>)}
        <h4>Project list: </h4>
        {client.projects.map(project => <li id={project.id} key={project.id}>{project.name}</li>)}
    </div>
  )
}

export default ClientPage