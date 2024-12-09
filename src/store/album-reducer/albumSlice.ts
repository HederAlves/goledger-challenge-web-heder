import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album, AlbumState, Artist } from '@/model/interfaces';

const initialState: AlbumState = {
    albums: [],
    artists: [],
    albumName: '',
    year: 0,
    selectedArtist: '',
    editAlbum: null,
    loading: false,
    error: null,
};

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums: (state, action: PayloadAction<Album[]>) => {
            state.albums = action.payload;
        },
        setArtists: (state, action: PayloadAction<Artist[]>) => {
            state.artists = action.payload;
        },
        setAlbumName: (state, action: PayloadAction<string>) => {
            state.albumName = action.payload;
        },
        setYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload;
        },
        setSelectedArtist: (state, action: PayloadAction<string>) => {
            state.selectedArtist = action.payload;
        },
        setEditAlbum: (state, action: PayloadAction<Album | null>) => {
            state.editAlbum = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setAlbums, setArtists, setAlbumName, setYear, setSelectedArtist, setEditAlbum, setLoading, setError } = albumSlice.actions;
export const albumReducer = albumSlice.reducer;
