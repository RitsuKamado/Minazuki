import React, { useEffect, useRef, useState } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';

function playM3u8(video, url, art) {
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy();
    const hls = new Hls();

    // Log Hls.js events for debugging
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
     // console.log('MANIFEST_PARSED', data);
    });
    hls.on(Hls.Events.ERROR, function (event, data) {
    //  console.error('HLS ERROR', data);
    });
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
   //   console.log('MEDIA_ATTACHED');
    });

    hls.loadSource(url);
    hls.attachMedia(video);
    art.hls = hls;

    art.on('destroy', () => {
      hls.destroy();
      art.hls = null;
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
  } else {
    art.notice.show = 'Unsupported playback format: m3u8';
  }
}

export default function ArtPlayer1({ option, getInstance, onInstanceChange, ...rest }) {
  const artRef = useRef();
  const [artInstance, setArtInstance] = useState(null);

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current,
      customType: {
        m3u8: (video, url) => playM3u8(video, url, art),
      },
    });

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art);
    }

    // Notify the parent component about the instance change
    if (onInstanceChange && typeof onInstanceChange === 'function') {
      onInstanceChange(art);
    }

    setArtInstance(art);

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option.url]); // Include option.url in the dependency array

  return <div ref={artRef} {...rest}></div>;
}
