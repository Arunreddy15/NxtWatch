import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BiSearch} from 'react-icons/bi'
import {RiCloseFill} from 'react-icons/ri'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'
import Context from '../../context/Context'
import './home.css'

const jwtToken = Cookies.get('jwt_token')
console.log(jwtToken)

// const navigatorsList = [
//   {id: 'HOME', displayName: 'Home', icon: ' AiFillHome size={24} '},
//   {id: 'TRENDING', displayName: 'Trending', icon: 'HiFire'},
//   {id: 'GAMES', displayName: 'Games', icon: 'SiYoutubegaming'},
//   {id: 'SAVEDVIDEOS', displayName: 'Saved Videos', icon: 'SiYoutubegaming'},
// ]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    bannerShow: true,
  }

  componentDidMount() {
    this.getData()
  }

  onClickRetry = () => {
    this.getData()
  }

  onClickClose = () => {
    this.setState({bannerShow: false})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getData()
  }
  //   formattedData = each => (channel: each.channel)

  getData = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const api = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const fetchedData = data.videos.map(each => ({
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        title: each.title,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))

      this.setState({
        videosData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInprogress = () => (
    <div className="videos-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccess = isLight => {
    const {videosData} = this.state

    const isSearchNotFound = videosData.length === 0
    return isSearchNotFound ? (
      <div className="no-video-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no video"
          className="no-video-image"
        />
        <h1
          className={
            isLight
              ? 'no-search-results-heading'
              : 'no-search-results-heading no-search-results-heading-dark'
          }
        >
          No Search Results Found
        </h1>
        <p className="no-search-results-description">
          Try different key words or remove search filter
        </p>
        <button
          type="button"
          onClick={this.onClickRetry}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    ) : (
      <ul className="container-items">
        {videosData.map(each => (
          <VideoItem key={each.id} eachVideoItem={each} />
        ))}
      </ul>
    )
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

  renderResponseData = isLight => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailure(isLight)
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.in_progress:
        return this.renderInprogress()
      default:
        return null
    }
  }

  render() {
    const {searchInput, bannerShow} = this.state

    return (
      <Context.Consumer>
        {value => {
          const {isLight} = value

          return (
            <div>
              <Header />
              <div className="home-container">
                <SideBar />

                <div
                  className={isLight ? 'home-content' : 'home-content-bg-dark'}
                >
                  <div
                    className={
                      bannerShow ? 'ads-banner-show' : 'ads-banner-hide'
                    }
                  >
                    <button
                      type="button"
                      className="banner-close-button"
                      onClick={this.onClickClose}
                    >
                      <RiCloseFill className="banner-close" size={22} />
                    </button>
                    <div className="banner-text-content">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="website-logo"
                        className="logo-banner"
                      />
                      <p className="banner-text">
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </p>
                      <button type="button" className="gift-now-button">
                        GIFT IT NOW
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      isLight
                        ? 'home-content-body'
                        : 'home-content-body home-content-body-dark'
                    }
                  >
                    <div className="search-container">
                      <input
                        value={searchInput}
                        type="search"
                        placeholder="Search"
                        className={
                          isLight
                            ? 'search-input'
                            : 'search-input search-input-dark'
                        }
                        onChange={this.onChangeSearch}
                      />
                      <button
                        type="button"
                        className="searchBtn"
                        onClick={this.onClickSearch}
                      >
                        <BiSearch
                          size={28}
                          className="search-icon"
                          color={isLight ? '#272727' : '#fff'}
                        />
                      </button>
                    </div>

                    {this.renderResponseData(isLight)}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
