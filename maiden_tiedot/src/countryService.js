import axios from 'axios'

const url = 'https://restcountries.eu/rest/v2/all'


const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}
/*
const create = (newPerson) => {
    const request = axios.post(url,newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const newUrl = url + '/' + id
    console.log(newUrl)
    const request = axios.delete(newUrl)
    return request.then(response => response.data)
}
*/

export default { getAll}