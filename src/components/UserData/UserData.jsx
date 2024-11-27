import React, { useState } from 'react';
import "./user.css";
import { getData } from '../../api/PostApi';
import { useEffect } from 'react';


const UserData = () => {
    const [data,setData] = useState([])
    const userData = async ()=>{
        const res = await getData();
        setData(res?.data);

    }
    useEffect(()=>{
        userData()
    },[])
  return (
    <div className='userWrapper'>
      {
        data?.map((val)=>{
            const {id,title,body}= val;
            return(
                <>
                <li key={id}>
                <span>{id}</span>
                <p>{title}</p>
                <p>{body}</p>
                <button>Edit</button>
                <button>Delete</button>
                </li>
                </>
            )
        })
      }
    </div>
  )
}

export default UserData
