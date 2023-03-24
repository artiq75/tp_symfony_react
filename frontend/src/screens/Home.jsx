import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../redux/album/albumSlice'
import { selectAlbumsData } from '../redux/album/albumSelector'
import Loader from '../components/Loader'
import AlbumCard from '../components/AlbumCard'

const Home = () => {

  //constante qui récupère le hook de react-redux
  const dispatch = useDispatch();

  //on récupère les infos du slice de player 
  //pour savoir si une chanson est en cours de lecture et si le player est actif
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  //on utilise le hook useEffect pour "dispatcher" lors du montage du composant
  useEffect(() => {
    //on dispach fetchAlbum dès que l'on monte le composant
    dispatch(fetchAlbums())
  }, [dispatch])// dans l'update on rappelle dispatch pour mettre à jour les infos

  const { albums, loading } = useSelector(selectAlbumsData)

  const dataAlbum = albums['hydra:member'];

  return (
    loading ? <Loader /> :

      <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
          Tous les albums
        </h2>
        <div className='flex flex-wrap md:justify-start justify-center gap-8'>
          {/* on va mapper sur dataAlbum dès que les infos sont chargées */}
          {dataAlbum && dataAlbum.map((data, index) => {
            return (
              //on appelle le composant AlbumCard
              <AlbumCard
                //on passe key en paramètre pour que chaque card est une clé unique
                key={index}
                //on passe data pour envoyer les infos de chaque album au composant
                data={data}
                //on passe le tableau de chanson
                songs={data.songs}
                //si le player le player est actif (valeur store)
                isPlaying={isPlaying}
                //pour activeSong on passe la valeur du store
                activeSong={activeSong}
                //on donne 0 pour lire la première piste de l'album
                index={0}
              />
            )
          })}
        </div>
      </div>
  )
}

export default Home