import { useEffect,useState } from "react";
import ArtPlayer1 from '../ArtPlayer1';
import '../Stream.css';
function MovStream({episodeId,mediaId}) 
{
    const [info, setInfo] = useState("")
    const [watch, setWatch] = useState("")
    const [video, setVideo] = useState("")
    const [fetchVideo, setFetchVideo] = useState("")
    const [qualityIndex, setQualityIndex] = useState([0])
useEffect (() =>
  {
    const apiUrl = `https://api-shig.vercel.app/movies/flixhq/watch?episodeId=${episodeId}&mediaId=movie/${watch}${mediaId}`;
    fetch(apiUrl)
     .then((response) => response.json())
     .then((data) => 
    {
        console.log(mediaId);
        const fetchedVideo = data.sources;
        if (fetchedVideo && fetchedVideo.length > 0) 
        {
          setFetchVideo(fetchedVideo);
          const resultsarray = fetchedVideo[qualityIndex].url;
          setVideo(resultsarray);
        }
    })
    .catch((error) => 
      {
        console.error("Error", error);
        if (error.message.includes("Status: 500")) {
          setWatch("watch/");
        } else {
          setWatch("");
        }
      });
  }, [episodeId, qualityIndex]);
 
 return (
    <div className='vidstream'>
      {video?(
          <div>
            <ArtPlayer1
                className = "artplayer"
                option={{
                url: video,
                isLive: false,
                muted: false,
                autoplay: false,
                pip: true,
                autoSize: true,
                autoMini: true,
                screenshot: true,
                setting: true,
                loop: true,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                subtitleOffset: true,
                miniProgressBar: true,
                mutex: true,
                backdrop: true,
                playsInline: true,
                autoPlayback: true,
                airplay: true,
                autoOrientation: true,
                lock: true,
                quality: fetchVideo.map((item, index) => ({
                    default: index === qualityIndex,
                    html: ` ${item.quality}`,
                    url: item.url,
                  })),
              }}
              style={{}}
            />
          </div>
      ):(<div className = "artplayerframe"></div>)}
    </div>
  );
}

  export default MovStream;
