import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artist, ArtistState } from '@/model/interfaces';

const initialState: ArtistState = {
    artists: [],
    selectedArtist: '',
    editArtist: null,
    loading: false,
    error: null,
};

const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        setArtists: (state, action: PayloadAction<Artist[]>) => {
            state.artists = action.payload;
        },
        setSelectedArtist: (state, action: PayloadAction<string>) => {
            state.selectedArtist = action.payload;
        },
        setEditArtist: (state, action: PayloadAction<Artist | null>) => {
            state.editArtist = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setArtists, setSelectedArtist, setEditArtist, setLoading, setError } = artistSlice.actions;
export const artistReducer = artistSlice.reducer;
