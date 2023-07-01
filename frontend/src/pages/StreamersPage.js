import { useEffect } from "react";

export default function StreamersPage({
  fetchNotes,
  socket,
  setStreamers,
  createForm,
  streamers,
  handleVote,
  deleteStreamer,
  createStreamer,
  updateCreateFormField,
}) {
  useEffect(() => {
    fetchNotes();

    socket.on("initialData", (streamersData) => {
      setStreamers(streamersData);
    });

    socket.on("updateVotes", (updatedStreamer) => {
      setStreamers((streamers) => {
        return streamers.map((streamer) =>
          streamer._id === updatedStreamer._id ? updatedStreamer : streamer
        );
      });
    });

    socket.on("streamerCreated", (newStreamer) => {
      setStreamers((streamers) => [...streamers, newStreamer]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div>
        <h2>Streamers:</h2>
        {streamers &&
          streamers.map((streamer) => {
            return (
              <div key={streamer._id}>
                <h3>name: {streamer.name}</h3>
                <h4>platform: {streamer.streamingPlatform}</h4>
                <p>Upvotes: {streamer.upvotes}</p>
                <p>Downvotes: {streamer.downvotes}</p>
                <button onClick={() => handleVote(streamer._id, "upvote")}>
                  Upvote
                </button>
                <button onClick={() => handleVote(streamer._id, "downvote")}>
                  Downvote
                </button>
                <button
                  onClick={() => {
                    deleteStreamer(streamer._id);
                  }}
                >
                  Delete streamer
                </button>
              </div>
            );
          })}
      </div>

      <div>
        <h2>Create streamer</h2>
        <form onSubmit={createStreamer}>
          <input
            onChange={updateCreateFormField}
            value={createForm.name}
            name="name"
          />
          <textarea
            onChange={updateCreateFormField}
            value={createForm.description}
            name="description"
          />
          <select
            value={createForm.streamingPlatform}
            onChange={updateCreateFormField}
            name="streamingPlatform"
            required
          >
            <option disabled value="">
              Choose a platform
            </option>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Kick">Kick</option>
            <option value="Rumble">Rumble</option>
          </select>
          <button type="submit">create streamer</button>
        </form>
      </div>
    </>
  );
}
