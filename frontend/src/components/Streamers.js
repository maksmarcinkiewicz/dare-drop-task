import Streamer from "./Streamer";

export default function Streamers({ streamers, handleVote, deleteStreamer }) {
  return (
    <div className="mt-20">
      <h2 className="text-center text-4xl font-bold">Streamers:</h2>
      <div className=" grid grid-cols-4 container mx-36 gap-x-24 gap-y-8  mt-20">
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
