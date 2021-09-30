import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import Context from './context/Context'

// Replace your code here
class App extends Component {
  state = {isLight: true}

  changeAppMode = () => {
    this.setState(prevState => ({isLight: !prevState.isLight}))
  }

  render() {
    const {isLight} = this.state
    return (
      <Context.Provider value={{isLight, changeAppMode: this.changeAppMode}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
