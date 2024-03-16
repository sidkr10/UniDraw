import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tool: null,
    sessionConnected : false,
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
      setSessionState: (state, actions) => {
        state.sessionConnected = actions.payload;
      }
    },
  });

export const { setTool, updateElements, setElements, setSessionState } = whiteBoardSlice.actions;

export default whiteBoardSlice.reducer;