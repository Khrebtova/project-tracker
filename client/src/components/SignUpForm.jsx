import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpForm = ({onLogin}) => {
  const navigate = useNavigate()

  const defaultData = {
        "username": '',
        "password": '',
        "passwordConfirmation": '',
        "firstName": '',
        "lastName": '',
        "title": '',
    }
    const [newUser, setNewUser] = useState(defaultData)
    
    const handleChange = (e) => {
        let key = e.target.id
        let value = e.target.value
        let formData = {...newUser, [key]: value}        
        setNewUser(formData)}
    
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newUser.username,
            password: newUser.password,
            password_confirmation: newUser.passwordConfirmation,
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            title: newUser.title,
          }),
        }).then((r) => { 
          setIsLoading(false);          
          if (r.created) {
            r.json().then((user) => {
              navigate('/')
              onLogin(user)});
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
    
  return (
    <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Create new account</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={newUser.username}
        
        onChange={handleChange}
        />      
      
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={newUser.password}        
          onChange={handleChange}
          autoComplete="current-password"
        />
      
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={newUser.passwordConfirmation}
          onChange={handleChange}        
          autoComplete="current-password"
        />
      
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={newUser.firstName}
          onChange={handleChange}
          
        />
      
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={newUser.lastName}
          onChange={handleChange}
        
        />
     
        <label htmlFor="title">Your title</label>
        <input 
          type="text"         
          id="title"
          value={newUser.title}
          onChange={handleChange}
          
        />     
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>     
        <h3>Or login to your account</h3>
        <button onClick={()=>navigate('/login')}>Login</button>
        {errors ? errors.map((err) => (<p className='error' key={err}>{err}</p>)) : null}
      
    </form>

  )
}

export default SignUpForm