import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getWordy, getWordyListById, getWordysIds } from '../../api/api'
import { UserContext } from '../User/UserContext'
import { Spin } from '../../components/Spinner/Spin'
import { FaWindowClose } from 'react-icons/fa'

export const WordyListDetail = () => {
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const [userId] = useState(user?._id)
  const [wordyList, setWordyList] = useState([])
  const [data, setData] = useState([])
  const [wordys, setWordys] = useState([])

  useEffect(() => {
    getWordyListById(userId, id).then((res) => {
      setWordyList(res?.data)
      setData(res?.data?.wordies)
    })
  }, [id])

  useEffect(() => {
    getWordysIds(data)
      .then((res) => {
        setWordys(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [data])

  return (
    <div className="pt-4">
      {loading ? (
        <Spin color="secondary" />
      ) : (
        <div className="container rounded-lg pb-3 bg-sky-200 shadow-2xl shadow-black">
          <div className="float-right">
            <NavLink to="/wordylist">
              <button className=" pt-1">
                <FaWindowClose color="red" size={25} />
              </button>
            </NavLink>
          </div>
          <h1>{wordyList?.name}</h1>
          <div className="w-fit border "></div>
          <div>{wordys?.length}</div>
          <div className="grid grid-flow-col w-auto mx-auto space-x-4 overflow-x-auto">
            {wordys?.map((wordy) => (
              <div
                className="bg-gradient-to-br p-2 border-2 rounded-2xl border-sky-500 from-gray-400 to-transparent cursor-pointer"
                key={wordy.id}
              >
                <h5>{wordy.english}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
