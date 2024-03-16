import rough from "roughjs/bundled/rough.esm";
import { toolType } from "../Enums";

const generator = rough.generator();

export const elementCreate = ({ x1, y1, x2, y2, selectedTool, id }) =>{
    let roughElement;
    switch(selectedTool){
        case toolType.LINE :
            roughElement = generator.line(x1,y1,x2,y2);
            return {
                id: id,
                roughElement,
                type: selectedTool,
                x1,
                y1,
                x2,
                y2,
              };
        case toolType.RECTANGLE :
            roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1);
            return {
                id: id,
                roughElement,
                type: selectedTool,
                x1,
                y1,
                x2,
                y2,
              };
        default:
            throw new Error("Something went wrong when creating element");
    }
};