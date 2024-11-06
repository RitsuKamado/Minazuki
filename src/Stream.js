import { useEffect,useState } from "react";
import ArtPlayer1 from './ArtPlayer1';
import './Stream.css';
import Artplayer, { html } from "artplayer";
function Stream({episodeId, totalEpisodes, setEpisodeId, id}) 
{
    const [info, setInfo] = useState("")
    const [video, setVideo] = useState("")
    const [fetchVideo, setFetchVideo] = useState("")
    const [qualityIndex, setQualityIndex] = useState([2])
    const [selectedEpisode, setSelectedEpisode] = useState([1])
    const match = episodeId.match(/-episode-(\d+)$/);
    const episodeNumber = match ? match[1] : null;
    console.log(episodeId);
useEffect (() =>
  {
    const apiUrl = `https://api-shig.vercel.app/anime/gogoanime/watch/${episodeId}`
    fetch(apiUrl)
     .then((response) => response.json())
     .then((data) => 
    {
        //console.log(data.sources);
        const fetchedVideo = data.sources;
        if (fetchedVideo && fetchedVideo.length > 0) 
        {
          setFetchVideo(fetchedVideo);
          const resultsarray = fetchedVideo[qualityIndex].url;
          console.log(resultsarray);
          console.log(fetchedVideo);
          setVideo(resultsarray);
        }
    })
    .catch(error => console.error("Error", error));
    
  }, [episodeId, qualityIndex]);
 
  const addArtSettings = (art) => {
    art.setting.add
    ({
          html: 'Episodes',
          selector: [...Array(totalEpisodes)].map((item, index) => ({
          html: index + 1,
          default: index === episodeNumber - 1,
        
        })),
          onSelect: function (item, index) {
          handleEpisodeSelect(item.html);
        },
    });
  }
  const handleEpisodeSelect = (selectedEpisode) => {
  const episodeId = `${id}-episode-${selectedEpisode}`;
  setEpisodeId(episodeId);
  console.log(`episode ${episodeId}`);
  const playerElement = document.querySelector('.artplayer');
      playerElement.requestFullscreen();
}

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
                autoOrientation: true,
                orientation: 'landscape',
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
                lock: true,
                quality: fetchVideo.map((item, index) => ({
                    default: index === 2,
                    html: item.quality,
                    url: item.url,
                  })),
              }}
              style={{}}
              additionalSettings={addArtSettings}
            />
          </div>
      ):(<div className = "artplayerframe"></div>)}

    </div>
  );
}

  export default Stream;
