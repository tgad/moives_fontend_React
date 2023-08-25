import {useEffect, useState} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import './Reviews.css';
import React from 'react'
import ReviewPagination from '../reviewPagination/ReviewPagination';

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {


    let params = useParams();
    const movieId = params.movieId;

    const [revText, setRevText] = useState("");

    const [currentPage,setCurrentPage] = useState(1);

    const pageSize = 10;


    useEffect(()=>{
        getMovieData(movieId);
    },[getMovieData, movieId])


const addReview = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/api/v1/reviews",{reviewBody:revText,imdbId:movieId})




        setRevText("");//need to set first


        if(response.status === 200 || response.status === 201) {
           const updateReviews = [...reviews, {body: revText}];


        
            setReviews(updateReviews);
        }
        
    } catch(err){
        console.error(err);
    }
}

const totalPages =  movie?.reviewIds ? Math.ceil(movie.reviewIds.length / pageSize) : 0;

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className= "mt-2">
            <Col>
                <img src={movie?.poster} alt = ""></img>
            </Col>

            <Col>
                {
                    <>
                        <Row>
                            <Col>

                                <ReviewForm 
                                    handleSubmit={addReview} 
                                    revText={revText} 
                                    setRevText={setRevText} 
                                    labelText="Write a review"
                                />
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr/>
                            </Col>
                        </Row>                
                    </>
                }
                {
                      movie?.reviewIds
                      .slice()
                      .reverse()
                      .slice((currentPage-1)*pageSize, currentPage*pageSize)
                    .map((r) =>{
                   
                        return(
                            <>
                                <Row>
                                    <Col>
                                        <div className="review-container">
                                            <span className='review-text'>{r.body}</span>
                                            <span className="timestamp">{`(posted on ${r.reviewTimestamp})`}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr/>
                                    </Col>
                                </Row>   
                            </>
                        )
                    })
                }
                
                {movie?.reviewIds && movie?.reviewIds.length > 0 &&<ReviewPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
            </Col>
        </Row>
        <Row>
            <Col>
                <hr/>
            </Col>
        </Row>   

    </Container>
  )
}

export default Reviews