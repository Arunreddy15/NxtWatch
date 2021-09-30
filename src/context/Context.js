import React from 'react'

const Context = React.createContext({
  isLight: true,
  changeAppMode: () => {},
})

export default Context
