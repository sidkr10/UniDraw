import WhiteBoard from "./Components/WhiteBoard";
import { connectToWebSocket, disconnectWebSocket } from "./sockjsclient";
import SessionBtn from "./Components/SessionBtn";

function App() {

  const startSession = () => {
    connectToWebSocket(); 
  }
  
  const endSession = () => {
    disconnectWebSocket();
  }

  return (
    <>
      <SessionBtn startAction={startSession} endAction={endSession} />
      <WhiteBoard />
    </>
  )
}

export default App
