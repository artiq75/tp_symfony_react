import React from 'react'
import { useSelector } from 'react-redux'
import { selectAlbumsData } from '../redux/album/albumSelector'
import Loader from '../components/Loader'

const Wishlist = () => {
  const { loading } = useSelector((selectAlbumsData))

  return loading ? <Loader /> : <div>Wishlist</div>
}

export default Wishlist
