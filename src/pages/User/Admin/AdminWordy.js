import React, { useCallback, useEffect, useState } from 'react'
import { deleteWordy, getAllWords } from '../../../api/api'
import { FaAdjust, FaEdit, FaRemoveFormat, FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { Spin } from '../../../components/Spinner/Spin'
import showToast from '../../../alert/ShowToast'
import { Navigate, useNavigate } from 'react-router-dom'

const AdminWordy = () => {
  const [loading, setLoading] = useState(true)
  const [wordies, setWordies] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [round, setRound] = useState(false)
  const navigate = useNavigate()

  const getData = () => {
    getAllWords()
      .then((res) => {
        setWordies(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onChange = (option) => {
    setSelectedOption(option)
    if (selectedOption === option) {
      setRound(!round)
    } else if (selectedOption !== option) {
      setRound(false)
    }
  }

  const onDelete = (id) => {
    deleteWordy(id).then((res) => {
      if (res.status === 200) {
        showToast(`${res?.data?.message}`, 'success')
        setWordies(wordies.filter((wordy) => wordy._id !== id))
      }
    })
  }

  const onEdit = (id) => {
    navigate(`/wordy/wordyedit/${id}`)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="text-center">
      {loading ? (
        <Spin color={'danger'} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full items-center justify-between lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4 space-x-2 px-3 select-none">
          {wordies?.map((wordy) => (
            <div className={`${selectedOption === wordy && !round?'underline border border-black rounded-lg drop-shadow-xl shadow-black':''}
              w-auto bg-slate-400 p-2 rounded-md font-serif text-lg drop-shadow-2xl shadow-black
              `}>
              <div onClick={() => onChange(wordy)} key={wordy._id}>
                {selectedOption === wordy && !round
                  ? wordy.turkish
                  : wordy.english}
                  <img className='h-30 w-30 mx-auto' src={wordy.image}>
                  </img>
                <div className="my-2 flex items-center justify-around mt-3">
                  <FaTrash
                    onClick={() => onDelete(wordy._id)}
                    className="text-red-500 cursor-pointer hover:text-black"
                  />
                  <FaPencil
                    onClick={() => onEdit(wordy._id)}
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

export default AdminWordy
