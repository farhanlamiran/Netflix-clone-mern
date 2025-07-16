import { JUMBOTRON_IMAGE } from '@/constants/listAsset'
import { emailAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import React from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '@/utils/firebase'
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { Slide, ToastContainer, toast } from 'react-toastify';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { apiInstance, apiInstanceExpress } from '@/utils/apiInstance'

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const register = await createUserWithEmailAndPassword(auth, email, password)
            console.log({ register })
            if (register) {
                await signOut(auth)
                const addUser = await apiInstanceExpress.post('sign-up', { email, password })
                if (addUser.status == 201) {
                    toast.success("Register Success")
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate("/login")
                    }, 3000);
                }
            }
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
                className='w-full h-[100vh] object-cover opacity-70'
            />

            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-white bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full'>
                <form className='flex flex-col gap-4'>
                    <div className='flex gap-2 text-white text-xl font-semibold mb-2 items-center'>
                        <GoChevronLeft onClick={() => navigate("/")} size={28} className='text-slate-50/50 hover:text-white' />
                        <h3 className=''>Sign Up</h3>
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
                            onClick={handleRegister}
                            disabled={isLoading}
                            className='bg-red-500 py-3 w-full text-white rounded-md font-bold disabled:bg-red-400 disabled:cursor-wait'
                        >
                            Sign Up</button>
                        <p>Already have an account?
                            <span
                                onClick={() => navigate("/login")}
                                className='ml-2 text-blue-500 underline'
                            >
                                Sign In</span>
                        </p>
                    </div>
                </form>

            </div>
        </DefaultLayout>
    )
}

export default Register