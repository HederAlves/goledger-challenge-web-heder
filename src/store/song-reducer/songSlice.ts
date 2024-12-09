import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, Album, SongState } from '@/model/interfaces';

const initialState: SongState = {
    songs: [],
    songName: '',
    selectedAlbum: '',
    editSong: null,
    loading: false,
    error: null,
    albums: [],
};

const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.songs = action.payload;
        },
        setAlbums: (state, action: PayloadAction<Album[]>) => {
            state.albums = action.payload;
        },
        setSongName: (state, action: PayloadAction<string>) => {
            state.songName = action.payload;
        },
        setSelectedAlbum: (state, action: PayloadAction<string>) => {
            state.selectedAlbum = action.payload;
        },
        setEditSong: (state, action: PayloadAction<Song | null>) => {
            state.editSong = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setSongs,
    setAlbums,
    setSongName,
    setSelectedAlbum,
    setEditSong,
    setLoading,
    setError
} = songSlice.actions;

export default songSlice.reducer;
