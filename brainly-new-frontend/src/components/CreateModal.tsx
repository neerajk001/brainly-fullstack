import React, { useState } from 'react';
import Input from './Input';
import { X } from 'lucide-react';
import { BACKEND_URL } from '../config';
import axios from 'axios';

function CreateModal({ isOpenModal, setIsOpenModal }) {
    const [link ,setLink] = useState("")
    const [title,setTitle] =useState("")
    const [type,setType] =useState("youtube")

const handleSubmit =async()=>{
   
     await axios.post(BACKEND_URL+'/api/v1/content',{
        link,
        type,
        title
    },{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
    }
)
alert("content added")
setIsOpenModal(false)

}

    return (<div>
        {isOpenModal && <div
            className="fixed inset-0 bg-gray-800 opacity-95 z-50 pointer-events-auto w-full p-2"
        // Close modal when clicking outside
        >
            {/* Modal Content */}
            <div
                className="w-96 h-96 bg-white p-4 m-auto rounded-md shadow-lg pointer-events-auto mt-12  "
            // Prevent closing when clicking inside
            >
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold text-center">Add Content</h2>
                    <X  className ='cursor-pointer bg-red-500 p-0.5 rounded text-white 'onClick={()=>setIsOpenModal(false)}/>
                    </div>
                <h2 className='text-black font-semibold p-2'>url</h2>
                <input type="text"
                value={link}
                onChange={(e)=>setLink(e.target.value)}
                 placeholder='enter your url'
                  className='bg-transparent w-full border px-1 py-1.5 rounded-md ' />
                <h2 className='text-black font-semibold p-2'>content type</h2>
                {/* <input type="text" placeholder='enter your url' className='bg-transparent w-full border px-1 py-1.5 rounded-md ' /> */}
                <div className='border py-1.5 flex justify-between px-1 opacity-65 rounded'>    <label  >choose a content type</label>
                    <div >
                        <select 
                        value={type}
                        onChange={(e)=>setType(e.target.value)}
                        className='text-center font-mono border-none cursor-pointer' >
                            <option value="youtube">youtube</option>
                            <option value="instagram">instagram</option>
                            <option value="twitter">twitter</option>
                            <option value="images">images</option>
                            <option value="documents">documents</option>
                        </select></div>
                </div>

                <h2 className='text-black font-semibold p-2'>title</h2>
                <input 
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                 placeholder='Enter the title'
                  className='bg-transparent w-full border px-1 py-1.5 rounded-md ' />
                <div className='flex justify-center items-center mt-8'><button 
                onClick={handleSubmit}
                className='bg-blue-800  rounded-lg px-2 py-1.5 w-full cursor-pointer'>submit</button></div>
            </div>
        </div>}
    </div>
    );
}

export default CreateModal;
