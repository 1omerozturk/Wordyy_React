import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { getWordyListById, updateWordyListById } from '../../api/api'
import { UserContext } from '../User/UserContext'
import { FaWindowClose } from 'react-icons/fa'
import showToast from '../../alert/ShowToast'

export const WordyListEdit = () => {
  const { id } = useParams()
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const [wordyListData, setWordyListData] = useState({
    name: '',
    wordiesLength: 0,
  })
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id)
    }
  }, [user])

  useEffect(() => {
    const getData = () => {
      if (userId) {
        const response = getWordyListById(userId, id)
        response.then((res) => {
          setWordyListData({
            name: res.data.name,
            wordiesLength: res.data.wordies.length,
          })
        })
      } else {
        setWordyListData({
          name: '',
          wordiesLength: 0,
        })
      }
      setLoading(true)
    }
    getData()
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setWordyListData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateWordyListById(userId, id, wordyListData).then((res) => {
      if (res.status === 201) {
        showToast(`${res.data.name} updated succesfully`,'info')
        navigate('/wordylist')
      }
      else{
        showToast('Failed to update wordy list','error')
      }
    })
  }

  return (
    <div className="py-2 mt-2 mb-5 container rounded-md bg-gradient-to-t from-indigo-200 to-indigo-300">
      <div className="float-right">
        <NavLink to="/wordylist">
          <button className="">
            <FaWindowClose color="red" size={25} />
          </button>
        </NavLink>
      </div>
      {/* <div className="flex items-center justify-center my-5">
        <h1 className="text-5xl font-bold text-orange-700 ">Wordylist Edit</h1>
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="w-4/6 mx-auto bg-orange-400 py-3 rounded-3xl my-2 mt-4">
          <div className="mx-auto grid grid-flow-row gap-y-3 px-3">
            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={wordyListData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                name="wordiesLength"
                disabled
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                value={wordyListData.wordiesLength}
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-orange-600 text-lg hover:scale-95 hover:bg-orange-800 text-white font-bold py-
          2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
