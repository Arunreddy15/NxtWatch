import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'

import {FaMoon, FaUserCircle} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'
import {RiCloseFill} from 'react-icons/ri'
import {FiLogOut, FiMenu} from 'react-icons/fi'
import Context from '../../context/Context'

import './header.css'

const Header = props => (
  <Context.Consumer>
    {value => {
      const {isLight, changeAppMode} = value
      const onClickLightToDark = () => changeAppMode()

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const logoImgUrl = isLight
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      const navbarBgColor = isLight
        ? 'nav-container'
        : 'nav-container dark-nav-bg'
      return (
        <nav className={navbarBgColor}>
          <div className="header-container">
            <Link to="/" className="nav-links">
              <img src={logoImgUrl} alt="app-logo" className="navbar-logo" />
            </Link>

            <div className="theme-user-logout-container">
              {isLight ? (
                <FaMoon
                  size={25}
                  onClick={onClickLightToDark}
                  className="dark-theme"
                />
              ) : (
                <BsBrightnessHigh
                  onClick={onClickLightToDark}
                  size={30}
                  className="light-theme"
                />
              )}
              <div className="user-logout-non-mobile">
                <FaUserCircle size={30} className="profile-icon-light" />
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className={isLight ? 'logoutBtn' : 'logoutBtn-dark'}
                    >
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div className="popup-page">
                      <div className="popup-container">
                        <p className="alert-message">
                          Are you sure, you want to logout?
                        </p>
                        <div className="popup-buttons">
                          <button
                            type="button"
                            className="cancel"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="logout-in-popup"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
              <div className="user-logout-mobile">
                <Popup
                  modal
                  trigger={
                    <FiMenu
                      size={26}
                      className={isLight ? 'menu-light' : 'menu-dark'}
                    />
                  }
                >
                  {close => (
                    <div className="popup-menu-container">
                      <RiCloseFill
                        onClick={() => close()}
                        size={26}
                        className="close-button"
                      />
                      <div className="menu-items-container">
                        <Link to="/" className="nav-links">
                          <p className="navigation">Home</p>
                        </Link>
                        <Link to="/trending" className="nav-links">
                          <p className="navigation">Trending</p>
                        </Link>
                        <Link to="/gaming" className="nav-links">
                          <p className="navigation">Gaming</p>
                        </Link>
                        <Link to="/savedvideos" className="nav-links">
                          <p className="navigation">Saved Videos</p>
                        </Link>
                      </div>
                    </div>
                  )}
                </Popup>

                <Popup
                  modal
                  trigger={
                    <FiLogOut
                      size={22}
                      className={
                        isLight ? 'logout-icon-light' : 'logout-icon-dark'
                      }
                    />
                  }
                >
                  {close => (
                    <div className="popup-page">
                      <div className="popup-container">
                        <p className="alert-message">
                          Are you sure, you want to logout?
                        </p>
                        <div className="popup-buttons">
                          <button
                            type="button"
                            className="cancel"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="logout-in-popup"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </nav>
      )
    }}
  </Context.Consumer>
)
export default withRouter(Header)
