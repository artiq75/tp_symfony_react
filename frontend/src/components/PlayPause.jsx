import React from 'react'
import {BsPlayCircleFill, BsPauseCircleFill} from 'react-icons/bs'

const PlayPause = ({
    size = '60px', //on donne une taille d'icone par défaut, on peut surcharger si besoin
    isPlaying, //gère l'état si on est en mode play ou pause
    songs, //tableau de chansons (ex: toutes les chansons d'un album)
    activeSong, //chanson en cours de lecture
    handlePause,// méthode qui permet de mettre en pause
    handlePlay, //méthode qui permet de mettre play
    index //index du tableau de la chanson en cours de lecture
}) => {

  return (
    //on va checker si on est en mode "play" &&
    //si le titre de la chanson == au titre de la chanson du tableau à l'index donné
    isPlaying && activeSong?.title === songs[index]?.title 
    ? //si vrai on retourne l'icone pause avec la méthode handlePause
    <BsPauseCircleFill 
    size={size} 
    className='text-green shadow-md cursor-pointer' 
    onClick={handlePause}
    />
    : //si fauxon retourne l'icone play avec la méthode handlePlay
    <BsPlayCircleFill 
    size={size} 
    className='text-green shadow-md cursor-pointer' 
    onClick={handlePlay}
    />
  )
}

export default PlayPause