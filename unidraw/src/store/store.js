import {configureStore} from '@reduxjs/toolkit'
import whiteBoardReducer from './slices/whiteboardslice';

export const store = configureStore({
    reducer : {
        whiteboard : whiteBoardReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : {
            ignoreActions: ["whiteboard/setElements"],
            ignoredPaths: ["whiteboard.elements"],
        }
    })
});
