import 'reactjs-popup/dist/index.css'

const Popup = props => {
  const {trigger} = props
  return (
    trigger && (
      <div>
        <h1>hello</h1>
      </div>
    )
  )
}

export default Popup
