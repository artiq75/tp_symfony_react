// rafce
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import MusicPlayer from './components/MusicPlayer'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

const App = () => {
  const {activeSong} = useSelector((state)=> state.player)

  return (
    <div className='relative flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col bg-gradient-to-b from-[#1D1D1D] to-[#121212]'>
        <Topbar/>

        <div className='h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1 h-fit pb-40 text-white'>
            <Outlet/>
          </div>
        </div>
      </div>
      {activeSong?.title && (
        <div className='absolute h-28 bottom-0 left-0 right-0
                        animate-slideup bg-gradient-to-br from-white_01 to-black
                        backdrop-blur-lg rounded-t-3xl z-10  '>
          <MusicPlayer/>
        </div>
      )}
    </div>

  )
}

export default App
