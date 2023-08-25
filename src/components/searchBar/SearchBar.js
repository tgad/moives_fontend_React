import React, { useContext } from 'react';
import {Form} from 'react-bootstrap';
import Button from "react-bootstrap/Button";

import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

  const {searchMovie, seText, setSeText} = useContext(SearchContext);

  const navigate = useNavigate();



    const handleSearch = () => {

        searchMovie(seText);
        navigate(`/search/${seText}`)
        setSeText('');

      };  
    return (



        <Form className="form-inline me-2">
            <Form.Control type="text" placeholder="Search" className="mr-sm-2"
                value={seText} onChange={e => setSeText(e.target.value)} />

            <Button variant="outline-info ms-2" onClick={handleSearch}>Search</Button>
        </Form>
    )
}

export default SearchBar