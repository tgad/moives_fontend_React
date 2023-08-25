import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Hero = ({movies}) => {

  const navigate = useNavigate();


  function reviews(movieId) {

    navigate(`/reviews/${movieId}`);

  }




  return (
    <div className ='movie-carousel-container'>
    <Carousel>{
      //it just check the movies is not null but not check movies is empty
      // movies?.map((movie) => {
      //so it is better to use tenary method
      movies?.map((movie) =>{
        return (
        <Paper>
            <div className='movie-card-container'>
              <div class="movie-card"style={{"--img": `url(${movie.backdrops[0]})`}}>
                <div className="movie-detail">
                    <div className="movie-poster">
                        <img src={movie.poster} alt={movie.title} />
                    </div>
                    <div className="movie-title">
                        <h4>{movie.title}</h4>
                    </div>
                    <div class="movie-buttons-container">
                      <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length-11)}`}>
          
                      <div class="play-button-icon-container">
                        <FontAwesomeIcon className="play-button-icon"
                          icon = {faCirclePlay}/>
                      </div>
                      </Link>
                    </div>
                    <div class="movie-reviews-container">
                      <Button varient = "info" onClick = {() => reviews(movie.imdbId)}>Reviews</Button>
                    </div>
                </div>
              </div>
            </div>
        </Paper>)


      })
    
    }

    </Carousel>
    </div>
  )
}

export default Hero