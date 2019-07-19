import React from 'react'
import axios from 'axios'
import './App.css'
import { getMaxItem, getItem } from './Api.js'
import moment from 'moment'

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0'
// Expect all requests to be in JSON unless specified
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default class App extends React.Component {
  state = {
    items: [],
    fetching: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    getMaxItem().then(id => this.getItems(id))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return
    // Do not fetch until we are done loading all elements
    if (this.state.fetching) {
      return
    }
    // pass the next id to be used for item fetching
    this.getItems(this.state.items[this.state.items.length - 1].id - 1)
  }

  getItems = async id => {
    this.setState({ fetching: true })
    for (let index = 0; index < 200; index++) {
      // await allows for us to pause the loops execution
      let item = await getItem(id - index)
      // filter for only items that exist of type story and have a url
      if (item && item.type === 'story' && !item.deleted && item.url) {
        // render as each item is succesfully recieved
        this.setState(prevState => ({
          items: prevState.items.concat(item),
        }))
      }
    }
    this.setState({ fetching: false })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hacker News Feed</h1>
          <a
            className="App-link"
            href="https://esthercuan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            by Esther Cuan
            <span role="img" className="Emoji" aria-label="sunflower emoji">
              🌻
            </span>
          </a>
          <div className="Content-Container">
            {this.state.items.map(item => (
              <div key={item.id} className="Item">
                <a href={item.url} rel="noopener noreferrer" target="_blank" className="HN-title">
                  {item.title}
                </a>
                <div className="Subtitle">
                  <p className="HN-author">{item.by}</p>
                  <p className="HN-time">{moment.unix(item.time).format('MMM-DD-YYYY HH:mm A')}</p>
                </div>
              </div>
            ))}
            {this.state.fetching && (
              <p className="Loading">
                <span role="img" className="Emoji" aria-label="hourglass emoji">
                  ⏳
                </span>
                Loading ...{' '}
              </p>
            )}
          </div>
        </header>
      </div>
    )
  }
}
