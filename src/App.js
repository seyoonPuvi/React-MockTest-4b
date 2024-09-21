import {Component} from 'react'
import Loading from './components/Loader'
import Header from './components/Header'
import Failure from './components/Failure'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    projectList: [],
    category: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {category} = this.state

    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessFetchData(data.projects)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSuccessFetchData = data => {
    const formattedList = data.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
    }))

    this.setState({
      apiStatus: apiStatusConstants.success,
      projectList: formattedList,
    })
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value}, this.fetchData)
  }

  onRenderSuccessApi = () => {
    const {projectList} = this.state

    return (
      <ul className="project-list-cont">
        {projectList.map(each => (
          <li key={each.id}>
            <img src={each.imageUrl} alt={each.name} />
            <p className="name">{each.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  onRenderApiViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loading />
      case apiStatusConstants.success:
        return this.onRenderSuccessApi()
      case apiStatusConstants.failure:
        return <Failure fetchData={this.fetchData} />
      default:
        return null
    }
  }

  render() {
    const {category} = this.state
    return (
      <>
        <Header />
        <div className="container">
          <select value={category} onChange={this.onChangeCategory}>
            {categoriesList.map(each => (
              <option value={each.id} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          {this.onRenderApiViews()}
        </div>
      </>
    )
  }
}

export default App
