import React from 'react'
import Navbar from '@/pages/Landing/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/firebase'
import Loading from '@/components/Modules/Elements/Loading'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenAtom } from '@/jotai/atoms'

const DefaultLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
  const [emailStorage] = useAtom(emailStorageAtom)
  const [tokenStorage] = useAtom(tokenAtom)

  if (loading) return <Loading/>

  if (error) return <p>error...</p>

  if (user && emailStorage && tokenStorage) return location.replace("/browse")

  return (
    <div className='bg-[#24272D]'>
      {user ? <Navbar /> : ""}
      {children}
    </div>
  )
}

export default DefaultLayout