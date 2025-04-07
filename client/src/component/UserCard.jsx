import React from "react";

function UserCard({ member }) {
  return (
    <div
      className="card text-center mb-1 shadow-sm"
      style={{
        width: "90%",
        borderRadius: "10px",
      }}
    >
      <div className="card-body d-flex align-items-center justify-content-between">
        <div
          className="d-flex align-items-center"
          style={{ gap: "5px" }}
        >
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
            style={{
              width: "30px",
              height: "30px",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {member.username.charAt(0).toUpperCase()}
          </div>
          <h6 className="mb-0 text-dark">{member.username}</h6>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
