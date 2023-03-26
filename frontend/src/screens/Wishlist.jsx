import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlbumCard from '../components/AlbumCard'
import Loader from '../components/Loader'
import { fetchPreferences } from '../redux/preference/preferenceSlice'
import { useAuthContext } from '../tools/AuthContext'

const Wishlist = () => {
  const dispatch = useDispatch()
  const { userId } = useAuthContext()

  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const { loading, preferences } = useSelector((state) => state.preferences)

  useEffect(() => {
    dispatch(fetchPreferences(userId))
  }, [userId])

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Tous les albums
      </h2>
      <div className="flex flex-wrap md:justify-start justify-center gap-8">
        {/* on va mapper sur dataAlbum dès que les infos sont chargées */}
        {preferences &&
          preferences.map((data, index) => {
            return (
              //on appelle le composant AlbumCard
              <AlbumCard
                //on passe key en paramètre pour que chaque card est une clé unique
                key={index}
                //on passe data pour envoyer les infos de chaque album au composant
                data={data.album}
                //on passe le tableau de chanson
                songs={data.album.songs}
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

export default Wishlist
