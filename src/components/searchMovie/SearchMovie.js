import React from 'react'
import SearchBar from '../searchBar/SearchBar';
import { SearchContext } from '../../context/SearchContext';
import { useContext,useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useLocation } from 'react-router-dom';
import { Grid, Card, CardMedia, CardActions, Typography, Button } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

const SearchMovie = ({getMovieData,movie}) => {

const [fullMovieData, setFullMovieData] = useState([]);

const {searchMovies} = useContext(SearchContext);
const [favoritedMovies, setFavoritedMovies] = useState([]);
const location = useLocation();

const navigate = useNavigate();

const [checkFavor,setCheckFavor] = useState(false);

const getFullMovieData = async (imdbId) => {
  try {
    const response = await api.get(`/api/v1/movies/${imdbId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


function jumpPage(movieId) {

    navigate(`/reviews/${movieId}`);

  }
useEffect(()=>{


if(location.pathname === '/search') {
  setFullMovieData([]);

}

},[location]);






const addWatchList = async (imdbId) => {
  try {
    const response = await api.post("/api/v1/watchList", { imdbId: imdbId, isFavor: true });
    if(!favoritedMovies.includes(imdbId)) {
      setFavoritedMovies((prevFavoritedMovies) => [...prevFavoritedMovies, imdbId]);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteWatchList = async(imdbId) =>{
  try {
    console.log("delete the watchList");
   const response = await api.delete("/api/v1/watchList",{data:{imdbId:imdbId}});
       // remove the movie id from favoritedMovies array
       setFavoritedMovies(prevMovies => prevMovies.filter(movieId => movieId !== imdbId));


  }catch(err){
    console.log(err);
  }
}

const handleClick = (imdbId) => {

  if(!favoritedMovies.includes(imdbId))  {
    addWatchList(imdbId);

  }else{
    deleteWatchList(imdbId);
  }



};

useEffect(() => {


  const fetchFullMovieData = async () => {
    const fullDataPromises = searchMovies.map(movie => getFullMovieData(movie.imdbId));
    const fullData = await Promise.all(fullDataPromises);
    setFullMovieData(fullData);
  };
  
  if(searchMovies.length > 0) {
    fetchFullMovieData();
  }

}, [searchMovies]);

  





  return (
  <div>
      <SearchBar setFullMovieData  = {setFullMovieData }  />
      
      <div>
      <h1>Search Results</h1>
      <Grid container spacing={3}>
  
          {
            
              fullMovieData && fullMovieData.map((movie) => (
                <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 375 }}>
                  <Grid container >
                    <Grid item xs={6}>
                      <CardMedia
                        component="img"
                        height="270"
                        style={{width:'180px'}}
                     
                        image={movie.poster} // Replace with your image source
                        alt={movie.title} // Replace with your image alt text
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container direction="column" justifyContent="space-between" alignItems="center" style={{ height: '100%' }}>
                        <Typography variant="h5" component="div" style={{marginTop: '20px', marginLeft:'15px'}}>
                          {movie.title}
                        </Typography>
                        <CardActions disableSpacing>

                        <Button variant="contained" className='searchButton' onClick = {() => jumpPage(movie.imdbId)} >Review</Button>
                        <IconButton aria-label="add to favorites" onClick={()=> handleClick(movie.imdbId)}>
                        <FavoriteIcon style={{ color: favoritedMovies.includes(movie.imdbId) ? 'red' : 'grey' }}/>

                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
                </Grid>
         
              ))
            
          }
        </Grid>
      </div>
  </div>
  )
}

export default SearchMovie