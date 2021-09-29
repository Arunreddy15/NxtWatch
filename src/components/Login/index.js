import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    isLight: true,
    showPassword: false,
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = error => {
    this.setState({errorMsg: error, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data.jw_token)
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowOrNot = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeLightToDark = () => {
    this.setState(prevState => ({isLight: !prevState.isLight}))
  }

  renderLoginForm = () => {
    const {
      isLight,
      showPassword,
      username,
      password,
      showErrorMsg,
      errorMsg,
    } = this.state
    const logoImgUrl = isLight
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

    const passwordType = showPassword ? 'text' : 'password'

    const loginContainerBgColor = isLight
      ? 'login-container'
      : 'login-container dark-bg'
    const labelColor = isLight ? 'fields-label' : 'fields-label dark-label'
    const inputUserBorders = isLight ? 'inputUsername' : 'inputUsername dark'
    const inputPasswordBorders = isLight
      ? 'inputPassword'
      : 'inputPassword dark'
    return (
      <div className={loginContainerBgColor}>
        <img src={logoImgUrl} alt="logo" className="logo-image" />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <div className="input-user-box">
            <label htmlFor="username" className={labelColor}>
              USERNAME
            </label>
            <br />
            <input
              value={username}
              id="username"
              type="text"
              className={inputUserBorders}
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-password-box">
            <label htmlFor="password" className={labelColor}>
              PASSWORD
            </label>
            <br />
            <input
              value={password}
              id="password"
              type={passwordType}
              className={inputPasswordBorders}
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            <div className="show-password-box">
              <input
                type="checkbox"
                id="showPassword"
                onChange={this.onChangeShowOrNot}
                className="checkBox"
              />
              <label
                htmlFor="showPassword"
                className={
                  isLight ? 'show-label' : 'show-label dark-show-label'
                }
              >
                Show Password
              </label>
            </div>
          </div>

          <button className="loginBtn" type="submit">
            Login
          </button>
          {showErrorMsg ? <p className="error">{errorMsg}</p> : ''}
        </form>
        <input type="checkbox" onChange={this.onChangeLightToDark} />
      </div>
    )
  }

  render() {
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
    return <div className="login-page-container">{this.renderLoginForm()}</div>
  }
}
export default Login
