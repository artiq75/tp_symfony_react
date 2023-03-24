import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { fetchSearch } from '../redux/album/albumSlice'

const Searchbar = () => {
    const [searchWord, setSearchWord] = useState('')
    const dispatch = useDispatch()


const handleSubmit = (e) => {
    e.preventDefault();
    
    //on remplie albumSlice reducer setSearch
    dispatch(fetchSearch(searchWord));
}

    return (
        <form
            autoComplete='off'
            onSubmit={handleSubmit}
            className='p-2 text-gray-400 focus-within:text-gray-600 '>
            <label className='sr-only'>Quel est votre recherche ?</label>
            <div className='flex justify-start items-center '>
                <BiSearch className='w-5 h-5 ml-4' />
                <input
                    type="text"
                    className='flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4'
                    autoComplete='off'
                    name='value'
                    placeholder='Saisir votre recherche'
                    value={searchWord}
                    onChange={(e)=> setSearchWord(e.target.value)}
                />
            </div>
            
            
        </form>
    )
}

export default Searchbar