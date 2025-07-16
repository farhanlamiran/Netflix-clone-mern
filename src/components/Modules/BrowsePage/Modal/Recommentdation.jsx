import { idMovieAtom, isOpenModalAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { getMoviesRecommendation } from '@/utils/getMoviesRecommendation'
import { getMoviesUrl } from '@/utils/getMoviesUrl'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { GoPlay } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const Recommentdation = () => {
    const navigate = useNavigate()

    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [,setIsOpenModal] = useAtom(isOpenModalAtom)
    const [moviesRecommendation, setMoviesRecommendation] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        if (idMovie) {
            getMoviesRecommendation({ movieId: idMovie }).then(result => setMoviesRecommendation(result))
        }
    }, [idMovie])

    return (
        <div className='px-4 py-2'>
            <h2 className='text-2xl font-bold text-white'>Movies Recommentdation</h2>
            <div className='grid grid-cols-3 gap-2 mt-4'>
                <EachUtils of={moviesRecommendation} render={(item, index) => (
                    <div 
                    key={index} 
                    className='w-full h-auto cursor-pointer rouded-md bg-[#141414]'
                    onMouseEnter={()=>{
                        getMoviesUrl({moviesId : item.id}).then(result=>setVideoUrl(result))
                    }}
                    >
                        <div className='relative text-white'>
                            {/* pertama */}
                            <img src={import.meta.env.VITE_BASE_URL_TMDB_IMAGE + item.poster_path} className='w-full h-48 rounded-t-md' />
                            <button
                                onClick={() => {
                                    navigate("/watch/" + videoUrl)
                                    setIsOpenModal(false)
                                    setIdMovie(null)
                                }}
                                className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-slate-50/50 hover:text-slate-50'>
                                <GoPlay size={44} />

                            </button>
                        </div>
                        <div className='text-white p-2'>
                            {/* kedua */}
                            <div className='flex gap-2'>
                                <p className=''>{item.release_date}</p>
                                <p className='text-green-400/90'>{item.vote_average}</p>
                            </div>
                            <p className='text-wrap pt-2 max-h-32 overflow-scroll'>{item.overview}</p>
                        </div>
                    </div>
                )} />

            </div>
        </div>
    )
}

export default Recommentdation