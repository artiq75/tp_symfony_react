import axios from 'axios'
import { useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../constants/apiConstant'
import { setPlaylists } from '../redux/playlist/playlistSlice'

export default function AddToPlaylist({ song }) {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const playlists = useSelector((state) => state.playlists.playlists)

  const handleAdd = function (playlist) {
    try {
      // Ajout du son actuelle plus les anciens
      const songs = [song['@id'], ...playlist.songs.map((s) => s['@id'])]
      axios.put(`${api}/playlists/${playlist.id}`, {
        songs
      })
      // On synchronise les changements dans le store
      dispatch(
        setPlaylists(
          playlists.map((p) => {
            if (p.id !== playlist.id) return p
            return {
              ...p,
              songs: [song, ...p.songs]
            }
          })
        )
      )
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
