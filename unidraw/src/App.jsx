import WhiteBoard from "./Components/WhiteBoard";
import { connectToWebSocket, disconnectWebSocket } from "./sockjsclient";
import { Button, Modal, Tab, Tabs} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import roomactions from "./store/actions/RoomActinos";

function App() {

  const isConnected = useSelector((state) => state.whiteboard.sessionConnected);

  const [show, setShow] = useState(false);

  const createUserNameRef = useRef();
  const joinUserNameRef = useRef();
  const roomidRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleCreate = () => {
    connectToWebSocket(roomactions.CREATEROOM, createUserNameRef.current.value); 
    handleClose();
  }

  const handleJoin = (event)=>{
    connectToWebSocket(roomactions.JOINROOM, joinUserNameRef.current.value, roomidRef.current.value); 
    handleClose();
  }
  
  const endSession = () => {
    disconnectWebSocket();
  }

  return (
    <>
      {
        !isConnected?
        <button className='btn-primary-start' onClick={handleShow}>
          Start/Join Room
        </button>
        :
        <button className='btn-primary-start' variant="danger" onClick={endSession}>
          Leave Room
        </button>
      }
      <Modal show={show} onHide={handleClose}>
          <Tabs
          defaultActiveKey="create"
          id="uncontrolled-tab-example"
          className="mb-3"
          >
          <Tab eventKey="create" title="Create Room">
            <Modal.Body>
              Enter Username : <input type="text" placeholder="User Name" className="input-container" ref={createUserNameRef}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCreate}>
                Create
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Tab>
          <Tab eventKey="join" title="Join Room">
            <Modal.Body>
              <label>
                Enter Username<input type="text" placeholder="User Name" className="input-container" ref={joinUserNameRef}/>
              </label>
              <br />
              <label>
                Enter Room Id<input type="text" placeholder="Room ID" className="input-container" ref={roomidRef}/>
              </label>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleJoin}>
                Join
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Tab>
        </Tabs>
       
      </Modal>
      <WhiteBoard />
    </>
  )
}

export default App
