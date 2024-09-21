import Loader from 'react-loader-spinner'
import './index.css'

const Loading = () => (
  <div className="loaderContainer" data-testid="loader">
    <Loader type="ThreeDots" color="green" height="100" width="100" />
  </div>
)

export default Loading
