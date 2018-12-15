import axios from 'axios'

const url = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(url)
    const nonExisting = {
        id: 10000,
        name: 'Ei palvelimella henkilö',
        number: '677890'
    }
    return request.then(response => response.data.concat(nonExisting))
}

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

//_______________________________________________[PUT]
const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
  }//update


export default { getAll, create, remove, update}