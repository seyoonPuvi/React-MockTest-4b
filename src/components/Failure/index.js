import './index.css'

const Failure = props => (
  <div className="failure-cont">
    <img
      src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
      alt="failure view"
      className="failure-img"
    />
    <h1>Oops! Something Went Wrong</h1>
    <p>We Cannot seem to find the page you are looking for.</p>
    <button
      type="button"
      onClick={() => props.fetchData()}
      className="retryBtn"
    >
      Retry
    </button>
  </div>
)

export default Failure
