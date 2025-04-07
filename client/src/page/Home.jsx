import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const createNewRoom = () => {
    const id = uuidv4();
    setRoomId(id);
    toast.success("New room created.");
  };
  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      toast.error("Please fill all fields.");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };
  return (
    <div class=" border border-3  rounded-3 border-warning text-center vw-100 vh-100 d-flex justify-content-center align-items-center text-white">
      <div class=" d-flex flex-column justify-content-center align-items-center bg-dark p-10 ">
        <div>
          <h1 class="text-white font-bold mb-3">Code Colab</h1>
        </div>
        <div class="mb-3">
          <h3 class="text-warning">Enter RoomId and username</h3>
        </div>
        <form class="" style={{ width: "100%" }}>
          <div class="mb-3">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              class="form-control"
              placeholder="Room ID"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              class="form-control"
              placeholder="username"
            />
          </div>
          <button
            type="submit"
            onClick={handleJoin}
            class="btn btn-success w-20 "
          >
            JOIN
          </button>
        </form>
        <div class="mt-3">
          <p>
            Don't have room Id?{" "}
            <span
              onClick={createNewRoom}
              class=" text-primary pe-auto link-opacity-75-hover"
            >
              New Room
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
