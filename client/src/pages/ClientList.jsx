import React, {useState} from 'react'
import Client from '../components/Client'

const ClientList = ({clients, onDeleteClient, user}) => {
  const [search, setSearch] = useState('')
  
  let clientList = clients.filter(client => client.name.toLowerCase().includes(search))  
  const renderClients = clientList.map(client => <Client client={client} onDeleteClient={onDeleteClient} key={client.id}/>)

  if (!user) return <h3> <a href='/login'>Please login</a> </h3>

  return (
    <>
      <h2>Client List  <input type='text' placeholder=' 🔍 SEARCH' onChange={(e)=>setSearch(e.target.value.toLowerCase())}/></h2>
        <div className='clientCardContainer'>
        {clients ? renderClients : <p>Can't find clients</p>}      
      </div>
    </>
  )
}

export default ClientList