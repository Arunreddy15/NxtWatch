import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Moment from 'moment'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import {BsDot} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import Context from '../../context/Context'

import './index.css'

const jwtToken = Cookies.get('jwt_token')

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}
const presentYear = new Date().getFullYear()
class VideoItemDetails extends Component {
  state = {
    videoItemData: {},
    similarVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoItemData()
  }

  formattedSimilarData = each => ({
    channel: {
      name: each.channel.name,
      profileImageUrl: each.channel.profile_image_url,
    },
    id: each.id,
    title: each.title,
    publishedAt: each.published_at,
    videoUrl: each.video_url,
    viewCount: each.view_count,
    thumbnailUrl: each.thumbnail_url,
  })

  formattedVideos = videoData => ({
    channel: {
      name: videoData.channel.name,
      profileImageUrl: videoData.channel.profile_image_url,
    },
    id: videoData.id,
    publishedAt: videoData.published_at,
    description: videoData.description,
    title: videoData.title,
    videoUrl: videoData.video_url,
    viewCount: videoData.view_count,
    thumbnailUrl: videoData.thumbnail_url,
  })

  getVideoItemData = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const SimilarVideos = fetchedData.similar_videos.map(each =>
        this.formattedSimilarData(each),
      )
      const videoDetails = this.formattedVideos(fetchedData.video_details)
      this.setState({videoItemData: videoDetails, similarVideos: SimilarVideos})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInprogress = () => (
    <div className="videos-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideoContainer = isLight => {
    const {videoItemData} = this.state
    const {
      videoUrl,
      viewCount,
      channel,
      publishedAt,
      description,
      title,
    } = videoItemData
    console.log(channel.name)
    // const {name, profileImageUrl} = channel
    const date = Moment(publishedAt).format('YYYY')

    return (
      <div>
        <div className="video-container">
          <ReactPlayer url={videoUrl} width={1250} height={550} controls />
        </div>
        <div className="video-details">
          <p
            className={isLight ? 'video-title' : 'video-title video-title-dark'}
          >
            {title}
          </p>
          <div className="views-pub-like-dislike-container">
            <div className="views-pub">
              <p>{viewCount} views</p>
              <BsDot />
              <p>{presentYear - date} years ago</p>
            </div>
            <div className="like-dislike-save">
              <div className="metrics">
                <BiLike size={26} className="like" />
                Like
              </div>
              <div className="metrics">
                <BiDislike
                  size={26}
                  className={isLight ? 'dislike' : 'dislike dislike-dark'}
                />
                Dislike
              </div>
              <div className="metrics">
                <MdPlaylistAdd
                  size={26}
                  className={isLight ? 'save' : 'save save-dark'}
                />
                Save
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* <div>
          <img
            src={profileImageUrl}
            alt="channel"
            className="channel-profile"
          />
          <div>
            <p>{channel.name}</p>
            <p>{channel.description}</p>
          </div>
        </div> */}
      </div>
    )
  }

  renderSimilarVideosContainer = () => {}

  renderSuccess = isLight => (
    <>
      {this.renderVideoContainer(isLight)}
      {this.renderSimilarVideosContainer(isLight)}
    </>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        className="failure-image"
      />
      <h1 className="failure-view-text-heading">Oops! Something Went Wrong</h1>
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
              <div
                className={
                  isLight
                    ? 'video-item-page'
                    : 'video-item-page video-item-page-dark'
                }
              >
                <SideBar />
                <div
                  className={
                    isLight
                      ? 'video-item-body'
                      : 'video-item-body video-item-body-dark'
                  }
                >
                  {this.renderResponseVideoData(isLight)}
                </div>
              </div>
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default VideoItemDetails
