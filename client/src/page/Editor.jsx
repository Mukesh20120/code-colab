import React, { useState } from "react";
import UserCard from "../component/UserCard";
import CodeEditor from "../component/CodeEditor";

function Editor() {
  const [members, setMembers] = useState([
    { socketId: "1", username: "User1" },
    { socketId: "2", username: "User2" },
    { socketId: "3", username: "User3" },
  ]);
  return (
    <div class="row w-100 m-0">
      
      <div class="col-2 bg-dark vh-100 d-flex flex-column  align-items-center">
        <div class="d-flex flex-column  align-items-center bg-grey ">
          <h3 class="text-white font-bold ">Code Colab</h3>
          <div class="border border-2-info w-100" />
          <div class="mt-3">
            <h6 class="text-warning">Members</h6>
          </div>

          
          <div
            class="d-flex w-100 flex-column align-items-center overflow-auto"
            style={{ height: "62vh", scrollbarWidth: "none" }}
          >
            {members.map((member) => (
              <UserCard member={member} />
            ))}
          </div>

          
          <div class="d-flex flex-column   align-items-center py-3" style={{ width: "100%" }}>
            <button type="button" class="btn btn-success mt-3 mb-2" style={{ width: "80%" }}>
              Create Room
            </button>
            <button type="button" class="btn btn-danger" style={{ width: "80%" }}>
              Leave Room
            </button>
          </div>
        </div>
      </div>

      
      <div class="col-10 vh-100 d-flex flex-column justify-content-center align-items-center">
        <div class="vh-100" style={{ width: "100%" }}>
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default Editor;
