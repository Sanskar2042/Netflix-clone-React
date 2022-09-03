import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

const Banner = () => {

    const [movie, setMovie] = useState({});

    useEffect(()=>{
        const fetchData = async() =>{
            const request = await axios.get(requests.fetchNetflixOriginals);
            const randomNum = Math.floor(Math.random() * request.data.results.length-1);
            setMovie(request.data.results[randomNum]);
        }   
        fetchData();
    },[])

    const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

    return (
        <header className="banner"
            style={{
                backgroundSize:"cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "cover top",
            }}
        >  
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <div className="banner__description">
                    {truncate(movie?.overview, 150)}
                </div>
            </div>    
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner;
