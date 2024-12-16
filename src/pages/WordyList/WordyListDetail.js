import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getWordy, getWordyListById, getWordyListData } from '../../api/api'
import { UserContext } from '../User/UserContext'
import { Spin } from '../../components/Spinner/Spin'
import { FaWindowClose } from 'react-icons/fa'

export const WordyListDetail = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [round, setRound] = useState(false)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const [userId] = useState(user?._id)
  const [wordyList, setWordyList] = useState([])
  const [wordys, setWordys] = useState([])

  useEffect(() => {
    getWordyListById(userId, id).then((res) => {
      setWordyList(res?.data)
    })
    getWordyListData(id).then((res) => {
      setWordys(res?.data)
    }).finally(()=>{setLoading(false)})
  }, [id])

  const onChange = (option) => {
    setSelectedOption(option)
    if (selectedOption === option) {
      setRound(!round)
    } else if (selectedOption !== option) {
      setRound(false)
    }
  }

  // const getData = () => {
  //   getWordyListData(data)
  //     .then((res) => {
  //       console.log(res)
  //       setWordys(res)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className="pt-4 mb-5 select-none">
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
          <div className="grid grid-flow-row space-y-3 max-h-[200px] w-auto mx-auto overflow-y-auto">
            {wordys?.map((wordy) => (
              <div
                onClick={() => onChange(wordy)}
                className="bg-gradient-to-br p-2 border-2 rounded-2xl border-sky-500 from-gray-400 to-transparent cursor-pointer"
                key={wordy.id}
              >
                <h5>
                  {selectedOption === wordy && !round
                    ? wordy.turkish
                    : wordy.english}
                </h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
