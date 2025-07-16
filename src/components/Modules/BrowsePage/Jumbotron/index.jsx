import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { GoPlay, GoUnmute, GoMute } from 'react-icons/go'
import { getMoviesByType } from '@/utils/getMoviesByType'
import { idMovieAtom, isOpenModalAtom } from '@/jotai/atoms'
import { getMoviesUrl } from '@/utils/getMoviesUrl'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'


const Jumbotron = () => {
    const navigate = useNavigate()
    const [, setIsOpenModal] = useAtom(isOpenModalAtom)

    const [idMovieA, setIdMovieA] = useAtom(idMovieAtom)
    const [idMovie, setIdMovie] = useState(null)
    const [isMute, setIsMute] = useState(true)
    const [topMovies, setTopMovies] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)

    const truncateByWords = (text, maxWords = 60) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > maxWords
            ? words.slice(0, maxWords).join(" ") + "..."
            : text;
    };



    useEffect(() => {
        getMoviesByType({ moviesType: "top_rated" }).then(async result => {
            const movie = result[0]
            setTopMovies(movie)
            setIdMovie(movie.id)

            // Gunakan movie.id langsung di sini, bukan idMovie dari atom
            const video = await getMoviesUrl({ moviesId: movie.id })
            setVideoUrl(video)
        })
    }, [])

    return (
        <div className='relative h-[500px] w-full'>
            <ReactPlayer
                src={"https://www.youtube.com/watch?v=" + videoUrl}
                width={"100%"}
                height={"700px"}
                autoPlay={true}
                muted={isMute}
                controls={false}
                style={{ opacity: "70%" }}
            />
            <div className='absolute top-1/2 -translate-y-1/2 left-0 p-8 max-w-md'>
                <div className='flex flex-col gap-4 text-white' >
                    <h1 className='text-3xl sm:text-5xl font-black'>{topMovies.title}</h1>
                    <p className='hidden lg:block'>{truncateByWords(topMovies.overview)}</p>
                </div>
                <div className='flex gap-4 mt-4'>
                    <button
                        onClick={() => navigate("/watch/" + videoUrl)}
                        className='bg-gray-200 py-2 px-8 rounded-md text-xl font-black text-black flex items-center gap-1'>
                        <GoPlay />Play
                    </button>
                    <button
                        onClick={() => {
                            setIsOpenModal(true)
                            setIdMovieA(idMovie)
                        }}

                        className='bg-stone-800/80 px-8 py-2 rounded-md text-slate-50/50 hover:text-white'
                    >More Details
                    </button>
                </div>
            </div>
            <div className='absolute right-6 bottom-1/2 -translate-y-1/2 text-white'>
                <div
                    onClick={() => setIsMute(!isMute)}
                    className='border rounded-full p-2 cursor-pointer'>
                    {isMute ? <GoMute size={24} /> : <GoUnmute size={24} />}
                </div>

            </div>
        </div>
    )
}

export default Jumbotron