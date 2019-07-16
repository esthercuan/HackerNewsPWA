// This file includes all the API calls using Axios: a promise library for the fetch API.
import axios from 'axios'

/* 
    API endpoints 
*/
// The current largest item id is at /v0/maxitem. You can walk backward from here to discover all items.
export function getItem(id) {
  return axios
    .get(`/item/${id}.json`)
    .then(payload => {
      return payload.data
    })
    .catch(err => {
      // console.error('GET failed on getUser')
      return Promise.reject(err)
    })
}

//Up to 500 top and new stories are at /v0/topstories (also contains jobs) and /v0/newstories. Best stories are at /v0/beststories.
export function getTopStories() {
  return axios
    .get('/topstories.json')
    .then(payload => {
      return payload.data
    })
    .catch(err => {
      // console.error('GET failed on getUser')
      return Promise.reject(err)
    })
}
