import React from 'react'
import { useAuthContext } from '../tools/AuthContext'

const Topbar = () => {
  const auth = useAuthContext()

  const handleLogout = function () {
    auth.signOut()
  }

  return (
    <div className="h-20 flex flex-row justify-between items-center bg-green_top">
      <p className="text-base text-white p-4 text-xl">{auth.nickname}</p>
      <p className="text-base text-white p-4">
        <button
          className="text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </p>
    </div>
  )
}

export default Topbar
