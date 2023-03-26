import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Searchbar from '../components/Searchbar'
import Loader from '../components/Loader'
import { selectAlbumsData } from '../redux/album/albumSelector'
import AlbumCard from '../components/AlbumCard'

const Search = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const { loading, searchTitle, searchBiography } =
    useSelector(selectAlbumsData)

  const albums = useMemo(() => {
    if (searchTitle) return searchTitle['hydra:member']
    return searchBiography['hydra:member']
  }, [searchTitle, searchBiography])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Searchbar />
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          Tous les albums
        </h2>
        <div className="flex flex-wrap md:justify-start justify-center gap-8">
          {/* on va mapper sur dataAlbum dès que les infos sont chargées */}
          {albums &&
            albums.map((data, index) => {
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
    </>
  )
}

export default Search
