import React, { useRef, useState } from 'react'
import { MdGTranslate } from 'react-icons/md'
import { FaExchangeAlt } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { LuWholeWord } from 'react-icons/lu'
import { Spin } from '../../components/Spinner/Spin'
import { marked } from 'marked'
import {
  sentenceStructure,
  translateEnToTr,
  translateTrToEn,
} from '../../api/api'
import showToast from '../../alert/ShowToast'

const Translate = () => {
  const inputRef = useRef(null)
  const inputRef2 = useRef(null)
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [change, setChange] = useState(false)
  const [text, setText] = useState('')
  const [text2, setText2] = useState('')
  const [structureText, setStructureText] = useState('')

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
      showToast('Text copied to clipboard', 'info')
    }
  }
  const handleCopy2 = () => {
    if (inputRef2.current) {
      navigator.clipboard.writeText(inputRef2.current.value)
      showToast('Text copied to clipboard', 'info')
    }
  }

  const onChange = () => {
    setChange(!change)
    const value = text
    const value2 = text2
    setText(value2)
    setText2(value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onTranslate(text)
    }
  }

  const clear = () => {
    setText('')
    setText2('')
  }

  const onStructure = (text) => {
    setActive(!active)
    if(text === '') {
      setActive(false)
    }
    sentenceStructure(text)
      .then((res) => {
        if (res?.status && res?.status === 200) {
          setStructureText(res?.data?.structuredText)
        }
      })
      .finally(() => {
        setLoading2(false)
      })
  }

  const handleSpeaker = (language, text) => {
    const speech = new SpeechSynthesisUtterance()
    speech.text = text
    speech.lang = language
    speech.volume = 1
    speech.rate = 0.75
    speech.pitch = 1
    window.speechSynthesis.speak(speech)
  }

  const onTranslate = async (e) => {
    setLoading(true)
    if (change) {
      await translateEnToTr(e)
        .then((res) => {
          const text = res?.data?.translatedText
          if (text.includes('"')) {
            const text2 = text.replace(/"/g, '')
            setText2(text2)
          } else {
            setText2(text)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      await translateTrToEn(e)
        .then((res) => {
          const text = res?.data?.translatedText
          if (text.includes('"')) {
            const text2 = text.replace(/"/g, '')
            setText2(text2)
          } else {
            setText2(text)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div>
      <div>
        <div className="mt-5 p-2 w-full md:grid md:grid-flow-col md:space-x-5 grid grid-flow-row min-h-[450px]">
          <div className="p-1 drop-shadow-md md:col-span-11 row-span-11">
            <div
              className={`${
                !text && !text2 ? 'collapse ' : ''
              } absolute end-2 z-10 w-fit cursor-pointer -mb-5 "`}
              onClick={() => clear()}
            >
              <FaDeleteLeft className="hover:text-red-500" size={25} />
            </div>
            <textarea
              autoFocus
              ref={inputRef}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              value={!text ? '' : text}
              style={{ resize: 'none' }}
              className="w-full text-lg h-full text-start pl-2 border focus:drop-shadow-2xl border-slate-200 rounded-md focus:outline-2 focus:outline-slate-500"
              type="text"
              placeholder={`${!change ? 'Turkish' : 'English'}`}
            />
            <div
              onClick={handleCopy}
              className={`${
                !text ? 'collapse' : ''
              } absolute mx-2 start-1 -mt-8 w-fit cursor-pointer z-10'
                `}
            >
              <i className="pi pi-clone text-lg active:text-sky-500 hover:text-slate-500"></i>
            </div>
            <div
              onClick={() => handleSpeaker('TR-tr', text)}
              className={`${
                !text ? 'collapse' : ''
              } absolute ml-10 start-1 -mt-8 w-fit cursor-pointer z-10'
              `}
            >
              <i className="pi pi-volume-up text-lg active:text-sky-500 hover:text-slate-500"></i>
            </div>
          </div>
          <div className="flex items-center justify-center md:col-span-1 row-span-1">
            <div
              onClick={onChange}
              className="bg-slate-200 w-fit h-fit hover:bg-slate-300 text-slate-800 font-medium cursor-pointer p-2 rounded-md shadow-md hover:shadow-lg"
            >
              <FaExchangeAlt size={24} />
            </div>
          </div>
          <div className="p-1 drop-shadow-md md:col-span-11 row-span-11">
            {loading ? (
              <Spin color={'secondary'} />
            ) : (
              <textarea
                ref={inputRef2}
                style={{ resize: 'none' }}
                value={text2 ? text2 : ''}
                className="w-full text-lg h-full text-start border border-slate-200 rounded-lg pl-2 focus:outline-2 focus:outline-slate-500 focus:drop-shadow-2xl"
                type="text"
                placeholder={`${change ? 'Turkish' : 'English'}`}
              />
            )}
            <div
              onClick={() => handleSpeaker('En-us', text2)}
              className={`${
                !text2 ? 'collapse' : ''
              } absolute  ml-10 start-1 end-1 -mt-8 w-fit cursor-pointer z-10'
                `}
            >
              <i className="pi pi-volume-up active:text-sky-500 hover:text-slate-500  text-lg"></i>
            </div>
            <div
              onClick={handleCopy2}
              className={`${
                !text2 ? 'collapse' : ''
              } absolute  mx-2 start-1 end-1 -mt-8 w-fit cursor-pointer z-10'
                `}
            >
              <i className="pi pi-clone active:text-sky-500 hover:text-slate-500  text-lg"></i>
            </div>
          </div>
        </div>
        <div  className={`${text===""?'collapse':''} grid grid-flow-row w-full space-y-4 mb-4`}>
          <div
            className="flex items-center justify-center w-fit mx-auto"
            onClick={() => onTranslate(text ? text : text2)}
          >
            <button className="bg-slate-200 w-fit h-fit flex items-center justify-between hover:bg-slate-300 gap-x-2 text-slate-800 font-medium p-medium p-2 rounded-md shadow-md hover:shadow-lg">
              Translate
              <MdGTranslate size={24} />
            </button>
          </div>
          <div
            className="flex items-center justify-center w-fit mx-auto"
            onClick={() => onStructure(text2)}
          >
            <button
              className={`${
                active
                  ? 'bg-red-400 hover:bg-red-500'
                  : 'bg-lime-200 hover:bg-lime-300'
              } w-fit h-fit flex items-center justify-between  gap-x-2 text-slate-800 font-medium p-medium p-2 rounded-md shadow-md hover:shadow-lg`}
            >
              {active ? 'Close' : 'Sentence Structure'}
              <LuWholeWord size={24} />
            </button>
          </div>
        </div>

        {active ? (
          <>
            {loading2 ? (
              <Spin color={'secondary'} />
            ) : (
              <div className='bg-gradient-to-b w-fit mx-auto from-indigo-200 to-white m-4 p-2 text-center border-2 border-black rounded-lg mb-5' dangerouslySetInnerHTML={{ __html: marked(structureText) }}
            />)}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Translate
