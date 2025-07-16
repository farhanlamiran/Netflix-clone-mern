import { apiInstance } from "./apiInstance"

export const getMovieDetail = async ({ movieId }) => {
    try {
        let movie = await apiInstance.get("movie/" + movieId)
        return movie.data
    } catch (error) {
        console.log(error)
    }

}