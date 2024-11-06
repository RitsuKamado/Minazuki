import { useEffect, useState } from "react";
import ArtPlayer1 from '../ArtPlayer1';  // Adjust import path as needed
import '../Stream.css';  // Adjust import path as needed

function MovStream({ mediaId, imdbId }) {
    const [playerData, setPlayerData] = useState({
        video: "",
        qualityIndex: 0,
        subtitles: [],
        firstSubtitleUrl: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!imdbId || !mediaId) {
            console.warn("IMDB ID or Media ID is empty, skipping fetch.");
            setLoading(false);
            return;
        }

        const fetchSubtitles = fetch(`https://subtitle.ritsukamado.workers.dev/?imdb_id=${imdbId}.txt`)
            .then((response) => response.json())
            .then((data) => {
                const englishSubtitles = data.filter(subtitle => subtitle.label.includes('English'));
                const firstSubtitleUrl = englishSubtitles[0]?.file || "";
                return { subtitles: englishSubtitles, firstSubtitleUrl };
            })
            .catch((error) => {
                console.error("Error fetching subtitles", error);
                return { subtitles: [], firstSubtitleUrl: "" };
            });

        const fetchVideo = fetch(`https://vidstream.ritsukamado.workers.dev?movieId=${mediaId}`)
            .then((response) => response.json())
            .then((data) => {
                const sources = data.MOVIE_TEST.sources || [];
                const videoUrl = sources[playerData.qualityIndex]?.file.replace(/^file:/, "") || "";
                return { video: videoUrl, qualityIndex: playerData.qualityIndex, sources };
            })
            .catch((error) => {
                console.error("Error fetching video data", error);
                return { video: "", sources: [] };
            });

        Promise.all([fetchSubtitles, fetchVideo])
            .then(([subtitlesData, videoData]) => {
                setPlayerData(prev => ({
                    ...prev,
                    ...subtitlesData,
                    video: videoData.video,
                    qualityIndex: videoData.qualityIndex,
                    fetchVideo: videoData.sources,
                }));
                setLoading(false);
            });

    }, [mediaId, imdbId, playerData.qualityIndex]);

    const { video, subtitles, firstSubtitleUrl, fetchVideo } = playerData;

    return (
        <div className='vidstream'>
            {!loading && video ? (
                <ArtPlayer1
                    className="artplayer"
                    option={{
                        url: video,
                        isLive: false,
                        muted: false,
                        autoplay: false,
                        pip: true,
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
                            default: index === playerData.qualityIndex,
                            html: ` ${item.label}`,
                            url: item.file.replace(/^file:/, ""),
                        })),
                        subtitle: {
                            url: firstSubtitleUrl,
                            type: 'vtt',
                            style: {
                                color: '#ADD8E6',
                                fontSize: '20px',
                            },
                            encoding: 'utf-8',
                        },
                    }}
                />
            ) : (
                <div className="artplayerframe"></div>
            )}
        </div>
    );
}

export default MovStream;
