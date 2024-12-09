import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, Song, Album, PlaylistState } from '@/model/interfaces';

const initialState: PlaylistState = {
    playlists: [],
    albums: [],
    songs: [],
    playlistName: '',
    isPrivate: false,
    selectedAlbum: '',
    selectedSongs: [],
    editPlaylist: null,
    loading: false,
    error: null,
    createPlaylistName: '',
    createIsPrivate: false,
    createSelectedSongs: [],
};

const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
            state.playlists = action.payload;
        },
        setAlbums: (state, action: PayloadAction<Album[]>) => {
            state.albums = action.payload;
        },
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.songs = action.payload;
        },
        setPlaylistName: (state, action: PayloadAction<string>) => {
            state.playlistName = action.payload;
        },
        setIsPrivate: (state, action: PayloadAction<boolean>) => {
            state.isPrivate = action.payload;
        },
        setSelectedAlbum: (state, action: PayloadAction<string>) => {
            state.selectedAlbum = action.payload;
        },
        setSelectedSongs: (state, action: PayloadAction<string[]>) => {
            state.selectedSongs = action.payload;
        },
        setEditPlaylist: (state, action: PayloadAction<Playlist | null>) => {
            state.editPlaylist = action.payload;
        },
        setCreatePlaylistName: (state, action: PayloadAction<string>) => {
            state.createPlaylistName = action.payload;
        },
        setCreateIsPrivate: (state, action: PayloadAction<boolean>) => {
            state.createIsPrivate = action.payload;
        },
        setCreateSelectedSongs: (state, action: PayloadAction<string[]>) => {
            state.createSelectedSongs = action.payload;
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
    setPlaylists,
    setAlbums,
    setSongs,
    setPlaylistName,
    setIsPrivate,
    setSelectedAlbum,
    setSelectedSongs,
    setEditPlaylist,
    setCreatePlaylistName,
    setCreateIsPrivate,
    setCreateSelectedSongs,
    setLoading,
    setError,
} = playlistSlice.actions;

export default playlistSlice.reducer;
