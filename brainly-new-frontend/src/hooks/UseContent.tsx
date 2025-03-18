import axios from 'axios'


import  { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'

function UseContent() {
const[contents,setContents] =useState([])
 function refresh(){
     axios.get(BACKEND_URL+'/api/v1/content',{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
    })
    .then((response)=>{
        setContents(response.data.content)
    })
}
async function deleteContent(contentId:string) {
    try {
        await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
            headers: { "Authorization": localStorage.getItem("token") }
        });
        setContents(contents.filter(content => content._id !== contentId)); // ✅ Update state after deletion
    } catch (error) {
        console.error("Delete error:", error);
    }
}

useEffect(()=>{
    refresh()
   const interval = setInterval(() => {
        refresh()
    },10*1000);
    return() =>clearInterval(interval)
},[])

return[contents ,refresh,deleteContent]
console.log(contents)
}

export default UseContent

