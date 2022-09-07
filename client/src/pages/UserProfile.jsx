import React, { useState} from 'react'

import Todo from '../components/Todo'

const UserProfile = ({user}) => {
    const [newTodo, setNewToDo] = useState('')    
    const [todos, setTodos] = useState(user.todos)
    const [errors, setErrors] = useState([])

    const handleSubmit =(e)=>{
        e.preventDefault()
        fetch('/api/todos', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                description: newTodo,
                user_id: user.id
            })
        })
        .then(res =>{
            if (res.ok){
                res.json().then(data=>setTodos([...todos, data]))
            }else{
                res.json().then(err=>setErrors([...errors, err.errors]))
            }
        })
        setNewToDo('')
    }
    
    const handleDeleteTodo=(id)=>{
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div>
            <h1>{user.first_name} {user.last_name}</h1> 
            <h2> Title: {user.title}</h2>
            <h3>Your To do list: </h3>
           {todos.map(todo => <Todo key ={todo.id} todo={todo} onDeleteTodo={handleDeleteTodo}/>)}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add a todo" onChange={(e)=>setNewToDo(e.target.value) } value={newTodo}/>
                <button type="submit">Add</button>
            </form>
            {errors ? errors.map(error => <p className='error'>{error}</p>): null}
        </div>
    )
}

export default UserProfile