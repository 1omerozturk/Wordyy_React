import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../User/UserContext'
import { getAllWordyList } from '../../api/api'
import { NavLink } from 'react-router-dom'

export const WordyList = () => {
  const [data, setData] = useState([])
  const { user } = useContext(UserContext)

  const loadData = useCallback(() => {
    console.log(user?._id)
    const userId = user?._id;
    const response = getAllWordyList(userId)
    response.then((data) => {
      setData(data)
    })
  })

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="text-center">
      <h1>Wordy List</h1>
        <NavLink to="/wordyListAdd">
      <div className="btn btn-outline-dark">
        New WordyList
        </div>
        </NavLink>
      {data &
      (
        <div className="grid grid-flow-col">
          <div className="text-center">div</div>
          <div className="text-center">div</div>
          <div className="text-center">div</div>
        </div>
      )}
    </div>
  )
}
