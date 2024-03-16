import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tool: null,
    elements : [],
  };
  
  const whiteBoardSlice = createSlice({
    name: "whiteboard",
    initialState,
    reducers: {
      setTool: (state, action) => {
        if(state.tool !== action.payload)
          state.tool = action.payload;
        else
          state.tool = null;
      },
      updateElements : (state,actions) => {
        const { id } = actions.payload;
        const index = state.elements.findIndex((el) => el.id === id);
        if(index === -1){
          state.elements.push(actions.payload);
        }else{
          state.elements[index] = actions.payload
        }
      },
      setElements: (state, action) => {
        state.elements = action.payload;
      },
    },
  });

export const { setTool, updateElements, setElements } = whiteBoardSlice.actions;

export default whiteBoardSlice.reducer;