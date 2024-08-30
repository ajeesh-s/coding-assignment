//Avoid hardcoding sensitive information such as API keys directly in the code.
export const API_KEY = '8cac6dec66e09ab439c081b251304443'
export const ENDPOINT = 'https://api.themoviedb.org/3'
// The below URLs may have an extra '/' before the '?' in the query string, which could cause issues.
export const ENDPOINT_DISCOVER = ENDPOINT+'/discover/movie/?api_key='+API_KEY+'&sort_by=vote_count.desc'
export const ENDPOINT_SEARCH = ENDPOINT+'/search/movie/?api_key='+API_KEY
export const ENDPOINT_MOVIE = ENDPOINT+'/movie/507086?api_key='+API_KEY+'&append_to_response=videos'