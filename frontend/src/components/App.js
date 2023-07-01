import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3010");

function App() {
  const [streamers, setStreamers] = useState(null);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    streamingPlatform: "",
  });

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

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3010/streamers");

    setStreamers(res.data.streamers);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };

  const createStreamer = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3010/streamers", createForm);

    setStreamers([...streamers, res.data.streamer]);

    console.log(res);
    setCreateForm({
      name: "",
      description: "",
      streamingPlatform: "",
    });
  };

  const deleteStreamer = async (_id) => {
    const res = await axios.delete(`http://localhost:3010/streamers/${_id}`);

    const newStreamers = [...streamers].filter((streamer) => {
      return streamer._id !== _id;
    });
    setStreamers(newStreamers);
    console.log(res);
  };

  const handleVote = async (streamerId, voteType) => {
    const res = await axios.put(
      `http://localhost:3010/streamers/${streamerId}/${voteType}`,
      {}
    );

    const updatedStreamer = res.data.streamer;

    const updatedStreamers = streamers.map((streamer) => {
      if (streamer._id === updatedStreamer._id) {
        return updatedStreamer;
      } else {
        return streamer;
      }
    });

    setStreamers(updatedStreamers);
  };
  return (
    <div className="App">
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
          >
            <option value="">Choose a platform</option>
            <option value="platform1">Platform 1</option>
            <option value="platform2">Platform 2</option>
            <option value="platform3">Platform 3</option>
            <option value="platform4">Platform 4</option>
            <option value="platform5">Platform 5</option>
          </select>
          <button type="submit">create streamer</button>
        </form>
      </div>
    </div>
  );
}

export default App;
