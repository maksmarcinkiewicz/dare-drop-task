import Streamer from "./Streamer";

export default function Streamers({ streamers, handleVote, deleteStreamer }) {
  return (
    <div className="mt-56">
      <h2 className="text-center text-4xl font-bold">Streamers:</h2>
      <div className="grid grid-cols-4 gap-y-8 mt-20">
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
    </div>
  );
}
