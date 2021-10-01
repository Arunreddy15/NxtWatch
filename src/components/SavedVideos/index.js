import {Component} from 'react'
import Header from '../Header'

import SideBar from '../SideBar'
import Context from '../../context/Context'
import './saved.css'

class SavedVideos extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isLight} = value
          return (
            <>
              <Header />
              <div className="saved-videos-page">
                <SideBar />
                <div className="saved-videos-body">
                  <div className="no-video-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      className="no-videos-found"
                    />
                    <h1
                      className={
                        isLight
                          ? 'no-video-heading'
                          : 'no-video-heading no-video-heading-dark'
                      }
                    >
                      No Saved Videos Found
                    </h1>
                    <p className="no-video-description">
                      You can save your videos while watching them
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default SavedVideos
