import { emailStorageAtom, tokenAtom } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/utils/apiInstance'
import { auth } from '@/utils/firebase'
import { signOut } from 'firebase/auth'
import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AccountMenu = () => {
    const navigate = useNavigate()
    const [token, setToken] = useAtom(tokenAtom)
    const [email, setEmailStorage] = useAtom(emailStorageAtom)

    const handleSignOut = async () => {
        const data = { email, token }

        const dbSignOut = await apiInstanceExpress.delete('my-token', { data })
        if (dbSignOut.status === 204) {
            signOut(auth).then(() => {
                setToken(null)
                setEmailStorage(null)
                navigate("/")
            })
        }

    }

    return (
        <div className='flex dropdown dropdown-hover dropdown-end'>
            <div className="avatar" tabIndex={0}>
                <div className="w-10 rounded">
                    <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                </div>
            </div>
            <div className='dropdown-content absolute top-10 z-30 bg-black text-stone-200 p-2'>
                <p className='text-sm'>{email}</p>
                <button
                    onClick={handleSignOut}
                    tabIndex={0}
                    className='hover:text-white transition-all'
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default AccountMenu