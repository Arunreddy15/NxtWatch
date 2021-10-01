import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Context from '../../context/Context'

import Header from '../Header'
import SideBar from '../SideBar'
import './gaming.css'

const jwtToken = Cookies.get('jwt_token')
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}
class Trending extends Component {
  state = {games: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  formatVideoData = each => ({
    id: each.id,
    thumbnailUrl: each.thumbnail_url,
    title: each.title,
    viewCount: each.view_count,
  })

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const api = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const formattedData = data.videos.map(each => this.formatVideoData(each))
      this.setState({
        games: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => {}

  renderSuccess = isLight => {
    const {games} = this.state
    console.log(isLight)

    return (
      <ul className="items-container-gaming">
        {games.map(each => (
          <Link to={`/videos/${each.id}`} className="nav-links">
            <li className="list-item-container-gaming" key={each.id}>
              <img
                src={each.thumbnailUrl}
                alt="thumbnailUrl"
                className="thumbnail-game"
              />
              <div>
                <p
                  className={
                    isLight ? 'title-game' : 'title-game title-game-dark'
                  }
                >
                  {each.title}
                </p>
                <p className="view-game">{each.viewCount} Watching Worldwide</p>
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
        return this.renderFailure()
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
                      <SiYoutubegaming size={24} className="icon-trending" />
                    </div>
                    <h1
                      className={
                        isLight
                          ? 'heading-trending'
                          : 'heading-trending heading-trending-dark'
                      }
                    >
                      Gaming
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
