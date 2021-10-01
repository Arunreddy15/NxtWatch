import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Moment from 'moment'
import {BsDot} from 'react-icons/bs'
import Context from '../../context/Context'

import Header from '../Header'
import SideBar from '../SideBar'
import './trending.css'

const presentYear = new Date().getFullYear()

const jwtToken = Cookies.get('jwt_token')
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}
class Trending extends Component {
  state = {trendingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  formatVideoData = each => ({
    channel: each.channel,
    id: each.id,
    publishedAt: each.published_at,
    thumbnailUrl: each.thumbnail_url,
    title: each.title,
    viewCount: each.view_count,
  })

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const api = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.videos.map(each => this.formatVideoData(each))
      this.setState({
        trendingVideos: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = isLight => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        className="failure-image"
      />
      <h1
        className={
          isLight
            ? 'failure-view-text-heading'
            : 'failure-view-text-heading failure-view-text-heading-dark'
        }
      >
        Oops! Something Went Wrong
      </h1>
      <p className="failure-view-text">
        We are having some trouble to complete your request.
      </p>
      <p className="failure-view-text">Please try again.</p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = isLight => {
    const {trendingVideos} = this.state

    return (
      <ul className="items-container-trending">
        {trendingVideos.map(each => (
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
                      isLight ? 'title-video' : 'title-video title-video-dark'
                    }
                  >
                    {each.title}
                  </p>

                  <div className="year-views">
                    <p className="channel-video">{each.channel.name}</p>
                    <BsDot size={26} />
                    <p className="year-video">
                      {presentYear - Moment(each.publishedAt).format('YYYY')}{' '}
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
    )
  }

  renderInprogress = () => (
    <div className="videos-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderResponseVideoData = isLight => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailure(isLight)
      case apiStatusConstants.success:
        return this.renderSuccess(isLight)
      case apiStatusConstants.in_progress:
        return this.renderInprogress()
      default:
        return null
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isLight} = value
          return (
            <>
              <Header />

              <div className="trending-page">
                <SideBar />
                <div
                  className={
                    isLight
                      ? 'trending-body'
                      : ' trending-body trending-body-dark'
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
                        isLight
                          ? 'icon-container'
                          : 'icon-container icon-container-dark'
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
                      Trending
                    </h1>
                  </div>
                  <div
                    className={
                      isLight
                        ? 'trending-videos'
                        : 'trending-videos trending-videos-dark'
                    }
                  >
                    {this.renderResponseVideoData(isLight)}
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
export default Trending
