import Streamer from "./Streamer";

export default function Streamers({ streamers, handleVote, deleteStreamer }) {
  return (
    <div className="">
      <div className=" grid grid-cols-4 container mx-auto gap-x-36 gap-y-8  mt-10">
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
