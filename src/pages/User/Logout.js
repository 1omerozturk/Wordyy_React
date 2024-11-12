import React, { useEffect, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

export default function Logout() {
  return (
    <div
      className="flex items-center justify-evenly gap-x-2 border-2 border-black hover:text-black px-4 py-2 bg-red-500 hover:animate-pulse text-white rounded-full hover:bg-red-700"
    >
      <FaSignOutAlt className="hover:animate-bounce" />
      Çıkış
    </div>
  )
}
