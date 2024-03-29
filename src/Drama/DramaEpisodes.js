import { useEffect,useState } from "react"
import React from 'react'
import { useParams, Link } from "react-router-dom";
import DramaSearch from './DramaSearch';
import DramaStream from './DramaStream';
import NotFound from '../NotFound';
import '../Episodes.css'


export function DramaEpisodes() 
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

useEffect (() =>
  {
    //const originalId =  id.substring("drama-detail/".length);
    //setOriginalId(originalId);
    const apiUrl = `https://api-shig.vercel.app/movies/dramacool/info?id=drama-detail/${id}`;
    fetch(apiUrl)
     .then((response) => response.json())
     .then((data) => 
    {
        const episodeList = data.episodes;
        const info = data;
        setInfo(info);
        setEpisodeList(episodeList);
        if(!epParam)
        {
            setEpisodeId(episodeList[0].id);
        }
        else
        {
            setEpisodeId(epParam);
        }
        console.log(info);
    })
    .catch(error => console.error("Error", error))
    .finally(()=>{setLoading(false);});
  }, [id])
    

    const handleOnClick = (ep) =>
    {
        setEpisodeId(ep);
        setSelectedEpisode(ep);
    } 
    if (loading) 
    {
        return <div><DramaSearch/><DramaStream/></div>; 
    }
    if (!episodeList) 
      {
        return (
            <NotFound/>
        );
      }

    return(
        <div>
            <DramaSearch/>
            <DramaStream episodeId={episodeId}/>
            <div className="info">
            <h3>{episodeId}</h3>    
            {info.description ? (isExpanded ? <p>{info.description}{isExpanded && 
            (
              <button className="show" onClick={() => setIsExpanded(false)}>Show Less</button>
            )}</p> : <p>{info.description.slice(0, 100)}...
            {!isExpanded && 
            (
              <button className="show" onClick={() => setIsExpanded(true)}>See More</button>
            )}
            </p>) : null}
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
               <Link to={`/drama/${id}/${episode.id}/`} className={`epButton ${episode.id === episodeId ? 'selected' : ''}`} onClick={()=>handleOnClick(episode.id)}>E{index + 1 } </Link>
               </div>
            )
            )}
            </div>
            </div>
        </div>
    )
}
export default DramaEpisodes;
