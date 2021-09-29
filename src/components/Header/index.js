import {Component} from 'react'
import Popup from 'reactjs-popup'

import {FaMoon, FaUserCircle} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'
import {FiLogOut, FiMenu} from 'react-icons/fi'
// import Popup from '../Popup'
import './header.css'

class Header extends Component {
  state = {isLight: true, logout: false}

  onClickLightToDark = () => {
    this.setState(prevState => ({isLight: !prevState.isLight}))
  }

  onClickLogout = () => {
    this.setState({logout: true})
  }

  renderNavbar = () => {
    const {isLight, logout} = this.state
    const logoImgUrl = isLight
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

    const navbarBgColor = isLight
      ? 'nav-container'
      : 'nav-container dark-nav-bg'
    return (
      <nav className={navbarBgColor}>
        <div className="header-container">
          <div>
            <img src={logoImgUrl} alt="app-logo" className="navbar-logo" />
          </div>
          <div className="theme-user-logout-container">
            {isLight ? (
              <FaMoon
                size={25}
                onClick={this.onClickLightToDark}
                className="dark-theme"
              />
            ) : (
              <BsBrightnessHigh
                onClick={this.onClickLightToDark}
                size={30}
                className="light-theme"
              />
            )}
            <div className="user-logout-non-mobile">
              <FaUserCircle size={30} className="profile-icon-light" />
              <button
                type="button"
                className="logoutBtn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              {/* <Popup trigger={logout} /> */}
            </div>
            <div className="user-logout-mobile">
              <FiMenu
                size={30}
                className={isLight ? 'menu-light' : 'menu-dark'}
              />
              <FiLogOut
                size={24}
                className={isLight ? 'logout-icon-light' : 'logout-icon-dark'}
              />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  render() {
    return this.renderNavbar()
  }
}
export default Header
