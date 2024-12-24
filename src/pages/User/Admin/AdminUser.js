import React, { useCallback, useEffect, useState } from 'react'
import { deleteUser, getAllUsers } from '../../../api/api'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { Spin } from '../../../components/Spinner/Spin'
import showToast from '../../../alert/ShowToast'
import { useNavigate } from 'react-router-dom'

const AdminUser = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [round, setRound] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const navigate = useNavigate()

  const getData = () => {
    getAllUsers()
      .then((res) => {
        setUsers(res)
        setAllUsers(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onChange = (select) => {
    setSelectedUser(select)
    if (selectedUser === select) {
      setRound(!round)
    } else if (selectedUser !== select) {
      setRound(false)
    }
  }

  const onDelete = (id) => {
    deleteUser(id).then((res) => {
      if (res.status === 200) {
        showToast(`${res.data}`, 'success')
        setUsers(users.filter((user) => user._id !== id))
      }
    })
  }

  const onEdit = (id) => {
    navigate(`/user/useredit/${id}`)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="text-center">
      <div className="text-2xl font-bold">Users</div>
      <div className="flex justify-center">
        <input
          type="search"
          placeholder="Search"
          className="w-1/2 p-2 my-2 border border-black rounded-md"
          onChange={(e) =>
            setUsers(
              allUsers.filter((user) => user.username.includes(e.target.value)),
            )
          }
        />
      </div>
      {loading ? (
        <Spin color={'danger'} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full items-center justify-between lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4 space-x-2 px-3 select-none">
          {users?.map((user) => (
            <div
              onClick={() => onChange(user)}
              className={`w-auto font-bold bg-slate-400 p-2 rounded-md font-serif text-lg ${
                selectedUser === user && !round
                  ? 'border border-black rounded-lg drop-shadow-xl shadow-black'
                  : ''
              }`}
            >
              <div className="" key={user._id}>
                {user.username}

                <div
                  className={`text-sm font-mono ${
                    selectedUser === user && !round ? '' : 'hidden'
                  }`}
                >
                  Role: <span className=" text-slate-200">{user.role}</span>
                </div>
                <div className="flex items-center justify-around my-4">
                  <FaTrash
                    onClick={() => onDelete(user._id)}
                    className="text-red-500 cursor-pointer hover:text-black"
                  />
                  <FaPencil
                    onClick={() => onEdit(user._id)}
                    className="text-lime-500 cursor-pointer hover:text-black"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminUser
