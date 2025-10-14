import React, { useEffect,useState } from 'react'
import Nav from "./Nav"
import api from '../api/axios';
import "./contact.css"

function Contact() {
  
  useEffect(() => {
  api.get("/wakeup");
});

    const [comment,SetComment]=useState("");
    const HandleChange=(e)=>(
        SetComment(e.target.value)
    );
    const handleSubmit=(e)=>(
         SetComment("")
    )
  return (
    <>
    <Nav/>
  
    <form onSubmit={handleSubmit}>
          <h4>Leave a comment 💬</h4>
        <textarea type="text" rows={10} cols={60} value={comment} placeholder='Type something...' onChange={HandleChange}/>
        <br></br><button > <svg fill="#f1f1f1" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M10.11 13.6501L13.69 10.0601"></path>
            </svg></button>
    </form>
    </>
  )
}

export default Contact

