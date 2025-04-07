import React from "react";
import { Link } from "react-router";

function Home() {
  return (
    <div class="container text-center vw-100 vh-100 d-flex justify-content-center align-items-center text-white">
      <div class="border border-3 border-warning h-50 w-50 rounded-3 d-flex flex-column justify-content-center align-items-center bg-dark ">
        <div>
          <h1 className="text-white font-bold mb-3">Code Colab</h1>
        </div>
        <div className="mb-3">
          <h3 class="text-warning">Enter RoomId and username</h3>
        </div>
        <form class="w-75">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Room ID"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="username" />
          </div>
          <button type="submit" class="btn btn-success w-20 ">
            JOIN
          </button>
        </form>
        <div class="mt-3">
          <p>Don't have room Id? <Link to='/' class=" text-primary pe-auto link-opacity-75-hover">New Room</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Home;
