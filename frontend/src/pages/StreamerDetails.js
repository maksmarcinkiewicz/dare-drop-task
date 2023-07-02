import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function StreamerDetails({ fetchStreamer, streamer }) {
  const streamerId = useParams();

  useEffect(() => {
    fetchStreamer(streamerId.id);
  }, []);
  console.log(streamer);
  return <div>{streamer ? streamer.name : "loading"}</div>;
}
