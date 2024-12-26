import React, { useCallback, useEffect, useState } from 'react'
import { deleteWordy, getAllWords } from '../../../api/api'
import {
  FaFilter,
  FaSearch,
  FaSortNumericDown,
  FaSortNumericUp,
  FaTrash,
} from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { Spin } from '../../../components/Spinner/Spin'
import showToast from '../../../alert/ShowToast'
import { Navigate, useNavigate } from 'react-router-dom'

const AdminWordy = () => {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [wordies, setWordies] = useState(null)
  const [allWordies, setAllWordies] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [round, setRound] = useState(false)
  const navigate = useNavigate()

  const getData = () => {
    getAllWords()
      .then((res) => {
        setWordies(res)
        setAllWordies(res)
        setLoading(false)
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

  const onChangeSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const onSortDate = () => {
    const sorted = [...wordies].sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at)
    })
    setWordies(sorted)
  }

  const onSortReverseDate = () => {
    const sorted = [...wordies].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })
    setWordies(sorted)
  }

  const onSearch = () => {
    if (search !== '') {
      setLoading(true)
      const filtered = allWordies.filter((wordy) => {
        return wordy.english.toLowerCase().includes(search)
      })
      setWordies(filtered)
      setLoading(false)
    }
  }
  const wordyTypes = [
    'Noun - İsim', // İsim
    'Verb - Fiil', // Fiil
    'Adjective - Sıfat', // Sıfat
    'Adverb - Zarf', // Zarf
    'Pronoun - Zamir', // Zamir
    'Preposition - Edat', // Edat
    'Conjunction - Bağlaç', // Bağlaç
    'Interjection - Ünlem', // Ünlem
  ]
  // filter method for wordy types
  const onChangeFilter = (e) => {
    setFilter(e.target.value)
  }
  const onFilter = () => {
    if (filter === 'all') {
      setWordies(allWordies)
      return
    }
    const filtered = allWordies.filter((wordy) => {
      return wordy.type.includes(filter)
    })
    setWordies(filtered)
  }

  const onEdit = (id) => {
    navigate(`/wordy/wordyedit/${id}`)
  }

  useEffect(() => {
    getData()
  }, [])

  // filter and search
  useEffect(() => {
    if (search !== '') {
      onSearch()
    } else if (filter !== '') {
      onFilter()
    } else {
      setWordies(allWordies)
    }
  }, [search, filter])

  return (
    <div className="text-center my-3">
      {/* search bar */}
      <div className="flex float-right w-auto space-x-2 px-3 my-3">
        <FaSearch
          size={35}
          className="text-blue-500 cursor-pointer hover:text-black"
        />
        <input
          onChange={onChangeSearch}
          type="search"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
        />

        {/* Filter */}

        <FaFilter
          size={35}
          className="text-blue-500 cursor-pointer hover:text-black"
        />
        <select
          onChange={onChangeFilter}
          className="form-select form-select-sm w-fit"
          id="selectBox"
        >
          <option value="all">All</option>
          {wordyTypes.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            )
          })}
        </select>

        <FaSortNumericDown
          onClick={onSortDate}
          size={35}
          className="text-blue-500 cursor-pointer hover:text-black"
        />
        <FaSortNumericUp
          onClick={onSortReverseDate}
          size={35}
          className="text-blue-500 cursor-pointer hover:text-black"
        />
      </div>
      {loading ? (
        <Spin color={'danger'} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full items-center justify-between lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4 space-x-2 px-3 select-none">
          {wordies?.map((wordy) => (
            <div
              className={`${
                selectedOption === wordy && !round
                  ? 'underline border border-black rounded-lg drop-shadow-xl shadow-black'
                  : ''
              }
              w-auto bg-slate-400 p-2 rounded-md font-serif text-lg drop-shadow-2xl shadow-black
              `}
            >
              <div onClick={() => onChange(wordy)} key={wordy._id}>
                {selectedOption === wordy && !round
                  ? wordy.turkish
                  : wordy.english}
                <img className="h-30 w-30 mx-auto" src={wordy.image}></img>

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
