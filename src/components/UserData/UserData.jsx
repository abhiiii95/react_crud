import React, { useState } from 'react';
import "./user.css";
import { deleteData, getData, postData } from '../../api/PostApi';
import { useEffect } from 'react';


const UserData = () => {

    const [data,setData] = useState([])
    const [NData,setNData]= useState({
      title:'',
      body:""
    })
    const userData = async ()=>{
        const res = await getData();
        setData(res?.data);

    }
    useEffect(()=>{
        userData()
    },[])

const DeleteData=async(id)=>{

 const res=await deleteData(id)
 console.log("res: ",res);

 if(res.status===200){
  const newDataList= data.filter((val)=>{
    return val.id!==id
  })
 setData(newDataList)

 }
 
}

const handleInputChange =(e)=>{

  let {name,value}=e.target

  setNData((prev)=>{

    return {
      ...prev,
      [name]:value
    }
  })
}

const addData =async()=>{
  const dataNew = await postData(NData)
console.log("dataNew: ",dataNew);

  if(dataNew.status===201){
    setData([...data,dataNew.data])
    setNData({  title:'',body:""})
  }
}

const handleSubmitForm =(e)=>{
  console.log("data: ",data);
  
e.preventDefault()
addData()


}
  return (
    <>
    <form onSubmit={handleSubmitForm}>
      <input type="text"
      autoComplete='off'
      id='title'
      name='title'
      placeholder='Add Title'
      onChange={handleInputChange}
      value={NData.title}
      />
      <input type="text" 
      autoComplete='off'
      id='body'
      name='body'
      placeholder='Add Title'
      onChange={handleInputChange}
      value={NData.body}
      />
      <button>Add Data</button>
    </form>
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
                <button onClick={()=>DeleteData(id)}>Delete</button>
                </li>
                </>
            )
        })
      }
    </div>
    </>
   
  )
}

export default UserData
