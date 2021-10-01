import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import Context from '../../context/Context'
import './index.css'

const SideBar = () => (
  <Context.Consumer>
    {value => {
      const {isLight} = value
      return (
        <div className={isLight ? 'side-bar' : 'side-bar side-bar-dark'}>
          <ul className="navigators-container">
            <Link to="/" className="nav-links">
              <li className="navigator-item">
                <AiFillHome
                  size={23}
                  className={isLight ? 'icons' : 'icons-dark'}
                />
                <p className={isLight ? 'nav-link' : 'nav-link-dark'}>Home</p>
              </li>
            </Link>
            <Link to="/trending" className="nav-links">
              <li className="navigator-item">
                <HiFire
                  size={23}
                  className={isLight ? 'icons' : 'icons-dark'}
                />
                <p className={isLight ? 'nav-link' : 'nav-link-dark'}>
                  Trending
                </p>
              </li>
            </Link>
            <Link to="/gaming" className="nav-links">
              <li className="navigator-item">
                <SiYoutubegaming
                  size={23}
                  className={isLight ? 'icons' : 'icons-dark'}
                />
                <p className={isLight ? 'nav-link' : 'nav-link-dark'}>Gaming</p>
              </li>
            </Link>
            <Link to="/savedvideos" className="nav-links">
              <li className="navigator-item">
                <MdPlaylistAdd
                  size={29}
                  className={isLight ? 'icons' : 'icons-dark'}
                />
                <p className={isLight ? 'nav-link' : 'nav-link-dark'}>
                  Saved Videos
                </p>
              </li>
            </Link>
          </ul>
          <div>
            <p className={isLight ? 'contact-us' : 'contact-us-dark'}>
              CONTACT US
            </p>
            <li className="logos-list">
              <button type="button" className="icons-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook-in-logo"
                  className="social-icons"
                />
              </button>
              <button type="button" className="icons-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter-in-logo"
                  className="social-icons"
                />
              </button>
              <button type="button" className="icons-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked-in-logo"
                  className="social-icons"
                />
              </button>
            </li>
            <p className={isLight ? 'description' : 'description-dark'}>
              Enjoy! Now to see your channels and recommendations
            </p>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)
export default SideBar
