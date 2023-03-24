import React from 'react'
import { useRouteError } from 'react-router-dom'
import {MdDangerous} from 'react-icons/md'

const ErrorPage = () => {
  //on appelle le hook de react-router pour gérer les erreurs de routes
const error = useRouteError();

  return (
    <div id='error-page' className='flex flex-col items-center justify-center h-screen bg-black text-white'>
      <MdDangerous style={{fontSize: 50, color: 'red'}} />
      <h1>Oops!</h1>
      <p>Désolé, mais une erreur s'est produite</p>
      <p>
        <i>{error.statusText || error.error.message}</i>
      </p>
      <a href="/" className='text-green_06 hover:text-green'>
        Revenir en lieu sûr
      </a>
    </div>
  )
}

export default ErrorPage