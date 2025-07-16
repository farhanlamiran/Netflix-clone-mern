import { apiInstanceExpress } from "./apiInstance"

export const checkFavotireMovies = async ({ emailStorage, tokenStorage, idMovie }) => {
    try {
        const isFavorited = await apiInstanceExpress.post('my-movies/check', {
            email: emailStorage,
            token: tokenStorage,
            movieID: idMovie
        })
        if (isFavorited.status === 200) return isFavorited.data.data.isFavorited
    } catch (error) {
        console.log(error)
    }
}