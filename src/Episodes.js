import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Search from './Search';
import Stream from './Stream';
import './Episodes.css';

export function Episodes() {
    const { id } = useParams();
    const { epParam } = useParams();
    const [episodeId, setEpisodeId] = useState(epParam || `${id}-episode-1`);
    const [info, setInfo] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [totalEpisodes, setTotalEpisodes] = useState(null); // Add state for total episodes

    // You can fetch total episodes from your API or use it directly if it's available
    // For demonstration, let's assume you fetch it from the API.
    useEffect(() => {
        const apiUrl = `https://api-shig.vercel.app/anime/gogoanime/info/${id}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setTotalEpisodes(data.totalEpisodes);
            })
            .catch(error => console.error("Error", error));
    }, [id])

    const handleOnClick = (episodeId) => {
        setEpisodeId(episodeId);
    }

    return (
        <div>
            <Search />
            <Stream episodeId={episodeId} />
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
                    {[...Array(totalEpisodes)].map((_, index) => (
                        <div key={index}>
                            <Link to={`/watch/${id}/`} className={`epButton ${episodeId === `${id}-episode-${index + 1}` ? 'selected' : ''}`} onClick={() => handleOnClick(`${id}-episode-${index + 1}`)}>{index + 1} </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Episodes;
