import React from 'react'

const Todo = ({todo, onDeleteTodo}) => {
  
  const handleDeleteTodo = () => {
    fetch(`/api/todos/${todo.id}`, {method: 'DELETE'})
    .then(res => {
        if (res.ok) {
            onDeleteTodo(todo.id)
        }else{
            res.json().then(data=>console.log(data.errors))
        }
    })
  }

    return (
    <li>
        {todo.description} <button onClick={handleDeleteTodo}>X</button>     
    </li>
  )
}

export default Todo