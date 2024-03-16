import { useEffect } from "react"
import WhiteBoard from "./Components/WhiteBoard"
import { connectToWebSocket } from "./sockjsclient";

function App() {
  useEffect(()=>{
    connectToWebSocket();    
  }, []);

  return (
      <WhiteBoard />
  )
}

export default App
