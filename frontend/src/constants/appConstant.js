import {AiOutlineHome, AiOutlineSearch, AiOutlineAppstoreAdd} from 'react-icons/ai'
import {BiLibrary} from 'react-icons/bi'
import {MdFavoriteBorder} from 'react-icons/md'
import {apiRoot} from './apiConstant'

//on construit 2 tableaux avec les données pour la navbar

//le 1er pour la gestion des albums
export const dataAlbumNav = [
    {title: 'Accueil', path: '/', icon: AiOutlineHome},
    {title: 'Rechercher', path: '/search', icon: AiOutlineSearch},
    {title: 'Bibliothèque', path: '/library', icon: BiLibrary},
]

//le 2ème pour les options utilisateur
export const dataUserNav = [
    {title: 'Créer une playlist', path: '/add-playlist', icon: AiOutlineAppstoreAdd},
    {title: 'Albums likés', path: '/wishlist', icon: MdFavoriteBorder},
]

//on récupère le logo de l'appli
export const imgLogo = `${apiRoot}/images/logo.png`