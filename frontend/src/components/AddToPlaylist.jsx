import axios from 'axios'
import { useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { api } from '../constants/apiConstant'

export default function AddToPlaylist({ song }) {
  const [isOpen, setIsOpen] = useState(false)

  const playlists = useSelector((state) => state.playlists.playlists)

  const handleAdd = function (playlist) {
    try {
      const songs = [song['@id'], ...playlist.songs.map((s) => s['@id'])]
      axios.put(`${api}/playlists/${playlist.id}`, {
        songs
      })
      setIsOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed shadow-md bg-neutral-800 p-2 rounded">
          {playlists.map((playlist) => (
            <div
              className="text-lg cursor-pointer hover:bg-green_06"
              key={playlist.id}
              onClick={() => handleAdd(playlist)}
            >
              {playlist.title}
            </div>
          ))}
        </div>
      )}
      <BiAddToQueue onClick={() => setIsOpen((v) => !v)} />
    </div>
  )
}
