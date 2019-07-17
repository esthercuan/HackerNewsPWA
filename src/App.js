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

    console.log('scroll!', this.state.items[this.state.items.length - 1])
    this.setState({ fetching: true })

    this.getItems(this.state.items[this.state.items.length - 1].id - 1)
  }

  getItems = id => {
    for (let index = 0; index < 250; index++) {
      getItem(id - index).then(item => {
        this.setState({ fetching: false })
        // filter for only items that exist of type story and have a url
        if (item && item.type === 'story' && !item.deleted && item.url) {
          this.setState(prevState => ({
            items: [...prevState.items, item],
          }))
        }
      })
    }
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
                  <p className="HN-time">{moment.unix(item.time).format('MMM-DD-YYYY')}</p>
                </div>
              </div>
            ))}
          </div>
        </header>
      </div>
    )
  }
}
