import { apiInstance } from "./apiInstance"

export const getMoviesUrl = async ({ moviesId }) => {
    try {
        let url = await apiInstance.get("movie/" + moviesId + "/videos")
        return url.data.results[0].key
    } catch (error) {
        console.log(error)
    }

}