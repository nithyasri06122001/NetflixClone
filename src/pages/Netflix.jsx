import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assests/home.jpg";
import MovieLogo from "../assests/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

export default function Netflix() {
  const navigate=useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
//   const genres=useSelector((state)=>state.netflix.genres);
const movies=useSelector((state)=>state.netflix.movies);
  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(getGenres());
  },[])

  useEffect(()=>{
    if(genresLoaded){
    dispatch(fetchMovies({type:"all"}));
    }
  },[genresLoaded])

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };
  
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero-block">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="sub-title__logo logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={()=>navigate("/player")}>
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}
const Container = styled.div`
  background-color: black;
  .hero-block{
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: auto;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 0;
      .logo {
        img {
          width: auto;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .sub-title__logo{
        display:block;
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
