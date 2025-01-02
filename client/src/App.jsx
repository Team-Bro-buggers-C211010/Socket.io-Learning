import { useEffect, useState, useMemo } from "react"
import {io} from "socket.io-client";
import {Container, Typography, TextField, Button, Stack} from "@mui/material"
const App = () => {

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const handleSubmit = (e)=> {
    e.preventDefault();
    socket.emit("message", {message, room});
    setMessage("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected to server", socket.id);
    });
    socket.on("welcome", (s)=>{
      console.log(s);
    })
    socket.on("receive-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);
    })
    return () => {
      socket.disconnect();
    }
  }, [socket]);
  
  return <Container maxWidth="sm">
    <Typography variant="h3" className="div" gutterBottom>
      Welcome to Socket.io
    </Typography>
    <Typography variant="h6" className="div" gutterBottom>
      {socketId}
    </Typography>
    <form onSubmit={handleSubmit} className="">
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Message" variant="outlined" />
      <br />
      <br />
      <TextField value={room} onChange={(e) => setRoom(e.target.value)} id="outlined-basic" label="Room" variant="outlined" />
      <br />
      <br />
      <Button type="submit" variant="contained">Send</Button>
    </form>
    <br />
    <Stack>
  {
    messages.map((m, i) => (
      <Typography key={i} variant="h6" className="div" gutterBottom>
        {m}
        <br />
      </Typography>
    ))
  }
</Stack>
  </Container>
};

export default App;