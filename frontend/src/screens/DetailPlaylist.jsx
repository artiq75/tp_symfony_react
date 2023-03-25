import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ListAlbumSong from '../components/DetailAlbum/ListAlbumSong'
import { apiImage, apiRoot } from '../constants/apiConstant'
import { fetchPlaylist } from '../redux/playlist/playlistSlice'

export default function DetailPlaylist() {
  const { id } = useParams()

  //constante qui récupère le hook de react-redux
  const dispatch = useDispatch()

  //on utilise le hook useEffect pour "dispatcher" lors du montage du composant
  useEffect(() => {
    //on dispach fetchPlaylist dès que l'on monte le composant
    dispatch(fetchPlaylist(id))
  }, [dispatch, id]) // dans l'update on rappelle dispatch pour mettre à jour les infos

  const playlist = useSelector((state) => state.playlists.playlist)

  let srcImg = `${apiRoot}/images/logo2.png`

  if (playlist.songs?.length > 0) {
    srcImg = `${apiImage}/${playlist.songs[0]?.album.imagePath}`
  }

  return (
    <>
      <div className="bg-gradient-to-b from-green_top to-transparent p-5 w-full flex items-center">
        <img src={srcImg} className="w-48 h-48 m-1" alt={playlist?.title} />
        <div className="ml-10 flex flex-col justify-end">
          <p>Playlist</p>
          <h1 className="text-5xl font-bold text-white my-7">
            {playlist?.title}
          </h1>
          {/* on appelle la barre d'info */}
          {/* <InfoHeader dataAlbum={dataAlbum} /> */}
        </div>
      </div>
      <ListAlbumSong dataAlbum={playlist} />
    </>
  )
}
