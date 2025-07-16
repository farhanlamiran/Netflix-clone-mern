import EachUtils from '@/utils/EachUtils'
import React, { useEffect, useState } from 'react'
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, tokenAtom } from '@/jotai/atoms'
import MovieCard from '@/components/Modules/BrowsePage/MovieCard'
import { useAtom } from 'jotai'
import BrowseLayout from '@/components/Layouts/BrowseLayout'
import { apiInstanceExpress } from '@/utils/apiInstance'
import Modal from '@/components/Modules/BrowsePage/Modal'

const Favotire = () => {
    const [setIdMovie] = useAtom(idMovieAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [isFavorited] = useAtom(isFavoritedAtom)
    
    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])

    const GetFavoriteMovies = async () => {
        try {
            const url = `my-movies/${emailStorage}/${tokenStorage}`
            const movies = await apiInstanceExpress.get(url)
            if (movies.status === 200) return movies.data.data
        } catch (error) {
            return error
        }
    }



    useEffect(() => {
        if (emailStorage && tokenStorage) {
            GetFavoriteMovies().then(result => setMovieList(result.favoriteMovies))
        }
    }, [emailStorage, tokenStorage, isFavorited])

    return (
        <BrowseLayout>
            <div className='mt-20 px-8 z-50'>
                <h3 className='text-black font-bold text-2xl'>
                    Favorite Movies
                </h3>
                {movieList.length === 0 && <p className='mt-2 italic'>belum ada film favorite saat ini</p>}
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8  gap-4 px-8 py-8'>
                <EachUtils of={movieList} render={(item, index) => (
                    <div
                        className='h-72'
                        key={index}
                        onMouseLeave={() => { setIsHover(false), setIdMovie(null) }}
                    >
                        <MovieCard data={item} isHover={isHover} setIsHover={setIsHover}
                        />
                    </div>
                )} />
            </div>
            <Modal/>
        </BrowseLayout>
    )
}

export default Favotire