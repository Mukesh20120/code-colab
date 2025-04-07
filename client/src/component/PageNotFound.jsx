import React from "react";

function PageNotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "800",
          color: "#ef4444",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          marginTop: "1rem",
        }}
      >
        Oops! You seem to be lost.
      </p>
      <p
        style={{
          fontSize: "1.125rem",
          marginTop: "0.5rem",
        }}
      >
        It's okay, even the best explorers get lost sometimes.
      </p>
      <p
        style={{
          marginTop: "1rem",
        }}
      >
        But don't worry, you can always{" "}
        <a
          href="/"
          style={{
            color: "#3b82f6",
            textDecoration: "underline",
          }}
        >
          go back home
        </a>
        .
      </p>
      <img
        src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
        alt="Confused Travolta"
        style={{
          marginTop: "1.5rem",
          width: "27rem",
          height: "20rem",
        }}
      />
    </div>
  );
}

export default PageNotFound;
