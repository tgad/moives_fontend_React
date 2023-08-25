import './App.css';
import api from './api/axiosConfig';
import { useState,useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import SearchMovie from './components/searchMovie/SearchMovie';
import { SearchProvider } from './context/SearchContext';
import WatchList from './components/watchList/WatchList';

function App() {

  const [movies, setMovies] = useState();

  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  


 



  const getMovies = async () =>{
    
    try
    {
      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

      if (response.status === 200) {
        setMovies(response.data);
      } else {
        console.log(response.data); // Log the "No movies found" message
      }

    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

 
  useEffect(() => {
    getMovies();

  },[])

  return (
 
    <div className="App">
       <SearchProvider>
      <Header/>

        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/"element = {<Home movies={movies} />}></Route>
            <Route path='/Trailer/:ytTrailerId' element ={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="/search/*" element={<SearchMovie getMovieData={getMovieData} movie={movie}/>} />
            <Route path= "/watchList" element= {<WatchList/>}></Route>


          </Route>
        </Routes>
        </SearchProvider>



    </div>
 
  );
}

export default App;
