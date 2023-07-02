import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function StreamerDetails({ fetchStreamer, streamer }) {
  const streamerId = useParams();

  useEffect(() => {
    fetchStreamer(streamerId.id);
  }, []);
  console.log(streamer);
  return (
    <>
      {streamer ? (
        <>
          <div>
            <p>here will be streamer img</p>
            <h3>STREAMER NAME: {streamer.name}</h3>
            <h3>STREAMER platform: {streamer.streamingPlatform}</h3>
            <h3>STREAMER description: {streamer.description}</h3>
          </div>
        </>
      ) : (
        "loading"
      )}
    </>
  );
}
