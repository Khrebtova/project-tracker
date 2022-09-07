import './App.css';
import React, { useEffect, useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import ClientList from './pages/ClientList';
import ProjectList from './pages/ProjectList';
import NewProjectForm from './components/NewProjectForm';
import NewClientForm from './components/NewClientForm';
import NewEmployeeForm from './components/NewEmployeeForm';
import Logout from './pages/Logout';
import ShowFormButtons from './components/ShowFormButtons';
import ClientPage from './pages/ClientPage';
import EmployeePage from './pages/EmployeePage';
import UserProfile from './pages/UserProfile';

function App() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);  
  const [showForm, setShowForm] = useState(false);
  const [showFormClient, setShowFormClient] = useState(false);
  const [showFormEmployee, setShowFormEmployee] = useState(false);
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    document.title = 'Project Tracker';
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, []);

  useEffect(()=>{    
    fetch('/api/employees')    
    .then(r => r.json())
    .then(data => {      
      setEmployees(data)
      })
    .catch(err => setErrors([...errors, err]))

    fetch('/api/clients')
    .then(r => r.json())
    .then(data => {
      setClients(data)
      })
    .catch(err => setErrors([...errors, err]))  
  }, [user, projects, errors]) 

  useEffect(()=>{    
    fetch('/api/projects')
    .then(r => r.json())
    .then(data => {
      setProjects(data)})
    .catch(err => setErrors([...errors, err]))
  }, [user, errors])

  const deleteProject = (id) => {
    const newList = projects.filter(project => project.id !== id)
    setProjects(newList)
  }

  const updateProject = (updatedProject) => {
    const newList = projects.map(project => project.id === updatedProject.id ? updatedProject : project)
    setProjects(newList)
  }

  const addProject = (newProject) => {    
    const newList = [...projects, newProject]
    setProjects(newList)
  }

  const addClient = (newClient) => {    
    const newList = [...clients, newClient]
    setClients(newList)
  }

  const deleteClient = (id) => {
    const newList = clients.filter(client => client.id !== id)
    setClients(newList)
  }

  const addEmployee = (newEmployee) => {
    const newList = [...employees, newEmployee]
    setEmployees(newList)
  }

  const deleteEmployee = (id) => {
    const newList = employees.filter(employee => employee.id !== id)
    setEmployees(newList)
  }

  return (
    <div className="App">      
      <NavBar user={user} /> 
      {showFormClient ? <NewClientForm onSetShowFormClient={setShowFormClient} onAddClient={addClient}/> : null}
      {showFormEmployee? <NewEmployeeForm onSetShowFormEmployee={setShowFormEmployee} onAddEmployee={addEmployee}/> : null }  
      {showForm ? <NewProjectForm setShowForm = {setShowForm} clients={clients} employees={employees} onAddProject={addProject}/> : null}      
      {user ? <ShowFormButtons onSetShowForm={setShowForm} onSetShowFormClient={setShowFormClient} onSetShowFormEmployee={setShowFormEmployee}/> : null}
      {errors? errors.map(error => <p className='error' key={error}>{error}</p>) : null}
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={setUser} user={user}/>} />
        <Route path="/signup" element={<SignUpForm onLogin={setUser} user={user}/>} />
        <Route path="/logout" element={<Logout onLogout={setUser} />} />
        <Route path="/employees" element={<EmployeeList employees={employees} onDeleteEmployee={deleteEmployee} user={user}/>} />
        <Route path="/clients" element={<ClientList clients={clients} onDeleteClient={deleteClient} user={user}/>} />
        <Route path="/clients/:id" element={<ClientPage clients={clients} user={user}/>} />
        <Route path="/employees/:id" element={<EmployeePage employees={employees} user={user}/>} />
        <Route path="/projects" element={<ProjectList projects={projects} onUpdateProject={updateProject} onDeleteProject={deleteProject} clients={clients} employees={employees} user={user}/>} />          
        <Route path="/user" element={<UserProfile user={user}/>} />
        <Route path="/" element={<Home user={user} clients={clients} employees={employees} projects={projects}/>} />
      </Routes>      
    </div>
  );
}

export default App;
