import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import streamer1 from "../assets/streamer1.png";

export default function StreamerDetails({ fetchStreamer, streamer }) {
  const streamerId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStreamer(streamerId.id);
  }, []);
  console.log(streamer);
  return (
    <>
      {streamer ? (
        <>
          <div className="flex gap-10 justify-center items-center mt-36">
            <img
              src={streamer1}
              alt="Streamer profile"
              className="w-3/12 rounded-full flex  "
            />

            <div className="flex flex-col gap-5">
              <h3 className="text-4xl">Name: {streamer.name}</h3>
              <h4 className="text-3xl">
                Streaming platform: {streamer.streamingPlatform}
              </h4>
              <h3 className="text-3xl">Description: {streamer.description}</h3>
              <button className="btn btn-outline" onClick={() => navigate("/")}>
                Go back
              </button>
            </div>
          </div>
        </>
      ) : (
        "loading"
      )}
    </>
  );
}
