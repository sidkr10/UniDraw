import rough from "roughjs/bundled/rough.esm";
import { toolType } from "../Enums";

const generator = rough.generator();

export const elementCreate = ({ x1, y1, x2, y2, selectedTool, id }) =>{
    let roughElement;
    switch(selectedTool){
        case toolType.LINE :
            roughElement = generator.line(x1,y1,x2,y2);
            break;
        case toolType.RECTANGLE :
            roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1);
            break;
        case toolType.CIRCLE :
            roughElement = generator.circle(x1,y1,(Math.sqrt((y2-y1)**2 + (x2-x1)**2))*2);
            break;
        default:
            throw new Error("Something went wrong when creating element");
    }
    return {
        id: id,
        roughElement,
        type: selectedTool,
        x1,
        y1,
        x2,
        y2,
    };
};