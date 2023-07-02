import { Link } from "react-router-dom";

import authStore from "../stores/authStore";

export default function Streamer({ streamer, handleVote, deleteStreamer }) {
  const store = authStore();

  return (
    <div key={streamer._id} className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={streamer.image} alt="Streamer profile" className="" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">name: {streamer.name}</h3>
        <h4>platform: {streamer.streamingPlatform}</h4>
        <p>Upvotes: {streamer.upvotes ? streamer.upvotes : 0}</p>
        <p>Downvotes: {streamer.downvotes ? streamer.downvotes : 0}</p>
        <div className="card-actions justify-between">
          <div className="flex gap-2">
            <button
              className="btn btn-outline"
              onClick={() => handleVote(streamer._id, "upvote")}
              disabled={store.loggedIn ? false : true}
            >
              {store.loggedIn ? "👍" : "login to UPVOTE"}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => handleVote(streamer._id, "downvote")}
              disabled={store.loggedIn ? false : true}
            >
              {store.loggedIn ? "👎" : "login to DOWNVOTE"}
            </button>
          </div>
          <div className="flex gap-2">
            <Link to={`streamers/${streamer._id}`}>
              <button className="btn btn-info">more</button>
            </Link>
            <button
              className="btn btn-outline btn-error"
              onClick={() => {
                deleteStreamer(streamer._id);
              }}
              disabled={store.loggedIn ? false : true}
            >
              {store.loggedIn ? "delete " : "login to delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
