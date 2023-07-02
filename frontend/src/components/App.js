import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import StreamersPage from "../pages/StreamersPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import StreamerDetails from "../pages/StreamerDetails";
import Header from "./Header";

import streamer1 from "../assets/streamer1.png";
import streamer2 from "../assets/streamer2.png";
import streamer3 from "../assets/streamer3.png";
import streamer4 from "../assets/streamer4.png";
import streamer5 from "../assets/streamer5.png";
import streamer6 from "../assets/streamer6.png";

const streamerImages = [
  streamer1,
  streamer2,
  streamer3,
  streamer4,
  streamer5,
  streamer6,
];

const socket = io("http://localhost:3010");

function App() {
  const [streamers, setStreamers] = useState(null);
  const [streamer, setStreamer] = useState(null);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    streamingPlatform: "",
    image: "",
  });

  const fetchStreamers = async () => {
    const res = await axios.get("http://localhost:3010/streamers");
    setStreamers(res.data.streamers);
  };

  const fetchStreamer = async (_id) => {
    const res = await axios.get(`http://localhost:3010/streamers/${_id}`);
    setStreamer(res.data.streamer);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };

  const createStreamer = async (e) => {
    e.preventDefault();

    const randomIndex = Math.floor(Math.random() * streamerImages.length);
    const randomImage = streamerImages[randomIndex];

    createForm.image = randomImage;
    const res = await axios.post("http://localhost:3010/streamers", createForm);

    console.log(res.data.streamer);

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
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <StreamersPage
                  fetchStreamers={fetchStreamers}
                  socket={socket}
                  setStreamers={setStreamers}
                  createForm={createForm}
                  streamers={streamers}
                  handleVote={handleVote}
                  deleteStreamer={deleteStreamer}
                  createStreamer={createStreamer}
                  updateCreateFormField={updateCreateFormField}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/streamers/:id"
            element={
              <StreamerDetails
                fetchStreamer={fetchStreamer}
                streamer={streamer}
                socket={socket}
                setStreamer={setStreamer}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
