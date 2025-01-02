import { useEffect, useState } from "react"
import {io} from "socket.io-client";
import {Container, Typography, TextField, Button} from "@mui/material"
const App = () => {

  const socket = io("http://localhost:3000/");

  const [message, setMessage] = useState("");
  const handleSubmit = (e)=> {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }

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
  }, []);
  
  return <Container maxWidth="sm">
    <Typography variant="h1" className="div" gutterBottom>
      Welcome to Socket.io
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
      <Button type="submit" variant="contained">Send</Button>
    </form>
  </Container>
};

export default App;