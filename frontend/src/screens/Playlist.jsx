import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiAddToQueue } from 'react-icons/bi'
import { addPlaylist } from '../redux/playlist/playlistSlice'
import axios from 'axios'
import { api } from '../constants/apiConstant'
import { useAuthContext } from '../tools/AuthContext'

const Playlist = () => {
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userId } = useAuthContext()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(`${api}/playlists`, {
        title,
        user: `/api/users/${userId}`
      })
      .then(({ data }) => {
        if (data.id) {
          try {
            dispatch(addPlaylist(data))
            navigate(`/playlists/${data.id}`)
          } catch (error) {
            console.log('error: ', error)
          }
        }
      })
      .catch((error) => {
        console.log('PLAYLIST: ', error)
      })
  }

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="p-2 text-gray-400 focus-within:text-gray-600 "
      >
        <label className="sr-only">Quel est votre recherche ?</label>
        <div className="flex justify-start items-center ">
          <BiAddToQueue className="w-5 h-5 ml-4" />
          <input
            type="text"
            className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
            autoComplete="off"
            title="value"
            placeholder="Saisir le nom"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-green_06 hover:bg-green_top text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Créer la playlist
          </button>
        </div>
      </form>
    </div>
  )
}

export default Playlist
