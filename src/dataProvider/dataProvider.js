import Axios from 'axios'
export const dataProvider = async (request) => {
    switch (request.method) {
        case 'GET':
            return await backendGet(request)
        case 'POST':
            break
        case 'PUT':
            return await backendPut(request)
        case 'DELETE':
            break
        default:
            break
    }
}

const backendGet = async (request) => {
    const response = await Axios.get(request.url)
    return response.data
}
const backendPut = async (request) => {
    const response = await Axios.put(request.url, request.data)
    return response.data
}
