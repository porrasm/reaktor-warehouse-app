import axios from 'axios';

const getJsonResponse = async <T>(path: string, errorMode = ""): Promise<T> => {
    try {
        const response = await axios.get(path, {
            headers: {
                'x-force-error-mode': errorMode
            }
        })
        return response.data as T
    } catch (e) {
        console.log("Error fetching JSON from API: ", e.message, e)
        throw e
    }
}

export default getJsonResponse