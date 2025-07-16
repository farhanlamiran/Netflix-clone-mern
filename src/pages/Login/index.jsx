import { JUMBOTRON_IMAGE } from '@/constants/listAsset'
import { emailAtom, emailStorageAtom, tokenAtom } from '@/jotai/atoms'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { useAtom } from 'jotai'
import React, { use, useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { auth } from '@/utils/firebase'
import { Slide, toast, ToastContainer } from 'react-toastify'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { apiInstanceExpress } from '@/utils/apiInstance'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useState(null)
    const [, setToken] = useAtom(tokenAtom)
    const [, setEmailStorage] = useAtom(emailStorageAtom)
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        console.log({ handleLogin })
        e.preventDefault()
        try {
            setIsLoading(true)
            const login = await signInWithEmailAndPassword(auth, email, password)

            const firebaseToken = await getIdToken(login.user)

            const addToken = await apiInstanceExpress.post('my-token', { email, password, token: firebaseToken })
            if (addToken.status !== 200) return toast.error("can't sign-in now, try again later")


            toast.success('Login Berhasil, Mohon tunggu')
            setToken(firebaseToken)
            setEmailStorage(login.user.email)
            setTimeout(() => {
                setIsLoading(false)
                navigate("/browse")
            }, 2000);


        } catch (error) {
            setIsLoading(false)
            toast.error(error.code)
        }
    }

    return (
        <DefaultLayout>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
                transition={Slide}

            />
            <img
                src={JUMBOTRON_IMAGE}
                className='image-full h-[100vh] object-cover opacity-70'
            />
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-white bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full'>
                <form className='flex flex-col gap-4'>
                    <div className='flex gap-2 text-white text-xl font-semibold mb-2 items-center'>
                        <GoChevronLeft onClick={() => navigate("/")} size={28} className='text-slate-50/50 hover:text-white' />
                        <h3 className=''>Sign In</h3>
                    </div>
                    <div className='relative'>
                        <input
                            placeholder="Email"
                            type='email'
                            value={email ? email : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-[100%] p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent text-white'
                        />
                        <label className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:-top-[6px] transition-all text-lg text-white -z-10'>Email</label>
                    </div>
                    <div className='relative'>
                        <input
                            placeholder="Password"
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-[100%] p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent text-white'
                        />
                        <label className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:-top-[6px] transition-all text-lg text-white -z-10'>Password</label>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className='bg-red-500 py-3 w-full text-white rounded-md font-bold disabled:bg-red-400 disabled:cursor-wait'
                        >
                            {isLoading? "Memeriksa Akun.." : "Sign In" }</button>
                        <p>New to Here?
                            <span
                                onClick={() => navigate("/register")}
                                className='ml-2 text-blue-500 underline'
                            >
                                Sign Up</span>
                        </p>
                    </div>
                </form>

            </div>
        </DefaultLayout>
    )
}

export default Login