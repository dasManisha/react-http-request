import React, {useState, useEffect, useRef} from 'react'
import Task from './Task';
import useHttps from '../Utilities/use-https';
const CustomHooks = () => {
    let taskRef = useRef();
    let [allTasks, setAllTasks] = useState([])
    console.log(allTasks)
     let [errorMessage, setErrorMessage] = useState(null)


    let [error, sendRequest] = useHttps()
    let [errorPost, sendPostRequest] = useHttps()

    function getAllTasks(data){
        data.then((tasks) => {
            let taskList = [];

            for(let key in tasks){
                taskList.push({id: key, value: tasks[key]})
            }
            console.log(taskList)
            setAllTasks(taskList)
            // console.log(tasks)
        })
      
        setErrorMessage(error)
      }


    useEffect(() => {
        sendRequest('https://react-http-tutorial-2529c-default-rtdb.firebaseio.com/tasks.json', 'GET', null, getAllTasks)
    },[])

    //CREATE A NEW TASK
    function createTask(data){
        sendPostRequest('https://react-http-tutorial-2529c-default-rtdb.firebaseio.com/tasks.json', 'POST', taskRef.current.value, onCreateTask)
        sendRequest()


    //     fetch('https://react-http-tutorial-2529c-default-rtdb.firebaseio.com/tasks.json',{
    //         method: 'POST',
    //         body: JSON.stringify(taskRef.current.value)

    //     })
    //     .then((response) => {
    //         if(!response.ok){
    //             throw new Error("Something went wrong. Please try again")
    //         }
    //         // fetchTask();
    //     })
    //    .catch((error) => {
    //     setErrorMessage(error.message)
    //    })
    }

    // //FETCH ALL TASK
    // function fetchTask(){
    //     fetch('https://react-http-tutorial-2529c-default-rtdb.firebaseio.com/tasks.json')
           
    //     .then((response) => {
    //         if(!response.ok){
    //             throw new Error("Something went wrong. Please try again")
    //         }
    //         return response.json();
    //     })
    //    .then((data) => {
    //     let tasks = [];
    //     for(let key in data){
    //         tasks.push({id: key, value: data[key]})
    //     }
    //     setAllTasks(tasks)
    //     console.log(tasks)
    //    })
    //    .catch((error) => {
    //     setErrorMessage(error.message)
    //    })
    // }

    //DELETE ALL TASK
    function onDeleteTask(task){
        fetch('https://react-http-tutorial-2529c-default-rtdb.firebaseio.com/tasks/'+task.id+'.json',{
            method: 'DELETE'
        })
           
        .then((response) => {
            if(!response.ok){
                throw new Error("Something went wrong. Please try again")
            }
        //    fetchTask()
        })
       .then((data) => {
        let tasks = [];
        for(let key in data){
            tasks.push({id: key, value: data[key]})
        }
        setAllTasks(tasks)
        console.log(tasks)
       })
       .catch((error) => {
        setErrorMessage(error.message)
       })
    }

    function onCreateTask(data){
        data.then((d) => {
            console.log(d)
            onFetchTasks()
        })
    }

    function onFetchTasks() {
        sendRequest('https://react-http-tutorial-2529c-default-rtdb.firebaseio.com/tasks.json', 'GET', null, getAllTasks)   
    }

  return (
    <div>
    <div>
        <input type='text' ref={taskRef}/>
        <button className='btn btn-create' onClick={createTask}>create</button>
    </div>
    {!errorMessage && <Task tasks={allTasks} onDeleteTask={onDeleteTask}></Task>}
    {!errorMessage && <div><h3>{errorMessage}</h3></div>}
    </div>
  )
}

export default CustomHooks