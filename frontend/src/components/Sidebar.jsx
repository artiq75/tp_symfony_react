import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { dataAlbumNav, dataUserNav, imgLogo } from '../constants/appConstant'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylists } from '../redux/playlist/playlistSlice'
import { useAuthContext } from '../tools/AuthContext'

//constante pour générer les différents onglets de la sidebar à partir de appConstants
const NavLinks = ({ onClick }) => {
  //constante qui récupère le hook de react-redux
  const dispatch = useDispatch()

  const { userId } = useAuthContext()

  //on utilise le hook useEffect pour "dispatcher" lors du montage du composant
  useEffect(() => {
    //on dispach fetchPlaylists dès que l'on monte le composant
    dispatch(fetchPlaylists(userId))
  }, [dispatch, userId]) // dans l'update on rappelle dispatch pour mettre à jour les infos

  const playlits = useSelector((state) => state.playlists.playlists)

  return (
    <>
      <div className="mt-10">
        {/* on va mapper sur le tableau dataAlbumNav */}
        {dataAlbumNav.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            end
            className={
              'flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06'
            }
            onClick={onClick}
          >
            <item.icon className="w-6 h-6 mr-2" />
            {item.title}
          </NavLink>
        ))}
      </div>
      <div className="mt-5">
        {/* on va mapper sur le tableau dataAlbumNav */}
        {dataUserNav.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            end
            className={
              'flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06'
            }
            onClick={onClick}
          >
            <item.icon className="w-6 h-6 mr-2" />
            {item.title}
          </NavLink>
        ))}
      </div>
      <div className="mt-5">
        <p>Playlists</p>
        {playlits?.map((item) => (
          <NavLink
            key={item.id}
            to={`/playlists/${item.id}`}
            end
            className={
              'flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06'
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </>
  )
}

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-black">
        <img src={imgLogo} alt="Logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
      {/* Gestion des icones pour ouvrir/fermer menu en petit ecran */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenu ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>

      <div
        className={`z-20 absolute top-0 h-screen w-2/3 bg-gradient-to-tl 
            from-white/10 to-[#1D1D1D] backdrop-blur-lg p-6 md:hidden 
            smooth-transition ${mobileMenu ? 'left-0' : '-left-full'}`}
      >
        <img src={imgLogo} alt="Logo" className="w-full h-14 object-contain" />
        <NavLinks onClick={() => setMobileMenu(true)} />
      </div>
    </>
  )
}

export default Sidebar
