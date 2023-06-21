import axios from 'axios';
import { useEffect,useState } from 'react';
import './App.css';


function App() {

  const [movies, setMovies] = useState([])
  const [toggler, setToggler] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      movieName : e.target['movieName'].value
    }
    axios.post(`${process.env.REACT_APP_BE_URL}/movies`, data)
    .then(res => setToggler(oldState => !oldState))
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BE_URL}/movies`)
    .then(res => setMovies(res.data.movies))
    .catch(err=> console.log(err));
  }, [toggler])

  return (
    <div className="App">
      <header className="App-header">
        <h2>Movies App</h2>
        <form onSubmit={submitHandler}>
          <input type="text" name='movieName' placeholder='Please enter the movie name'/>
          <input type='submit' value="Add Movie" />
        </form>
        <h3>List of Stored Movies</h3>
        {movies.map(item => <div>{item.movieName}</div>)}
      </header>
    </div>
  );
}

export default App;
