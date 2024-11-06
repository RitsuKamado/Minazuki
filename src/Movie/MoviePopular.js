import React, { useState, useEffect, useRef } from 'react';
import '../PopularAnime.css';
import { Link } from 'react-router-dom';

export function MoviePopular() {
  const [pageNumber, setPageNumber] = useState(1);
  const [results, setResults] = useState([]);
  const containerRef = useRef();
  
  useEffect(() => {
    //const apiUrl = `https://cors.swx.workers.dev/https://flixhq.to/home?page=${pageNumber}`;
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&page=${pageNumber}`;
    const options = {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2ZjNWQ5MTA1NDEyZDgxOTI3MGYyOGU1N2U5ZTMyNSIsIm5iZiI6MTcyNjAyODgyMi43ODI3NDIsInN1YiI6IjY2ZTBmYWNjMDAwMDAwMDAwMDQyYWZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tv9SPKH8qKqaV6wiMS1q3Ml_1dC5xAfChG2FgK1dFQ4'
    }
  };

    const handleScroll = () => {
      const container = containerRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 20) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    containerRef.current.addEventListener('scroll', handleScroll);

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        displayPopular(data.results);
        console.log(data.results);
      })
      .catch((error) => console.error('Error fetching data:', error));

    return () => {
      const container = containerRef.current;
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pageNumber]);

  function displayPopular(movies) {
    let newResults = [];

    movies.forEach((movie) => {
      const movieData = {
        href: `/movie/${movie.id}`,  // Construct URL based on movie ID
        src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,  // Use movie's poster path
        alt: movie.title,
        title: movie.title,
        subtitle: movie.release_date || '',  // Use release date as subtitle
      };

      // Ensure the movieData has valid information before adding it to the results
      if (movieData.href && movieData.src && movieData.title) {
        newResults.push(movieData);
      }
    });

    setResults((prevResults) => [...prevResults, ...newResults]);
  }

  return (
    <div ref={containerRef} style={{ height: '600px', overflowY: 'scroll' }}>
      <p className='trending'>Trending</p>
      <ul id='watch-list' className='PopularAnime'>
        {results.map((movie, index) => (
          <Link key={index} to={`${movie.href}`}>
            <li className={`p-list__item animate__animated animate__fadeInUp animate__faster animate__delay-${index % 3}s`}>
              <div className='img-div'>
                <img className='p-image--bordered list-img' src={movie.src} alt={movie.alt} loading='lazy' />
              </div>
              <div className='list-title'>
                {movie.title} {movie.subtitle && `(${movie.subtitle})`}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default MoviePopular;
