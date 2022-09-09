import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const NewEmployeeForm = ({onSetShowFormEmployee, onAddEmployee}) => {
    const navigate = useNavigate()    
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const newEmployee = {
            name: name,
            title: title
        }        
        fetch('/api/employees', {
            method: 'POST',
            headers: {'content-type': 'application/json', 'accept': 'application/json'},
            body: JSON.stringify(newEmployee)
        })
        .then(res => {
            if(res.ok) {
                res.json().then(data => {
                    onAddEmployee(data)
                    onSetShowFormEmployee(false)
                    navigate('/employees')
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
        <h3 className='App-logo'>New employee</h3>
        {errors? errors.map(error => <p className="error" key={error}>{error}</p>) : null}
        <form className='App-form-input' onSubmit={handleSubmit}>
            <input 
                id='employeename'
                type="text"             
                autoComplete="off"
                value = {name}
                placeholder = "New employee name"
                onChange = {(e) => setName(e.target.value)}
            />
            <input
                id='employeetitle' 
                type="text"             
                autoComplete="off"
                value = {title}
                placeholder = "New employee title"
                onChange = {(e) => setTitle(e.target.value)}
            />                
            <button className="submit-button" type="submit">Submit</button>
            <button className="cancel-button" onClick={() => onSetShowFormEmployee(false)}>X</button>
        </form>
    </div>
  )
}

export default NewEmployeeForm