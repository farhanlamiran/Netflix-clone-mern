import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { GoPlay, GoPlusCircle, GoChevronDown, GoTrash } from 'react-icons/go'
import { motion } from "framer-motion"
import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, isFetchingAtom, isOpenModalAtom, tokenAtom } from '@/jotai/atoms'
import { getMoviesUrl } from '@/utils/getMoviesUrl'
import Skeleton from './Skeleton'
import { useNavigate } from 'react-router-dom'
import { apiInstanceExpress } from '@/utils/apiInstance'
import Notification from '../../Elements/Notification'
import { checkFavotireMovies } from '@/utils/checkFavoriteMovies'

const MovieCard = ({ data, isHover, setIsHover, moviesType}) => {
  const navigate = useNavigate()

  const [idMovie, setIdMovie] = useAtom(idMovieAtom)
  const [, setIsOpenModal] = useAtom(isOpenModalAtom)
  const [isFetching] = useAtom(isFetchingAtom)
  const [emailStorage,] = useAtom(emailStorageAtom)
  const [tokenStorage,] = useAtom(tokenAtom)
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom)

  const [isSubmit, setIsSubmit] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [moviesTypeState, setMoviesTypeState] = useState(null)


  const handleAddFavoriteMovie = async () => {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true)
      const addMovie = await apiInstanceExpress.post('my-movies', {
        email: emailStorage,
        token: tokenStorage,
        data
      })
      if (addMovie.status !== 201) return setNotifMessage(`Film ${data.title} gagal ditambahkan`)
      setNotifMessage(`Film ${data.title} berhasil ditambahkan`)
      setIsFavorited(true)
      setTimeout(() => {
        setIsSubmit(false)
        setNotifMessage(null)
      }, 3000);
    } catch (error) {
      setNotifMessage(`sorry ${error.message}`)

      setTimeout(() => {
        setIsSubmit(false)
        setNotifMessage(null)
      }, 3000);
    }
  }

  const handleRemoveFavoriteMovie = async () => {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true)
      const removeMovie = await apiInstanceExpress.delete('my-movies', {
        // jika mau delete (request body) maka depannya harus ada data:{} itu syarat kalo mau delete
        data: {
          email: emailStorage,
          token: tokenStorage,
          movieID: data.id
        }
      })
      if (removeMovie.status !== 204) return setNotifMessage(`Film ${data.title} gagal dihapus`)
      setNotifMessage(`Film ${data.title} berhasil dihapus`)
      setIsFavorited(false)

      setTimeout(() => {
        setIsSubmit(false)
        setNotifMessage(null)
      }, 3000);

    } catch (error) {
      setNotifMessage(`sorry ${error.message}`)
      setTimeout(() => {
        setIsSubmit(false)
        setNotifMessage(null)
      }, 3000);
    }
  }

  if (isFetching) return <Skeleton />

  return (
    <>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      {/* hover video */}
      {isHover && idMovie == data.id && moviesType === moviesTypeState ? (
        <motion.div
          className='relative shadow-md transition-all w-full'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 0 }}
        >
          <div className="w-full h-[180px] overflow-hidden">
            <ReactPlayer
              src={videoUrl ? `https://youtube.com/watch?v=${videoUrl}` : null}
              playing={true}
              muted={true}
              loop={true}
              width="100%"
              height="180px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='absolute top-45 left-0 h-auto w-full p-4 bg-[#141414] flex flex-col gap-1.5 rounded-b-xl'>
            <section className='flex justify-between mt-1 text-white/50'>
              <div className='flex gap-2'>
                <button
                  onClick={() => navigate("/watch/" + videoUrl)}
                  className='hover:text-white transition-all'
                >
                  <GoPlay size={32} />
                </button>
                <button
                  onClick={isFavorited ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
                  className='hover:text-white transition-all'
                >
                  {isFavorited ? <GoTrash size={32} /> : <GoPlusCircle size={32} />}
                </button>
              </div>
              <div >
                <button
                  onClick={() => setIsOpenModal(true)}
                  className='rounded-full border-2 p-1 hover:text-white transition-all'>
                  <GoChevronDown size={20} />
                </button>
              </div>
            </section>
            <section className='text-left text-white'>
              <h2 className='font-semibold'>{data.title}</h2>
              <p className='text-green-400'>Popularity : {data.popularity}</p>
            </section>
          </div>
        </motion.div>
      ) :
        // image thumbnail
        <img
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
          className='h-72 w-full cursor-pointer object-cover rounded-xl'
          onMouseEnter={() => {
            setIsHover(true)
            setIdMovie(data.id)
            getMoviesUrl({ moviesId: data.id }).then(result => setVideoUrl(result))
            checkFavotireMovies({ emailStorage, tokenStorage, idMovie: data.id }).then(result => setIsFavorited(result))
            setMoviesTypeState(moviesType)

          }}
        />
      }
    </>

  )
}

export default MovieCard