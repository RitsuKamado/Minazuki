import React, { useState, useEffect, useRef } from 'react';
import './PopularAnime.css'
import { Link } from 'react-router-dom';

export function PopularAnime() {
  const [pageNumber, setPageNumber] = useState(1);
  const [results, setResults] = useState([]);
  const containerRef = useRef();


  useEffect(() => 
{
  
    const apiUrl = `https://api-shig.vercel.app/anime/gogoanime/top-airing?page=${pageNumber}`;
    
    const handleScroll = () => 
    {
      const container = containerRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 20) 
      {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    containerRef.current.addEventListener('scroll', handleScroll);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const newResults = data.results;
        setResults((prevResults) => [...prevResults, ...newResults]);
        console.log(newResults);
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => 
     {
     const container = containerRef.current;
    if (container) 
      {
      container.removeEventListener('scroll', handleScroll);
      }
     };
}, [pageNumber]);
  

  return (
    <div  ref={containerRef} style={{ height: '600px', overflowY: 'scroll'}}>
        <p className='trending'>Trending</p>
        <div className = 'PopularAnime'>
      {results.map((anime, index) => 
      (
        <Link key={anime.id + index + 1} to={`/watch/${anime.id}`}>
          <img src={anime.image} alt="" />
          <p>{anime.title}</p>
        </Link>
      ))}
      </div>
    </div>
  );
}

export default PopularAnime;