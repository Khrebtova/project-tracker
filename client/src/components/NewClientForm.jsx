import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const NewClientForm = ({onSetShowFormClient, onAddClient}) => {
    const navigate = useNavigate()    
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newClient = {
            name: name
        }        
        fetch('/api/clients', {
            method: 'POST',
            headers: {'content-type': 'application/json', 'accept': 'application/json'},
            body: JSON.stringify(newClient)
        })
        .then(res => {
                if(res.ok) {
                    res.json().then(data => {
                        onAddClient(data)
                        onSetShowFormClient(false)
                        navigate('/clients')
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
        <h3 className='App-logo'>New Client</h3>
        <form className='App-form-input' onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="clientname"
                autoComplete="off"
                value = {name}
                placeholder = "Client name"
                onChange = {(e) => setName(e.target.value)}
            />
                
            {errors? errors.map(error => <p key={error}>{error}</p>) : null}
            <button className="submit-button" type="submit">Submit</button>
            <button className="cancel-button" onClick={() => onSetShowFormClient(false)}>X</button>
        </form>
    </div>
  )
}

export default NewClientForm

