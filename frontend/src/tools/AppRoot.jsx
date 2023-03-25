import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from '../redux/store'
import { useAuthContext } from './AuthContext'
import OfflineRouter from './OfflineRouter'
import Router from './Router'

const AppRoot = () => {
  const [inSession, setInSession] = useState(null)
  const { userId, setUserId, setIsGuest, setEmail, setNickname } = useAuthContext()

  const getUserInfos = async () => {
    const user = JSON.parse(localStorage.getItem('userInfos'))

    if (user) {
      setUserId(user.userId)
      setIsGuest(user.isGuest)
      setEmail(user.email)
      setNickname(user.nickname)
      setInSession(true)
    } else {
      setInSession(false)
    }
  }

  useEffect(() => {
    getUserInfos()
  }, [userId])

  return (
    <Provider store={store}>
      {/* on appelle le router pour gérer les url */}
      <RouterProvider router={inSession ? Router : OfflineRouter} />
    </Provider>
  )
}

export default AppRoot
