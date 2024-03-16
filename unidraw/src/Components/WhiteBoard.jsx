import Menu from "./Menu";
import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { actions as whiteboardactions } from '../store/actions/whiteboardactions';
import { useDispatch, useSelector } from "react-redux";
import { toolType } from "../Enums/ToolTypes";
import 
{ 
  elementCreate,
  drawElement,
  elementUpdate
} from "../utils";
import { v4 as uuid } from 'uuid';
import { updateElements } from "../store/slices/whiteboardslice";


const WhiteBoard = () => {
  const canvasRef = useRef();

  const selectedTool = useSelector((state) => state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);

  const [currentAction, setCurrentAction] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const dispatch = useDispatch();

  useEffect(()=>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const roughCanvas = rough.canvas(canvas);

      elements.forEach(element => {
        drawElement({roughCanvas,element})
      });      
    },[elements])

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    switch(selectedTool){
      case toolType.LINE :
      case toolType.RECTANGLE :
      case toolType.CIRCLE :
      case toolType.SCRIBBLE :
        const element = elementCreate(
          { x1: clientX,
            y1: clientY,
            x2: clientX,
            y2: clientY,
            selectedTool,
             id : uuid()
            });
        setSelectedElement(element);
        setCurrentAction(()=>whiteboardactions.DRAWING);
        dispatch(updateElements(element));
        break;
    }
  }

  const handleMouseMove = (event) => {
    if(currentAction === whiteboardactions.DRAWING){
        const { clientX, clientY } = event;
        const index =   elements.findIndex((el) => el.id === selectedElement.id);
        if(index !== -1 ){
          elementUpdate(
            {
              index,
              id: elements[index].id,
              x1: elements[index].x1,
              y1: elements[index].y1,
              x2: clientX,
              y2: clientY,
              type: elements[index].type,
            },
            elements
          );
        }
      }
  }

  const handleMouseUp = () => {
    setCurrentAction(null);
  }

  return (
      <>
        <Menu />
        <canvas
          onMouseDown={handleMouseDown} 
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={canvasRef} 
          width={window.innerWidth} 
          height={window.innerHeight} />
      </>
  )
}
export default WhiteBoard