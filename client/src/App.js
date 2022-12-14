import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://177.153.51.103:50001"); //https://www.oasistv.com.br/ //http://localhost:3001
console.log("PORTA COM 50001");


function App() {
  const [username, setUsername] = useState("");
  const [room] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
};

return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 id="pmudar">Entre no Chat!</h3>
          <input
            type="text"
            placeholder="Nome e Sobrenome..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Adicione a mensagem!</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;