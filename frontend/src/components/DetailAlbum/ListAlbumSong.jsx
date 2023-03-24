import React, { useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import {playPause, setActiveSong, setActiveAlbum} from '../../redux/player/playerSlice'
import PlayPause from '../PlayPause';


const ListAlbumSong = ({ dataAlbum }) => {
    const data = dataAlbum;
    //on récupère le tableau de chansons
    const songs = dataAlbum.songs;
    //on déclare une constant isHover pour catcher la liste
    const [isHover, setIsHover] = useState(-1);
    //on récupère les infos du store
    const {isPlaying, activeSong} = useSelector((state)=> state.player)
    //on appelle le hook useDispatch
    const dispatch = useDispatch();
    // méthode play/pause
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }
    const handlePlayClick = (index) => {
        dispatch(setActiveSong({songs, data, index}))
        dispatch(setActiveAlbum({ data}))
        dispatch(playPause(true))
    }


    return (
        <div className='flex flex-col'>
            <div className='overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                    <div className='overflow-hidden'>
                        <table className='min-w-full text-left text-sm font-light'>
                            <thead className='border-b font-medium dark:border-neutral-500'>
                                <tr>
                                    <th scope='col' className='px-6 py-4'>#</th>
                                    <th scope='col' className='px-6 py-4'>TITRE</th>
                                    <th scope='col' className='px-6 py-4'>
                                        <BiTime style={{ width: '20px', height: '20px' }} />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs
                                    ? songs.map((row, index) => {
                                        //formatage du temps pour les titres
                                        const minutes = Math.floor((row.duration % 3600) / 60);
                                        const secondes = row.duration % 60;
                                        //on formate la durée du titre
                                        const duration = secondes < 10
                                            ? minutes + ":0" + secondes
                                            : minutes + ":" + secondes;

                                        return (
                                            <tr key={index} className='border-b transition duration-300 ease-in-out 
                                        hover:bg-gradient-to-b from-green_top to-transparent'
                                                onMouseEnter={() => setIsHover(index)}
                                                onMouseLeave={() => setIsHover(-1)}
                                            >
                                                <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>
                                                    {/* on utilise isHover pour afficher le bouton play */}
                                                    {isHover !== index && `#${index + 1}`}
                                                    {isHover === index && <PlayPause
                                                        size="16px"
                                                        songs={songs}
                                                        handlePause={handlePauseClick}
                                                        handlePlay={()=>handlePlayClick(index)}
                                                        isPlaying={isPlaying}
                                                        activeSong={activeSong}
                                                        index={index}
                                                    /> }
                                                </td>
                                                <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>{row.title}</td>
                                                <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>{duration}</td>
                                            </tr>
                                        )
                                    })
                                    : 'pas de titre pour cet album'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListAlbumSong