import React, { useEffect, useMemo, useState } from 'react'
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillInfoCircle,
  AiOutlineInfoCircle
} from 'react-icons/ai'
import { Collapse } from 'react-collapse'
import InfoAlbum from './InfoAlbum'
import { useDispatch, useSelector } from 'react-redux'
import {
  playPause,
  setActiveAlbum,
  setActiveSong
} from '../../redux/player/playerSlice'
import PlayPause from '../PlayPause'
import axios from 'axios'
import { api } from '../../constants/apiConstant'
import { useAuthContext } from '../../tools/AuthContext'
import {
  addPreference,
  deletePreference,
  fetchPreferences
} from '../../redux/preference/preferenceSlice'

const ToolsBarDetail = ({ dataAlbum }) => {
  //redefinir des variables pour le playpause
  const data = dataAlbum
  const songs = dataAlbum?.songs
  const [index, setIndex] = useState(0)
  const [isCollapse, setIsCollapse] = useState(true)

  const { userId } = useAuthContext()

  useEffect(() => {
    dispatch(fetchPreferences(userId))
  }, [userId])

  const { preferences } = useSelector((state) => state.preferences)

  const inList = useMemo(() => {
    return preferences.some((p) => p.album.id === dataAlbum.id)
  }, [preferences, dataAlbum])

  const [isInList, setIsInList] = useState(false) //TODO récupérer la vrai valeur en BDD

  useEffect(() => {
    setIsInList(inList)
  }, [inList])

  const { isPlaying, activeSong } = useSelector((state) => state.player)
  //on récupère le hook de react redux
  //pour pouvoir interagir avec le slice
  const dispatch = useDispatch()

  //méthode lorsqu'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  //méthode lorsqu'on met play
  const handlePlayClick = () => {
    //on met à jour le slice du player
    dispatch(setActiveSong({ songs, data, index }))
    dispatch(setActiveAlbum({ data }))
    dispatch(playPause(true))
  }

  const toggleFavorite = () => {
    const preference = preferences.find((p) => p.album.id === dataAlbum.id)
    if (!isInList) {
      axios
        .post(`${api}/preferences`, {
          user: `/api/users/${userId}`,
          album: data['@id']
        })
        .then(({ data }) => {
          console.log(data)
          dispatch(addPreference(data))
          setIsInList(true)
        })
    } else {
      axios.delete(`${api}/preferences/${preference.id}`)
      dispatch(deletePreference(preference.id))
      setIsInList(false)
    }
    //TODO mettre à jour la BDD pour ajouter ou enlever de la liste des favories
  }

  const handleCollapseClick = () => {
    setIsCollapse(!isCollapse)
  }

  return (
    <>
      <div className="flex items-center ml-5">
        {/* bouton play */}
        <div className="cursor-pointer mr-3">
          <PlayPause
            songs={songs}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={index}
            data={data}
          />
        </div>
        {/* bouton pour favories */}
        <div className="cursor-pointer" onClick={toggleFavorite}>
          {isInList ? (
            <AiFillHeart
              className="text-green m-3"
              style={{ fontSize: '30px' }}
            />
          ) : (
            <AiOutlineHeart
              className="text-green m-3"
              style={{ fontSize: '30px' }}
            />
          )}
        </div>
        {/* bouton d'information qui active le collapse*/}
        <div className="cursor-pointer" onClick={handleCollapseClick}>
          {!isCollapse ? (
            <AiFillInfoCircle
              className="text-green m-3"
              style={{ fontSize: '30px' }}
            />
          ) : (
            <AiOutlineInfoCircle
              className="text-green m-3"
              style={{ fontSize: '30px' }}
            />
          )}
        </div>
      </div>
      {/* on va récupérer les info du collapse */}
      <div>
        <Collapse isOpened={!isCollapse}>
          {/* on importe le composant InfoAlbum */}
          <InfoAlbum dataAlbum={dataAlbum} />
        </Collapse>
      </div>
    </>
  )
}

export default ToolsBarDetail
