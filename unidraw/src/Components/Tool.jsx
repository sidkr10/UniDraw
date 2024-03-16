import { useSelector, useDispatch } from 'react-redux'
import { setTool } from '../store/slices/whiteboardslice'

const Tool = ({src, tooltype}) => {

  const selectedTool = useSelector((state) => state.whiteboard.tool);
  const dispatch = useDispatch();
  const handleToolClick = () => {
    dispatch(setTool(tooltype))
  };

  return (
    <button className={selectedTool === tooltype? "menu-tool_active": "menu-tool"} onClick={handleToolClick}>
        <img width='80%' height='80%' src={src} tooltype={tooltype} />    
    </button>
  )
}
export default Tool