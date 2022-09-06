import React from 'react'
import Project from '../components/Project'

const ProjectList = ({clients, employees, projects, onDeleteProject, onUpdateProject}) => {
  const [filter, setFilter] = React.useState('all')
  
  let projectList;
  if (filter === 'all') {
    projectList = projects;
  }else if (filter === 'completed') {
    projectList = projects.filter(project => project.completed === true);
  }else{
    projectList = projects.filter(project => project.completed === false || project.completed === null)  ;  
  }

  const renderProjects = projectList.map(project => <Project key={project.id} project={project} clients={clients} employees={employees} onDeleteProject={onDeleteProject} onUpdateProject={onUpdateProject}/>)

  return (
    <div >
      <h2 >Project List </h2>
      <input type='radio' name='filter' value='all' onChange={e => setFilter(e.target.value)} checked={filter === 'all'} /> All
      <input type='radio' name='filter' value='completed' onChange={e => setFilter(e.target.value)} checked={filter === 'completed'} /> Completed
      <input type='radio' name='filter' value='inProgress' onChange={e => setFilter(e.target.value)} checked={filter === 'inProgress'} /> In Progress
      <div className='projectCardContainer'>
        {projects ? renderProjects : <p>No projects so far</p>}     
      </div>       
    </div>
  )
}

export default ProjectList;