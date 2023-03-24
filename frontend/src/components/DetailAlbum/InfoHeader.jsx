import React from 'react'
import { apiImage } from '../../constants/apiConstant'

const InfoHeader = ({ dataAlbum }) => {
    //on crée une constante pour l'image
    const imgPath = `${apiImage}/${dataAlbum?.imagePath}`;
    //on formate la date de sortie
    const year = new Date(dataAlbum.releaseDate)
    const dateSortie = year.getFullYear();

    //on utilise une double ternaire pour afficher le nombre de titre
    const nbrTitle = dataAlbum.songs ? dataAlbum.songs.length > 1
        ? dataAlbum.songs.length + ' titres'
        : dataAlbum.songs.length + ' titre'
        : 'Aucun titre pour cet album';

    //créer le point séparateur
    const Dot = () => (
        <p className='text-2xl'>&#8226;</p>
    )

    //Traitement de la durée total de l'album
    const durationAlbum = () => {
        const totalSeconds = dataAlbum.songs.map(function (num) {
            return num.duration
        }).reduce(function (a, b) {
            return a + b
        });

        const hours = Math.floor(totalSeconds / 3600);

        const minutes = Math.floor((totalSeconds % 3600) / 60) < 10
            ? '0' + Math.floor((totalSeconds % 3600) / 60)
            : Math.floor((totalSeconds % 3600) / 60);

        const seconds = totalSeconds % 60 < 10
            ? '0' + totalSeconds % 60
            : totalSeconds % 60;

        return hours > 0 ? (hours + " h " + minutes + " min " + seconds + "s")
            : (minutes + " min " + seconds + "s");

    }



    return (
        <div className='flex items-center'>
            <img className='w-5 h-5 rounded-full' src={imgPath} alt={dataAlbum.title} />
            <p className='font-bold text-base p-1'>{dataAlbum.artist.name}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{dateSortie}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{nbrTitle}</p>
            <Dot />
            <p className='text-base-p-1'>{durationAlbum()}</p>
        </div>
    )
}

export default InfoHeader