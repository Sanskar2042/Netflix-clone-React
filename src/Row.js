import React, { useEffect, useState } from "react";
import axios from "./axios";
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const baseImgUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({title, fetchUrl, isLargeRow}) =>{

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(()=>{
        const fetchData = async() =>{
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    },[fetchUrl]);

    const opts = {
        height:"390",
        width:"100%",
        playerVars: {
            autoplay:1,
        },
    }

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
            .then((url)=>{
                // https://www.youtube.com/watch?v=SOxmA-nKfbU
                const urlParams = new URLSearchParams(new URL(url).search);
                console.log(urlParams);
                setTrailerUrl(urlParams.get('v'));  
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map((movie)=>{
                        return <img 
                        key={movie.id} 
                        onClick={()=>handleClick(movie)}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`} 
                        src={`${baseImgUrl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                        alt={movie.name}/>
                    })
                }    
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>  
    )
}

export default Row;
