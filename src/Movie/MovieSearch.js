import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../Search.css'
import NavLinks from '../NavLinks';
import MobileNav from '../MobileNav';
import MoviePopular from './MoviePopular';
import { Link, useLocation } from 'react-router-dom';
export function MovieSearch() 
{
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState("1");
  const [results, setResults] = useState("");
  const [hide, setHide] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  useEffect (() =>
  {
    if(query === "")
    {
      setHide(true);
    }
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2ZjNWQ5MTA1NDEyZDgxOTI3MGYyOGU1N2U5ZTMyNSIsIm5iZiI6MTcyNjAyODgyMi43ODI3NDIsInN1YiI6IjY2ZTBmYWNjMDAwMDAwMDAwMDQyYWZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tv9SPKH8qKqaV6wiMS1q3Ml_1dC5xAfChG2FgK1dFQ4'
    }
  }
    fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) =>  
     {
      const results = data.results
      setResults(results);
     })
  .catch(error => console.error("Error fetching data:", error));
  },[query])
  
  const handleOnChange = () => 
  {
    setHide(false);
  }
  const handleOnBlur = () => 
  {
    setTimeout(() => 
      {
        setHide(true);
      }, 200);
  }
  const handleOnFocus = () => 
  {
    if(query !== "" )
    {
      setHide(false);
    }
  }

  return(
      <div>
        <div className='nav'>
          <Link to={'/'} className='minazuki'>Minazuki</Link>
          <div className='searchContainer'>
            <input className="searchBar"type="text" value={query} onChange={(a) => {setQuery(a.target.value); handleOnChange();}} onBlur={handleOnBlur} onFocus={handleOnFocus} placeholder="Search Movie"/>
             <div className="searchBarLine"> | </div>
             <FontAwesomeIcon icon={faSearch} className="searchBarIcon" />
              <div className='searchResults' style={{ display: hide ? 'none' : 'block' }} > 
           {results && results.length > 0 ? (
                 results.map((result) => (
                  <Link key={result.id} className='resultItem' to={`/movie/${result.id}`}  > <FontAwesomeIcon icon={faSearch} className="searchResultsIcon" />{result.title}</Link>
            ))): 
                 (<div className='noResultItem'>No results found.</div>)
           }
              </div>
          </div>
          <NavLinks tab={'movie'}/>
        </div>
        <div>
        {location.pathname === '/movie' && <MoviePopular />}
        </div>
        <div>
        <MobileNav tab = {'movie'}/>
        </div>
        </div>
  )

}

export default MovieSearch;
