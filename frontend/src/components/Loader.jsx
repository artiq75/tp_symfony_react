import React from 'react'
import { Audio } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[70vh]'>
        <Audio
        height="100"
        width="100"
        color='rgba(30, 215, 96, 1)'
        ariaLabel='audio-loading'
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
        />
    </div>
  )
}

export default Loader