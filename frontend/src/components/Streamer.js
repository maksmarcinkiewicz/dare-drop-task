import { Link } from "react-router-dom";
import streamer1 from "../assets/streamer1.png";
import streamer2 from "../assets/streamer2.png";
import streamer3 from "../assets/streamer3.png";
import streamer4 from "../assets/streamer4.png";
import streamer5 from "../assets/streamer5.png";
import streamer6 from "../assets/streamer6.png";
import authStore from "../stores/authStore";

const streamerImages = [
  streamer1,
  streamer2,
  streamer3,
  streamer4,
  streamer5,
  streamer6,
];

export default function Streamer({ streamer, handleVote, deleteStreamer }) {
  const store = authStore();
  const randomIndex = Math.floor(Math.random() * streamerImages.length);
  const randomImage = streamerImages[randomIndex];

  return (
    <div key={streamer._id} className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={randomImage} alt="Streamer profile" className="" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">name: {streamer.name}</h3>
        <h4>platform: {streamer.streamingPlatform}</h4>
        <p>Upvotes: {streamer.upvotes ? streamer.upvotes : 0}</p>
        <p>Downvotes: {streamer.downvotes ? streamer.downvotes : 0}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-outline"
            onClick={() => handleVote(streamer._id, "upvote")}
            disabled={store.loggedIn ? false : true}
          >
            {store.loggedIn ? "UPVOTE" : "login to UPVOTE"}
          </button>
          <button
            className="btn btn-outline"
            onClick={() => handleVote(streamer._id, "downvote")}
            disabled={store.loggedIn ? false : true}
          >
            {store.loggedIn ? "DOWNVOTE" : "login to DOWNVOTE"}
          </button>
          <Link to={`streamers/${streamer._id}`}>
            <button className="btn btn-info">read more</button>
          </Link>
          <button
            className="btn btn-outline"
            onClick={() => {
              deleteStreamer(streamer._id);
            }}
            disabled={store.loggedIn ? false : true}
          >
            {store.loggedIn ? "delete streamer" : "login to delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
