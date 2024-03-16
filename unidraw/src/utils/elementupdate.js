import { toolType } from "../Enums";
import { emitElementUpdate } from "../sockjsclient/wsclient";
import { setElements, updateElements } from "../store/slices/whiteboardslice";
import { store } from '../store/store'
import { elementCreate } from "./elementcreate";

export const elementUpdate = ({index, id, x1, y1, x2, y2, type}, elements) => {
    const elementsCopy = [...elements];
    switch(type){
        case toolType.LINE:
        case toolType.RECTANGLE :
        case toolType.CIRCLE : 
            const updatedElement = elementCreate({x1,y1,x2,y2,selectedTool: type,id});
            elementsCopy[index] = updatedElement;
            store.dispatch(setElements(elementsCopy));
            const isConnected = store.getState().whiteboard.sessionConnected;
            if(isConnected ===true){
                emitElementUpdate(elementsCopy);
            }
            break;
        default:
            throw new Error("Something went wrong when updating element");
    }   
}