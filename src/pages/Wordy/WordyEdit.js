import React, { useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { NavLink, useParams } from 'react-router-dom'
import WordyAdd from './WordyAdd'
import { getAllWords, getWordy } from '../../api/api'

export const WordyEdit = () => {
  const { id } = useParams()
  const [data, setData] = useState({})

  useEffect(() => {
    getWordy(id).then((data) => setData(data))
  }, [])

  return (
    <div className="container bg-gradient-to-b from-slate-300 to-slate-400 rounded-lg py-3 my-4">
      <WordyAdd editData={data} />
    </div>
  )
}
