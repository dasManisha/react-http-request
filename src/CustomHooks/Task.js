import React from 'react'

const Task = ({tasks, onDeleteTask}) => {
  console.log("tasks :", tasks)
  return (
    <div>
    {tasks.map((item) => {
      const{id, value} = item
      return(
        
        <div key={id}>
         <h1>{value}</h1> 
         <button onClick={onDeleteTask}>Delete</button>
        </div>

        
      )
    })}
    </div>
    
  )
}

export default Task