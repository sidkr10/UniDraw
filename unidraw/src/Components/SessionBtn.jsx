import { useSelector } from "react-redux";

const SessionBtn = ({startAction, endAction}) => {

    const isConnected = useSelector((state) => state.whiteboard.sessionConnected);

  return (
    !isConnected? 
        <button className='btn-primary-start' onClick={startAction}>Start Session</button>
        :
        <button className='btn-primary-end' onClick={endAction}>End Session</button>
  )
}
export default SessionBtn