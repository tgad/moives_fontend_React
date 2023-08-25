import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import  Container  from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import {Form} from 'react-bootstrap';
import "./Header.css";
import SearchBar from "../searchBar/SearchBar";
import  { useContext } from 'react';
import { SearchContext } from "../../context/SearchContext";
const Header = () => {
    const { resetSearch } = useContext(SearchContext);

  return (
    <Navbar bg = "dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href ="/" style = {{"color" :'gold'}}>
                <FontAwesomeIcon icon={faVideoSlash}/>gold
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id = "navbarScroll">
                <Nav 
                    className="me-auto my-2 my-lg-0"
                    style={{maxHeight: '100px'}}
                    navbarScroll
                    >
                    <NavLink className="nav-link" to ="/" onClick={resetSearch}>Home</NavLink>

                    <NavLink className="nav-link"to = "/watchList" onClick={resetSearch}>watchList</NavLink>

                    <NavLink className= "nav-link" to = "/search" onClick={resetSearch}> Search </NavLink>



                </Nav>
                
                <SearchBar/>
                <Button variant="outline-info" className = "me-2">Login</Button>
                <Button variant="outline-info">Register</Button>


            </Navbar.Collapse>
            



        </Container>


    </Navbar>
  )
}

export default Header