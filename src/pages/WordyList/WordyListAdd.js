import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { NavLink, useParams } from 'react-router-dom'
import { UserContext } from '../User/UserContext'
import { createWordyList, getWordy } from '../../api/api'
import showToast from '../../alert/ShowToast'

export const WordyListAdd = () => {
  const { id } = useParams()
  const [size, setSize] = useState(0)
  const [data, setData] = useState({})

  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState({
    name: '',
    wordies: [],
  })

  const getData = useCallback(() => {
    if (id) {
      getWordy(id).then((res) => {
        setFormData({
          name: '',
          wordies: [res],
        })
        setData(res)
      })
      setSize(formData?.wordies?.length)
    } else {
      setFormData({
        name: '',
        wordies: [],
      })
    }
  })

  useEffect(() => {
    getData()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      createWordyList(user?._id, formData).then((response) => {
        if (response?.status === 201) {
          showToast('Wordy added successfully', 'success')
          setFormData({
            name: '',
            wordies: [],
          })
        } else {
          showToast('Failed to add wordy', 'error')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="py-2 mb-5 container rounded-md bg-gradient-to-b from-gray-400 to-indigo-200">
      <div className="float-right">
        <NavLink to="/wordylist">
          <button className="">
            <FaWindowClose color="red" size={25} />
          </button>
        </NavLink>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-4/6 mx-auto bg-gray-500 py-3 rounded-3xl my-2">
          <div className="mx-auto grid grid-flow-row gap-y-3 px-3">
            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {/* <div className="grid grid-flow-col"> 
              <input
                type="text"
                disabled
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={id? (data?.english + ' - ' + data?.turkish):""}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-flow-col">
              <button
                type="text"
                disabled
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
              >
                {size}
              </button>
            </div>
              */}

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-gray-700 text-lg hover:scale-95 hover:bg-amber-500 text-white font-bold py-
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
