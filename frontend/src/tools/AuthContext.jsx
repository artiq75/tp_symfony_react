import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({
  userId: '',
  isGuest: '',
  nickname: '',
  email: '',
  setUserId: () => {},
  setIsGuest: () => {},
  setEmail: () => {},
  signIn: async () => {},
  signOut: async () => {}
})

const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('')
  const [isGuest, setIsGuest] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')

  const signIn = async (user) => {
    try {
      setUserId(user.userId)
      setIsGuest(user.isGuest)
      setEmail(user.email)
      setNickname(user.nickname)
      localStorage.setItem('userInfos', JSON.stringify(user))
    } catch (error) {
      throw new Error(`error: ${error}`)
    }
  }

  const signOut = async () => {
    try {
      setUserId('')
      setIsGuest('')
      setEmail('')
      setNickname('')
      localStorage.removeItem('userInfos')
    } catch (error) {
      throw new Error(`error: ${error}`)
    }
  }

  const value = {
    userId,
    isGuest,
    email,
    nickname,
    setUserId,
    setIsGuest,
    setEmail,
    setNickname,
    signIn,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }
