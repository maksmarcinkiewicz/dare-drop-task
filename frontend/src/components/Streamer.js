import { Link } from "react-router-dom";

export default function Streamer({ streamer, handleVote, deleteStreamer }) {
  return (
    <div key={streamer._id}>
      <h3>name: {streamer.name}</h3>
      <h4>platform: {streamer.streamingPlatform}</h4>
      <p>Upvotes: {streamer.upvotes ? streamer.upvotes : 0}</p>
      <p>Downvotes: {streamer.downvotes ? streamer.downvotes : 0}</p>
      <button onClick={() => handleVote(streamer._id, "upvote")}>Upvote</button>
      <button onClick={() => handleVote(streamer._id, "downvote")}>
        Downvote
      </button>
      <Link to={`streamers/${streamer._id}`}>
        <button className="btn btn-info">read more</button>
      </Link>
      <button
        onClick={() => {
          deleteStreamer(streamer._id);
        }}
      >
        Delete streamer
      </button>
    </div>
  );
}
