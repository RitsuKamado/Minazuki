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
  const [pageNumber, setPageNumber] = useState("");
  const [results, setResults] = useState("");
  const [hide, setHide] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  useEffect (() =>
  {
    if(query === "")
    {
      setHide(true);
    }
    const apiUrl = `https://api-shig.vercel.app/movies/flixhq/${query}?page=${pageNumber}`;
     fetch(apiUrl)
    .then((response) => response.json())
    .then((data) =>  
     {
      if(query !== "")
     { 
      const results = data.results.filter(item => item.type === "Movie");
       setResults(results);
     }
      
     //console.log(results);
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
                  <Link key={result.id} className='resultItem' to={`/${result.id}`}  > <FontAwesomeIcon icon={faSearch} className="searchResultsIcon" />{result.title}</Link>
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
