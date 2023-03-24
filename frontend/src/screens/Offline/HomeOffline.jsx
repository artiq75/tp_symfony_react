import React from 'react'
import { Outlet } from 'react-router-dom'
import { imgLogo } from '../../constants/appConstant'

const HomeOffline = () => {
  return (
    <>
    <div className='w-screen bg-black py-12'>
      <img src={imgLogo} className='w-full h-28 object-contain'/>
    </div>
    <Outlet/>
    </>
  )
}

export default HomeOffline