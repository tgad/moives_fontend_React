import React from 'react'
import { useState,useEffect } from 'react';
import { Grid, Card, CardMedia, CardActions, Typography, Button } from "@mui/material";
import api from '../../api/axiosConfig';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

const WatchList = () => {

    const [watchList, setWatchList] = useState();
    const navigate = useNavigate();

    function jumpPage(movieId) {

      navigate(`/reviews/${movieId}`);
  
    }

  





    const getWatchLists = async () =>{
   
    
        try
        {
          const response = await api.get("/api/v1/watchList");
  
    
          setWatchList(response.data);
    
          if (response.status === 200) {
            setWatchList(response.data);
          } else {
            console.log(response.data); // Log the "No movies found" message
          }
    
        } 
        catch(err)
        {
          console.log(err);
        }
      }

      const deleteWatchList = async(imdbId) =>{
        try {
          console.log("delete the watchList");
         const response = await api.delete("/api/v1/watchList",{data:{imdbId:imdbId}});
         setWatchList(response.data);
   
  
        }catch(err){
          console.log(err);
        }
      }
  


      const handleClick = (imdbId) => {

          deleteWatchList(imdbId);
     

    
      };
      useEffect(() => {
        getWatchLists();
    
      },[])
  return (
    <Grid container spacing={3}>
  
    {
      
        watchList && watchList.map((w) => (
          <Grid key={w.favorMovies.imdbId} item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 375 }}>
            <Grid container >
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  height="270"
                  style={{width:'180px'}}
               
                  image={w.favorMovies.poster} // Replace with your image source
                  alt={w.favorMovies.title} // Replace with your image alt text
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column" justifyContent="space-between" alignItems="center" style={{ height: '100%' }}>
                  <Typography variant="h5" component="div" style={{marginTop: '20px', marginLeft:'15px'}}>
                    {w.favorMovies.title}
                  </Typography>
                  <CardActions disableSpacing>

                  <Button variant="contained" className='searchButton' onClick = {() => jumpPage(w.favorMovies.imdbId)} >Review</Button>
                  <IconButton aria-label="add to favorites"  onClick={() => handleClick(w.favorMovies.imdbId)}>
                    <FavoriteIcon  style={{ color: 'red'  }}>
                      </FavoriteIcon>
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
  </Grid>  )

  
  }
export default WatchList