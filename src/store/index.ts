import { configureStore } from "@reduxjs/toolkit";
import freelancerReducer from "./freelancer.slice";
import commentReducer from "./comment.slice";
import postReducer from "./post.slice";

export const store = configureStore({
    reducer: {
        freelancers: freelancerReducer,
        posts: postReducer,
        comments: commentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
