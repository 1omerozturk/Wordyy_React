import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../User/UserContext'
import { addWordyWordyList, getAllWordyList } from '../../api/api'
import { FaPlusCircle } from 'react-icons/fa'
import showToast from '../../alert/ShowToast'

export const Dropdown = ({ data, wordyId }) => {
  const [selectedWordyListId, setSelectedWordyListId] = useState('')
  const [listData, setListData] = useState(null)
  const [cWordyId, setCWordyId] = useState(null)
  const [view, setView] = useState(false)

  useEffect(() => {
    if (listData && listData.length > 0) {
      handleChangeWordyList(listData[0]._id); // İlk öğeyi seçili olarak işleme
    }
  }, [listData]);

  useEffect(() => {
    setCWordyId(wordyId)
  }, [wordyId])

  const handleChangeWordyList = (e) => {
    setSelectedWordyListId(e)
  }

  const handleAddWordy = () => {
    if (selectedWordyListId && cWordyId) {
      addWordyWordyList(selectedWordyListId, cWordyId).then((res) => {
        if (res?.status && res.status === 201) {
          showToast('Wordy added to list successfully', 'success')
        } else if (res?.status === 409) {
          showToast(res?.data?.message, 'warning')
        }
      })
    }
  }

  const handleView = () => {
    setView(!view)
  }

  useEffect(() => {
    if (data) {
      getAllWordyList(data._id).then((res) => {
        setListData(res?.data?.wordyLists)
      })
    }
  }, [data])

  return (
    <div className="grid grid-flow-col px-2 items-center justify-center gap-x-2 w-fit mx-auto">
      <span
        className={`btn btn-sm btn-outline-${view ? 'danger' : 'success'}`}
        onClick={handleView}
      >
        {view ? 'Cancel' : 'Add Wordy List'}
      </span>
      {view && (
        <>
          <select
            className="form-select form-select-sm w-40"
            onChange={(e) => handleChangeWordyList(e.target.value)}
            defaultValue={listData && listData[0]._id}
            id="selectBox"
            class="flex w-fit mx-auto col-span-1 border border-black hover:bg-slate-200  pr-3 font-thin text-black focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-base rounded-md"
          >
            {listData &&
              listData.map((item, index) => {
                return (
                  <option
                    className="hover:bg-slate-400"
                    key={index}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                )
              })}
          </select>
          <FaPlusCircle
            title="Add"
            onClick={handleAddWordy}
            className="mx-auto cursor-pointer"
            color="green"
            size={25}
          />
        </>
      )}
    </div>
  )
}
