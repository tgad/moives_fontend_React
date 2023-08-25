import React from 'react';
import { createContext, useState } from 'react';
import api from '../api/axiosConfig';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [seText, setSeText] = useState('');

  const searchMovie = async (moviequery) => {
    try {
      const response = await api.get(`/api/v1/search/${moviequery}`);
      const findMovie = response.data;
      setSearchMovies(findMovie);
    } 
    catch (error) {
      console.error(error);
    }
  };

  const resetSearch = () => {
    setSearchMovies([]);
    // Add code to reset any other state variables related to the search if necessary
  };
  return (
    <SearchContext.Provider value={{ searchMovies, searchMovie, setSearchMovies,seText,setSeText,resetSearch}}>
      {children}
    </SearchContext.Provider>
  );
};