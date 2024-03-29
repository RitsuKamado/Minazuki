import React, { useState, useEffect, useRef } from 'react';
import '../PopularAnime.css';
import { Link } from 'react-router-dom';

export function MoviePopular() {
  const [pageNumber, setPageNumber] = useState(1);
  const [results, setResults] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const apiUrl = `https://cors.swx.workers.dev/https://flixhq.to/home?page=${pageNumber}`;

    const handleScroll = () => {
      const container = containerRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 20) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    containerRef.current.addEventListener('scroll', handleScroll);

    fetch(apiUrl)
      .then((response) => response.text())
      .then((data) => {
        displayPopular(data);
      })
      .catch((error) => console.error('Error fetching data:', error));

    return () => {
      const container = containerRef.current;
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pageNumber]);

  function displayPopular(results) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(results, 'text/html');
    const movies = doc.querySelectorAll('div#main-wrapper > div.container > section.section-id-01 > div.tab-content > div#trending-movies > div.film_list-grid > div.film_list-wrap > div.flw-item');
    let newResults = [];

    movies.forEach((result) => {
      const movieData = {
        href: result.querySelector('.film-poster > .film-poster-ahref')?.pathname || '',
        src: result.querySelector('.film-poster > .film-poster-img')?.getAttribute('data-src') || '',
        alt: '',
        title: result.querySelector('.film-poster > .film-poster-ahref')?.title || '',
        subtitle: result.querySelector('.film-detail > .fd-infor > .fdi-item')?.textContent || '',
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
          <Link key={index} to={movie.href}>
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
