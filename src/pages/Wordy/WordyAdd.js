import React, { useState } from 'react'
import { createWord } from '../../api/api'
import showToast from '../../alert/ShowToast'

function WordyAdd() {
  const [formData, setFormData] = useState({
    turkish: '',
    english: '',
    turkishExample: '',
    englishExample: '',
    image: '',
    type: '',
    created_at: new Date(),
  })

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createWord(formData).then(
      (response) => {
        console.log(response)
        if (response?.status === 201) {
          showToast('Word added successfully', 'success')
          setFormData({
            turkish: '',
            english: '',
            turkishExample: '',
            englishExample: '',
            image: '',
            type: '',
          })
        }
      },
      (error) => {
        console.error(error)
        showToast('Error adding word', 'error')
      },
    )
  }

  return (
    <>
      <div className="flex items-center justify-center my-5">
        <h1 className="text-5xl font-bold text-amber-500 ">Word Add</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-4/6 mx-auto bg-sky-200 py-3 rounded-3xl">
          <div className="mx-auto grid grid-flow-row gap-y-3 px-3">
            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                placeholder="Turkish Word"
                name="turkish"
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={formData.turkish}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                placeholder="English Word"
                name="english"
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={formData.english}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                placeholder="Turkish Example"
                name="turkishExample"
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={formData.turkishExample}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                placeholder="English Example"
                name="englishExample"
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={formData.englishExample}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-flow-col">
              {/* <i className="pi pi-at text-gray-500 my-auto text-xl"></i> */}
              <input
                type="text"
                name="image"
                placeholder="Image Url"
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-flow-col">
              <select
                required
                className="w-full col-span-10 text-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                name="type" // 'name' özelliğini 'type' olarak ayarlıyoruz
                value={formData.type}
                onChange={handleChange}
              >
                <option title="Select type" key="0" disabled value="">
                  Type
                </option>
                {wordyTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
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
    </>
  )
}

export default WordyAdd
