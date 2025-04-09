import React, { useCallback, useEffect, useRef, useState } from "react";
import UserCard from "../component/UserCard";
import CodeEditor from "../component/CodeEditor";
import Socket from "../socket/Socket";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";

function Editor() {
  const codeRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const [members, setMembers] = useState([]);
  const newSocket = useCallback(() => {
    return Socket();
  }, []);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await newSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
        }
      
        setTimeout(()=>{
          if(socketRef.current.id != socketId){
            socketRef.current.emit('sync-code',{code: codeRef.current, socketId});
          }
        },[500])
        setMembers(clients);
      });
      socketRef.current.on("leave-room", ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        
        setMembers((prev) => {
          const arr = prev.filter((member) =>{
          
            return member.socketId !== socketId;
          });
          
          return arr;
        });
      });
    };
    init();


    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off('joined');
      socketRef.current.off('disconnect');
    };
  }, []);

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
              <UserCard member={member} key={member.socketId} />
            ))}
          </div>

          <div
            class="d-flex flex-column   align-items-center py-3"
            style={{ width: "100%" }}
          >
            <button
              type="button"
              class="btn btn-success mt-3 mb-2"
              style={{ width: "80%" }}
             onClick={()=>{
              navigator.clipboard.writeText(roomId);
              toast.success("Room ID copied to clipboard");
             }}
          >
              Create Room
            </button>
            <button
              type="button"
              class="btn btn-danger"
              style={{ width: "80%" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>

      <div class="col-10 vh-100 d-flex flex-column justify-content-center align-items-center">
        <div class="vh-100" style={{ width: "100%" }}>
          <CodeEditor socketRef={socketRef} roomId={roomId} codeRef={codeRef}/>
        </div>
      </div>
    </div>
  );
}

export default Editor;
