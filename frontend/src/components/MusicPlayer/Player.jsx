import React, { useEffect, useRef } from 'react'
import { apiMusic } from '../../constants/apiConstant'

// on récupère toutes les infos liées au player
const Player = ({
    activeSong,
    isPlaying,
    volume,
    seekTime,
    onEnded,
    onTimeUpdate,
    onLoadedData,
    repeat
}) => {

    const ref = useRef(null)

    if (ref.current) {
        if (isPlaying) {
            ref.current.play()
        } else {
            ref.current.pause()
        }
    }

    useEffect(()=>{
        ref.current.volume = volume
    },[volume])

    useEffect(() => {
      ref.current.currentTime = seekTime
    }, [seekTime])

    return (
        <audio 
            src={`${apiMusic}/${activeSong?.filePath}`}
            ref={ref}
            loop={repeat}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
        />
    )
}

export default Player