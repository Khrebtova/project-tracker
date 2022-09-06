import React from 'react'

const ShowFormButtons = ({onSetShowForm, onSetShowFormClient, onSetShowFormEmployee}) => {
  return (
    <div className='App-show-form-buttons'>
        <button onClick={()=> onSetShowFormClient(true)} className="show-form-button">Add new client</button>
        <button onClick={()=> onSetShowForm(true)} className="show-form-button">Add new project</button>
        <button onClick={()=>onSetShowFormEmployee(true)} className="show-form-button">Add new employee</button>        
    </div>
  )
}

export default ShowFormButtons