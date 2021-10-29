import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Moment from 'moment'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import Header from '../Header'

import SideBar from '../SideBar'
import Context from '../../context/Context'
import './saved.css'

const presentYear = new Date().getFullYear()

class SavedVideos extends Component {
  renderSavedVideos = (isLight, savedVideos) => (
    <div
      className={
        isLight ? 'trending-videos' : 'trending-videos trending-videos-dark'
      }
    >
      <div
        className={
          isLight ? 'trending-body' : ' trending-body trending-body-dark'
        }
      >
        <div
          className={
            isLight
              ? 'trending-body-top-bar'
              : 'trending-body-top-bar trending-body-top-bar-dark'
          }
        >
          <div
            className={
              isLight ? 'icon-container' : 'icon-container icon-container-dark'
            }
          >
            <HiFire size={24} className="icon-trending" />
          </div>
          <h1
            className={
              isLight
                ? 'heading-trending'
                : 'heading-trending heading-trending-dark'
            }
          >
            Saved Videos
          </h1>
        </div>
        <div
          className={
            isLight ? 'trending-videos' : 'trending-videos trending-videos-dark'
          }
        >
          <ul className="items-container-trending">
            {savedVideos.map(each => (
              <Link to={`/videos/${each.id}`} className="nav-links">
                <li className="list-item-container-trending" key={each.id}>
                  <img
                    src={each.thumbnailUrl}
                    alt="thumbnailUrl"
                    className="thumbnail-trending"
                  />
                  <div className="trending-details-non-mobile">
                    <p
                      className={
                        isLight ? 'title-video' : 'title-video title-video-dark'
                      }
                    >
                      {each.title}
                    </p>
                    <p className="channel-video">{each.channel.name}</p>

                    <div className="year-views">
                      <p className="year-video">
                        {presentYear - Moment(each.publishedAt).format('YYYY')}{' '}
                        years ago
                      </p>
                      <BsDot size={26} />
                      <p className="view-video">{each.viewCount} views</p>
                    </div>
                  </div>
                  <div className="trending-details-mobile">
                    <img
                      src={each.channel.profile_image_url}
                      alt="profile"
                      className="profile-image"
                    />
                    <div>
                      <p
                        className={
                          isLight
                            ? 'title-video'
                            : 'title-video title-video-dark'
                        }
                      >
                        {each.title}
                      </p>

                      <div className="year-views">
                        <p className="channel-video">{each.channel.name}</p>
                        <BsDot size={26} />
                        <p className="year-video">
                          {presentYear -
                            Moment(each.publishedAt).format('YYYY')}{' '}
                          years ago
                        </p>
                        <BsDot size={26} />
                        <p className="view-video">{each.viewCount} views</p>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isLight, savedVideos} = value
          console.log(savedVideos)
          const isSavedOnes = savedVideos.length === 0
          return (
            <>
              <Header />
              <div className="saved-videos-page">
                <SideBar />
                {isSavedOnes ? (
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
                ) : (
                  this.renderSavedVideos(isLight, savedVideos)
                )}
              </div>
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default SavedVideos
