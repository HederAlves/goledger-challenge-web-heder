import { configureStore } from "@reduxjs/toolkit";
import { albumReducer } from "./album-reducer/albumSlice";
import { artistReducer } from "./artist-reducer/artistSlice";
import playlistReducer from "./playlist-reducer/playlistSlice";
import songReducer from "./song-reducer/songSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
        artist: artistReducer,
        album: albumReducer,
        songs: songReducer,
        playlist: playlistReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
