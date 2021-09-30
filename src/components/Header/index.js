import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'

import {FaMoon, FaUserCircle} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'
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
            <div>
              <img src={logoImgUrl} alt="app-logo" className="navbar-logo" />
            </div>
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
                <FiMenu
                  size={30}
                  className={isLight ? 'menu-light' : 'menu-dark'}
                />
                <Popup
                  modal
                  trigger={
                    <FiLogOut
                      size={24}
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
// class Header extends Component {
//   state = {isLight: true}

//   onClickLightToDark = () => {
//     this.setState(prevState => ({isLight: !prevState.isLight}))
//   }

//   onClickLogout = () => {
//     const {history} = this.props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   renderNavbar = () => {
//     const {isLight} = this.state
//     const logoImgUrl = isLight
//       ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
//       : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

//     const navbarBgColor = isLight
//       ? 'nav-container'
//       : 'nav-container dark-nav-bg'
//     return (
//       <nav className={navbarBgColor}>
//         <div className="header-container">
//           <div>
//             <img src={logoImgUrl} alt="app-logo" className="navbar-logo" />
//           </div>
//           <div className="theme-user-logout-container">
//             {isLight ? (
//               <FaMoon
//                 size={25}
//                 onClick={this.onClickLightToDark}
//                 className="dark-theme"
//               />
//             ) : (
//               <BsBrightnessHigh
//                 onClick={this.onClickLightToDark}
//                 size={30}
//                 className="light-theme"
//               />
//             )}
//             <div className="user-logout-non-mobile">
//               <FaUserCircle size={30} className="profile-icon-light" />
//               <Popup
//                 modal
//                 trigger={
//                   <button type="button" className="logoutBtn">
//                     Logout
//                   </button>
//                 }
//                 className="popup-content"
//               >
//                 {close => (
//                   <div className="popup-page">
//                     <div className="popup-container">
//                       <p className="alert-message">
//                         Are you sure, you want to logout?
//                       </p>
//                       <div className="popup-buttons">
//                         <button
//                           type="button"
//                           className="cancel"
//                           onClick={() => close()}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           type="button"
//                           className="logout-in-popup"
//                           onClick={this.onClickLogout}
//                         >
//                           Confirm
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </Popup>
//             </div>
//             <div className="user-logout-mobile">
//               <FiMenu
//                 size={30}
//                 className={isLight ? 'menu-light' : 'menu-dark'}
//               />
//               <Popup
//                 modal
//                 trigger={
//                   <FiLogOut
//                     size={24}
//                     className={
//                       isLight ? 'logout-icon-light' : 'logout-icon-dark'
//                     }
//                   />
//                 }
//               >
//                 {close => (
//                   <div className="popup-page">
//                     <div className="popup-container">
//                       <p className="alert-message">
//                         Are you sure, you want to logout?
//                       </p>
//                       <div className="popup-buttons">
//                         <button
//                           type="button"
//                           className="cancel"
//                           onClick={() => close()}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           type="button"
//                           className="logout-in-popup"
//                           onClick={this.onClickLogout}
//                         >
//                           Confirm
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </Popup>
//             </div>
//           </div>
//         </div>
//       </nav>
//     )
//   }

//   render() {
//     return this.renderNavbar()
//   }
// }
export default withRouter(Header)
