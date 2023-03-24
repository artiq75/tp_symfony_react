import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextSong, playPause, prevSong } from '../../redux/player/playerSlice'
import Controls from './Controls'
import Player from './Player'
import Seekbar from './Seekbar'
import Track from './Track'
import VolumeBar from './VolumeBar'

const MusicPlayer = () => {
    //on récupère toutes les données du slice player
    const {
        activeSong,
        currentSongs,
        currentAlbum,
        currentIndex,
        isActive,
        isPlaying
    } = useSelector((state) => state.player)
    //on définit toutes les constantes pour le player
    const [duration, setDuration] = useState(0)//durée du titre
    const [seekTime, setSeekTime] = useState(0)//position de la barre de lecture(lorsqu'on déplace le curseur)
    const [appTime, setAppTime] = useState(0)//position réel de la lecture
    const [volume, setVolume] = useState(0.3)//pour gérer le volume
    const [repeat, setRepeat] = useState(false)//si on veut activer la fonction "boucle"
    const [shuffle, setShuffle] = useState(false)//si on veut activer la lecture aléatoire
    //on appelle le hook de redux
    const dispatch = useDispatch();

    useEffect(() => {
        //si le store contient un tableau de chanson on passe à true
        if (currentSongs?.length) dispatch(playPause(true))
    }, [currentIndex])//si currentIndex change, on "met à jour" le composant

    //on gère le play/pause
    const handlePlayPause = () => {
        //si aucune chanson active, on return
        if (!isActive) return;
        //si une chanson est active
        if (isPlaying) {
            //il doit mettre pause
            dispatch(playPause(false))
        } else {
            //on met sur play
            dispatch(playPause(true))
        }
    }

    //on gère pour avancer d'une piste
    const handleNextSong = () => {
        //si on n'est pas en mode aléatoire
        if (!shuffle) {
            //on utilise ici la technique du modulo pour toujours être dans le tableau
            //si chiffre de gauche < chiffre de droite ca retourne la valeur du chiffre de gauche
            dispatch(nextSong((currentIndex + 1) % currentSongs.length))
        } else {
            //sinon on récupère un index aléatoire dans le tableau de chansons
            dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)))
        }
    }

    //on gère le recul d'une piste
    const handlePrevSong = () => {
        if (currentIndex === 0) {
            //si l'index est à 0 on récupère le dernier index du tableau
            dispatch(prevSong(currentSongs.length - 1))
        } else if (shuffle) {
            dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)))
        } else {
            //on enlève 1 à l'index
            dispatch(prevSong(currentIndex - 1))
        }
    }

    return (
        <div className='relative sm:px-12 px-8 w-full flex items-center justify-between'>
            <Track
                isPlaying={isPlaying}
                isActive={isActive}
                activeSong={activeSong}
                currentAlbum={currentAlbum}
            />
            <div className='flex-1 flex flex-col items-center justify-center'>
                <Controls
                    isPlaying={isPlaying}
                    isActive={isActive}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                    currentSongs={currentSongs}
                    handlePlayPause={handlePlayPause}
                    handlePrevSong={handlePrevSong}
                    handleNextSong={handleNextSong}
                />
                <Seekbar
                    value={appTime}
                    min="0"
                    max={duration}
                    onInput={(event) => setSeekTime(event.target.value)}
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />

                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    currentIndex={currentIndex}
                    onEnded={handleNextSong}
                    onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
                    onLoadedData={(event) => setDuration(event.target.duration)}

                />

            </div>

            <VolumeBar
                value={volume}
                min='0'
                max='1'
                onChange={(event) => setVolume(event.target.value)}
                setVolume={setVolume}
            />
        </div>
    )
}

export default MusicPlayer