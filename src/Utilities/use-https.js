import React, {useState} from 'react'

const useHttps = () => {
    let [errorMessage, setErrorMessage] = useState(null)

    function sendHttprequest(url, method, body, action){
        fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : null
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Something went wrong. Please try again")
            }
           let data = response.json();
           action(data)
        })
       .catch((error) => {
        setErrorMessage(error.message)
       })
    }
  
    return [errorMessage, sendHttprequest]
  
}

export default useHttps