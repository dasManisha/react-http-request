import React, { useState } from 'react'
import axios from "axios"


const url = "https://course-api.com/axios-tutorial-post";

const Practice = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")


const handleSubmit = async(e) => {
e.preventDefault()

try{
    const resp = await axios.post(url, {name:name, email:email})
    console.log(resp.data)
}
catch(error){
    console.log(error.message)
}
}
  return (
   <div>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='name'>Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div>
            <label htmlFor='email'>email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <button onSubmit={handleSubmit}>Submit</button>
    </form>
   </div>
  )
}

export default Practice