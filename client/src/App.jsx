import { useEffect } from "react"
import {io} from "socket.io-client";
const App = () => {

  const socket = io("http://localhost:3000/");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });
    socket.on("welcome", (s)=>{
      console.log(s);
    })

    return () => {
      socket.disconnect();
    }
  }, [socket]);
  
  return (
    <div>
      App
    </div>
  );
};

export default App;