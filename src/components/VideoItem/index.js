import {Link} from 'react-router-dom'
import Moment from 'moment'
import {BsDot} from 'react-icons/bs'
import Context from '../../context/Context'
import './videoitem.css'

const presentYear = new Date().getFullYear()
const VideoItem = props => (
  <Context.Consumer>
    {value => {
      const {isLight} = value
      const {eachVideoItem} = props
      const {
        id,
        publishedAt,
        title,
        channel,
        viewCount,
        thumbnailUrl,
      } = eachVideoItem

      const {name, profileImageUrl} = channel
      const date = Moment(publishedAt).format('YYYY')

      return (
        <Link to={`/videos/${id}`} className="nav-link-Item">
          <li
            className={
              isLight ? 'item-container' : 'item-container item-container-dark'
            }
          >
            <img
              src={thumbnailUrl}
              alt="thumbnail"
              className="thumbnail-image"
            />
            <div className="details-channel-container">
              <img
                src={profileImageUrl}
                alt="channel"
                className="channel-profile-img"
              />
              <div>
                <p
                  className={
                    isLight ? 'video-title' : 'video-title video-title-dark '
                  }
                >
                  {title}
                </p>
                <div className="channel-name-details">
                  <p className="channel-name">{name}</p>
                  <BsDot size={20} className="dot-icon-one" />
                  <div className="views-published-year">
                    <p className="views-count">{viewCount} views </p>
                    <BsDot size={20} className="dot-icon" />
                    <p className="published-year">
                      {presentYear - date} years ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </Context.Consumer>
)

export default VideoItem
