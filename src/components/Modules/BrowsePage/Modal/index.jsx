import { isOpenModalAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { GoPlay, GoPlusCircle } from 'react-icons/go'
import Recommentdation from './Recommentdation'
import { idMovieAtom } from '@/jotai/atoms'
import { getMovieDetail } from '@/utils/getMovieDetail'
import ReactPlayer from 'react-player'
import { getMoviesUrl } from '@/utils/getMoviesUrl'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
    const navigate = useNavigate()

    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [idMovie, setIdMovie] = useAtom(idMovieAtom)

    const [movieDetail, setMovieDetail] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        if (idMovie && isOpenModal) {
            getMovieDetail({ movieId: idMovie }).then((result) => setMovieDetail(result))
            getMoviesUrl({ moviesId: idMovie }).then((result) => setVideoUrl(result))
        }
    }, [idMovie, isOpenModal])

    const genreMapping = (genres) => {
        if (Array.isArray(genres)) {
            const names = genres.map((genre) => genre.name)
            return names.join(", ")
        } else {
            return ""
        }
    }

    return (
        <dialog className={`modal ${isOpenModal ? 'modal-open' : ''}`}>
            <div className='modal-box w-full max-w-screen-md p-0 bg-[#16181B]'>
                <div className='relative '>
                    {/* video play */}
                    <div className='h-[450px] w-full'>
                        <ReactPlayer
                            width={"100%"}
                            height={"100%"}
                            playing={isOpenModal ? true : false}
                            muted={true}
                            loop={true}
                            src={`https://youtube.com/watch?v=${videoUrl}`}
                        />
                    </div>
                    <button
                        onClick={() => {
                            setIsOpenModal(false)
                        }}
                        className='absolute top-2 right-2 rounded-full border p-1 text-white'>
                        <MdClose size={24} />
                    </button>
                    <di className='absolute bottom-1/2 left-10'>
                        <h2 className='text-4xl font-black text-white'>{movieDetail?.title}</h2>
                    </di>
                    <div className='absolute bottom-1/2 left-10 translate-y-14'>
                        <div className='flex gap-4'>
                            <button
                                onClick={() => {
                                    navigate("/watch/" + videoUrl)
                                    setIsOpenModal(false)
                                    setIdMovie(null)
                                    setVideoUrl(null)
                                    setMovieDetail([])
                                }}
                                className='flex bg-slate-50 w-30 text-black items-center justify-center p-1.5 gap-1 rounded-md font-bold text-xl'>
                                <GoPlay size={32}
                                />
                                Play
                            </button>
                            <button className='text-slate-200 hover:text-white'><GoPlusCircle size={44} /></button>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 px-4 py-2 text-white'>
                    {/* kolom kiri */}
                    <div>
                        <div className='flex gap-2'>
                            <p>{movieDetail?.release_date}</p>
                            <p className='text-green-400/90'>{movieDetail?.runtime} Minutes</p>
                        </div>
                        <p className='mt-4'>{movieDetail?.overview}</p>
                    </div>
                    {/* kolom kanan */}
                    <div className='fle flex-col gap-4'>
                        <p className='mb-4'>Genre: {genreMapping(movieDetail?.genres)}</p>
                        <p>Popularity: {movieDetail?.popularity}</p>
                    </div>
                </div>
                <Recommentdation />
            </div>
        </dialog>
    )
}

export default Modal