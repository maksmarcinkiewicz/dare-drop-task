import Streamer from "./Streamer";

export default function Streamers({ streamers, handleVote, deleteStreamer }) {
  return (
    <div>
      <h2>Streamers:</h2>
      {streamers &&
        streamers.map((streamer) => {
          return (
            <Streamer
              streamer={streamer}
              handleVote={handleVote}
              deleteStreamer={deleteStreamer}
              key={streamer._id}
            />
          );
        })}
    </div>
  );
}
