import { useEffect,useState } from "react"
import React from 'react'
import { useParams, Link } from "react-router-dom";
import MovieSearch from './MovieSearch';
import MovStream from './MovStream';
import NotFound from '../NotFound';
import '../Episodes.css'


export function MovieEpisodes() 
{
    const {id} = useParams();
    const {epParam} = useParams();
    const [originalId, setOriginalId] = useState("")
    const [episodeList, setEpisodeList] = useState("")
    const [episodeId, setEpisodeId] = useState("")
    const [info, setInfo] = useState("")
    const [selectedEpisode, setSelectedEpisode] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imdbId, setimdbId] = useState("");

useEffect (() =>
  {
    //const originalId =  id.substring("drama-detail/".length);
    //setOriginalId(originalId);
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2ZjNWQ5MTA1NDEyZDgxOTI3MGYyOGU1N2U5ZTMyNSIsIm5iZiI6MTcyNjAyODgyMi43ODI3NDIsInN1YiI6IjY2ZTBmYWNjMDAwMDAwMDAwMDQyYWZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tv9SPKH8qKqaV6wiMS1q3Ml_1dC5xAfChG2FgK1dFQ4'
    }
  };

    fetch(apiUrl, options)
     .then((response) => response.json())
     .then((data) => 
    {
        const episodeList = data.episodes;
        const info = data;
        setInfo(info);
        setEpisodeList(episodeList);
        const imdbId = data.imdb_id;
        setimdbId(imdbId)
        
        if(!epParam)
        {
            setEpisodeId(episodeList[0].id);
        }
        else
        {
            setEpisodeId(epParam);
        }
        //console.log(id);
        console.log(`ep${episodeId}`);
    })
    .catch(error => console.error("Error", error))
    .finally(()=>{setLoading(false);});
  }, [id])
    

    const handleOnClick = (ep) =>
    {
        // setEpisodeId(ep);
        // setSelectedEpisode(ep);
    } 
    if (loading) 
    {
        // return <div><MovieSearch/><MovStream/></div>; 
    }
    // if (!episodeList) 
    //   {
    //     return (
    //         <NotFound/>
    //     );
    //   }

    return(
        <div>
            <MovieSearch/>
            <MovStream imdbId={imdbId} mediaId={id}/>
            <div className="info">
            <h3>{info.title}</h3>    
            {info.overview ? (isExpanded ? <p>{info.overview}{isExpanded && 
            (
              <button className="show" onClick={() => setIsExpanded(false)}>Show Less</button>
            )}</p> : <p>{info.overview.slice(0, 100)}...
            {!isExpanded && 
            (
              <button className="show" onClick={() => setIsExpanded(true)}>See More</button>
            )}
            </p>) : null}
            <p>Budgit:{info.budget} - Kita:{info.revenue}</p>
            </div>
            <div className="buttonBox"> 
            <h3>
                Episodes
                <br />
            </h3>
            <div className="buttonContainer">
            {episodeList && episodeList.map((episode, index) =>
            (
               <div key={episode.id}  > 
               <Link to={`/${id}/${episode.id}/`} className={`epButton ${episode.id === episodeId ? 'selected' : ''}`} onClick={()=>handleOnClick(episode.id)}>E{index + 1 } </Link>
               </div>
            )
            )}
            </div>
            </div>
        </div>
    )
}
export default MovieEpisodes;
