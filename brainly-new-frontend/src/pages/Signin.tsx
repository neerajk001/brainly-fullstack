import React, { useRef,useEffect } from 'react'
import {motion} from 'framer-motion'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'
import axios from 'axios'

const Signin = () => {
  const navigate =useNavigate()
  const usernameRef =useRef<HTMLInputElement>(null)
  const passwordRef =useRef<HTMLInputElement>(null)

  const signinBackned =async()=>{
    const username =usernameRef.current?.value
    const password =passwordRef.current?.value

      const response = await axios.post(BACKEND_URL+'/api/v1/signin',{
        username,
        password
    })
    console.log('data',response)
    const jwt =response.data.token
    localStorage.setItem("token", jwt)
    navigate('/dashboard')
    alert('you have signed in')
  }
  
  useEffect(()=>{
      const savedusername =localStorage.getItem('username');
      const savedpassword =localStorage.getItem('password')
  
      if(usernameRef.current){
        usernameRef.current.value =savedusername || "";
        
      }
  
      if(passwordRef.current){
        passwordRef.current.value =savedpassword || "";  
      }
    },[])



 
  return (
  <div className='flex justify-center items-center h-screen bg-transparent'>
   <motion.div className=' text-white w-96 items-center text-center p-8 rounded-md shadow-lg border-transparent  overflow-hidden border-2 bg-black hover:scale-110 transition-all '
     initial={{ opacity: 0, y: 50,  }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, }}
     whileHover={{
      
      // scale: 1.05, // Scales the card slightly
          boxShadow: [
            "0px 0px 10px rgb(255, 0, 0)", // Red Shadow
            "0px 0px 20px rgb(0, 255, 0)", // Green Shadow
            "0px 0px 30px rgb(0, 0, 255)", // Blue Shadow
            "0px 0px 10px rgb(255, 0, 0)", // Back to Red Shadow
          ],
          transition: { duration: 2, repeat: Infinity },
       
     }}
   >
    <motion.div
     initial={{ opacity: 0, y: 50 }} 
     animate={{ opacity: 1, y: 0 }} 
     transition={{ duration: 0.5 }}
     className="flex flex-col space-y-4"
    >
      <h2 className='text-2xl font-semibold'>signin</h2>

      <motion.div
      initial={{opacity:0, x: -50}}
      animate={{opacity:1,x:0}}
      transition={{duration:0.5, delay:0.2}}
      >
        <Input reference={usernameRef}
        placeholder='enter your username'/>

      </motion.div>
      <motion.div
      initial={{opacity:0, x:50}}
      animate={{opacity:1,x:0,}}
      transition={{duration:0.5, delay:0.3}}
      >
        <Input reference={passwordRef}
        placeholder='enter your password'/>

      </motion.div>
      <motion.div
      initial={{opacity:0, y:-50}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.5, delay:0.4}}
      >
        <Button variant='primary' onClick={signinBackned} >signin</Button>

      </motion.div>

      

    </motion.div>

   </motion.div>

  </div>

  
  )
}

export default Signin