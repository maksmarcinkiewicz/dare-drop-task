import { useEffect } from "react";
import CreateStreamer from "../components/CreateStreamer";
import Streamers from "../components/Streamers";

export default function StreamersPage({
  fetchStreamers,
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
    fetchStreamers();

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
      <CreateStreamer
        createStreamer={createStreamer}
        updateCreateFormField={updateCreateFormField}
        createForm={createForm}
      />
      <Streamers
        streamers={streamers}
        handleVote={handleVote}
        deleteStreamer={deleteStreamer}
      />
    </>
  );
}
