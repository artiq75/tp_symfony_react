import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Searchbar from '../components/Searchbar'
import { selectAlbumsData } from '../redux/album/albumSelector'

const Search = () => {

  const { searchTitle,searchBiography, loading } = useSelector(selectAlbumsData) 
  
  return (
    <Searchbar/>
  )
}

export default Search