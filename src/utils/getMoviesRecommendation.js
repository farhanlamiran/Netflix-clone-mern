import { apiInstance } from "./apiInstance"

export const getMoviesRecommendation = async ({ movieId }) => {
  try {
    const movies = await apiInstance.get("movie/" + movieId + "/recommendations")
    return movies.data.results
  } catch (error) {
    console.log(error)
  }
}