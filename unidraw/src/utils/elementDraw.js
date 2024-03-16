import { toolType } from "../Enums";

export const drawElement = ({ roughCanvas, element }) => {
    switch (element.type) {
      case toolType.RECTANGLE:
      case toolType.LINE:
      case toolType.CIRCLE:
        return roughCanvas.draw(element.roughElement);
      default:
        throw new Error("Something went wrong when drawing element");
    }
  };