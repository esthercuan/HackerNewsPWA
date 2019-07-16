import React from 'react'
import axios from 'axios'
import './App.css'
import { getTopStories, getItem } from './Api.js'

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0'
// Expect all requests to be in JSON unless specified
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default class App extends React.Component {
  state = {
    items: [],
  }

  componentDidMount() {
    getTopStories().then(data => {
      data.map(id =>
        getItem(id).then(item => {
          this.setState(prevState => ({
            items: prevState.items.concat(item),
          }))
        })
      )
    })
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
                <p className="HN-author">{item.by}</p>
              </div>
            ))}
          </div>
        </header>
      </div>
    )
  }
}
