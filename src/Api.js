// This file includes all the API calls using Axios: a promise library for the fetch API.
import axios from 'axios'

/* 
    API endpoints 
*/
// Stories, comments, jobs, Ask HNs and  polls
export function getItem(id) {
  return axios
    .get(`/item/${id}.json`)
    .then(payload => {
      return payload.data
    })
    .catch(err => {
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
      return Promise.reject(err)
    })
}

// The current largest item id
export function getMaxItem(id) {
  return axios
    .get(`/item/maxitem.json`)
    .then(payload => {
      return payload.data
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
