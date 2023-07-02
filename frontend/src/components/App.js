import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import StreamersPage from "../pages/StreamersPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import StreamerDetails from "../pages/StreamerDetails";

const socket = io("http://localhost:3010");

function App() {
  const [streamers, setStreamers] = useState(null);
  const [streamer, setStreamer] = useState(null);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    streamingPlatform: "",
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
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/logout">logout</Link>
          </li>
        </ul>
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
