import React, { useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { NavLink, useParams } from 'react-router-dom'
import WordyAdd from './WordyAdd'
import { getAllWords, getWordy } from '../../api/api'

export const WordyEdit = () => {
  const { id } = useParams()
  const[data,setData]=useState({})

  useEffect(()=>{
     getWordy(id).then(data=>setData(data))
  },[])

  return (
    <div className='container bg-gradient-to-b from-slate-300 to-slate-400 rounded-lg py-3 my-4'>
        <div className='float-right'>
            <NavLink  to="/wordy">
            <button className=''><FaWindowClose color='red' size={25}/></button>
            </NavLink>
            </div>
            <div className='mx-auto p-2  text-xl font-bold select-none bg-gradient-to-tr from-gray-200 rounded-md to-lime-700 w-fit'>Wordy Edit</div>
            <WordyAdd editData={data}/>
    </div>
  )
}
