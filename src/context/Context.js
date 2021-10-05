import React from 'react'

const Context = React.createContext({
  isLight: true,
  changeAppMode: () => {},
  savedVideos: [],
  onSaveVideos: () => {},
})

export default Context
