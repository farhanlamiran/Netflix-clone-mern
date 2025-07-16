import Loading from '@/components/Modules/Elements/Loading'
import { emailStorageAtom, tokenAtom } from '@/jotai/atoms'
import Navbar from '@/pages/Browse/Navbar'
import { auth } from '@/utils/firebase'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAtom } from 'jotai'

const BrowseLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)

    if (loading) return <Loading />

    if (error) return <p>error...</p>

    if (!user && !emailStorage && !tokenStorage) return location.replace("/")

    return (
        <>
            <Navbar />
            <div className='bg-[#24272D]'>{children}</div>
        </>
    )
}

export default BrowseLayout