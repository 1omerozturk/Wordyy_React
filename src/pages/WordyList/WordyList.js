import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../User/UserContext'
import { deleteWordyListById, getAllWordyList } from '../../api/api'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Spin } from '../../components/Spinner/Spin'
import { MdDelete, MdEdit } from 'react-icons/md'
import showToast from '../../alert/ShowToast'

export const WordyList = () => {
  const [wordyList, setWordyList] = useState([])
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const loadData = useCallback(() => {
    const userId = user?._id
    const response = getAllWordyList(userId)
    response
      .then((res) => {
        setWordyList(res?.data?.wordyLists)
      })
      .finally(() => {
        setLoading(false)
      })
  })

  const convertDate = (d) => {
    const date = new Date(d)
    const formattedDate = date.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    return `${formattedDate}`
  }
  const convertTime = (d) => {
    const date = new Date(d)
    const formattedTime = date.toLocaleTimeString('en-EN', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `${formattedTime}`
  }

  const handleDetail = (id) => {
    navigate(`/wordylist/${id}`)
  }

  const handleQuiz = (id) => {
    navigate(`/quiz/${id}`)
  }

  const deleteWordyList = (id) => {
    try {
      const userId = user?._id
      const response = deleteWordyListById(userId, id)
      response.then((res) => {
        setWordyList(wordyList.filter((item) => item._id !== id))
        showToast(res.message, 'success')
      })
    } catch (error) {
      showToast(error.message, 'danger')
    }
  }
  const editWordyList = (id) => {
    navigate(`wordylistedit/${id}`)
  }

  useEffect(() => {
    loadData()
  }, [wordyList])

  return (
    <div className="text-center w-full h-full pb-5 bg-gradient-to-b from-slate-300 to-sky-200">
      <Outlet />

      <NavLink
        className={`${location.pathname !== '/wordylist' ? 'collapse' : ''}`}
        to={`wordylistadd`}
      >
        <div className={`btn btn-outline-success my-2 mb-4 float-right`}>
          New WordyList
        </div>
      </NavLink>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-between lg:grid-cols-3 xl:grid-cols-4  gap-5 space-x-2 px-3">
        {loading ? (
          <div className="h-0 col-span-full my-10 mx-auto w-1/2 flex items-center justify-center">
            <Spin color={'info'} />
          </div>
        ) : (
          <>
            {wordyList && (
              <>
                {wordyList.map((item, index) => (
                  <div key={index}>
                    <div
                      class={`cursor-pointer w-full md:w-full h-auto min-h-32 border-3 mx-auto bg-gradient-to-tr from-gray-200 to-sky-300 outline-double border-slate-300 rounded-md rounded-tl-full`}
                    >
                      <div
                        key={index}
                        className="flex w-full items-end justify-end gap-x-5 px-3"
                      >
                        <MdDelete
                          onClick={() => deleteWordyList(item._id)}
                          className="flex rounded-full border-2 size-7 md:size-9 border-red-500 border-opacity-30 hover:border-opacity-100"
                          color="red"
                        />
                        <MdEdit
                          onClick={() => editWordyList(item._id)}
                          className="flex border-2 border-orange-300 border-opacity-30 hover:border-opacity-100  p-0.5 rounded-full  size-7 md:size-9"
                          color="orange"
                        />
                      </div>
                      <div
                        onClick={() => handleDetail(item._id)}
                        class="card-body cursor-pointer"
                      >
                        <h4 class="card-title my-2">{item.name}</h4>
                        <p class="card-text font-mono w-fit mx-auto font-semibold   ">
                          <span className="font-sans border-b-2 border-b-gray-600 text-sm font-normal">
                            Wordy Size:
                          </span>{' '}
                          {item.wordies.length}
                        </p>
                        <div className="text-end">
                          <div className="text-xs text-slate-500">
                            {convertDate(item?.created)}
                          </div>
                          <div className="text-xs text-slate-500">
                            {convertTime(item?.created)}
                          </div>
                        </div>
                      </div>

                      <div className="w-fit mx-auto">
                        <button
                          onClick={() => handleQuiz(item._id)}
                          className="btn btn-info"
                        >
                          Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {wordyList && wordyList.length === 0 && (
              <div className="text-center">
                <p>Wordy List Not Found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
