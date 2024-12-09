import api from '@/service/api';
import { setPlaylists, setAlbums, setSongs, setLoading, setError, } from './playlistSlice';
import { AppDispatch } from '../store';
import { PlaylistState } from '@/model/interfaces';

export const fetchAlbumsAndPlaylists = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data: albumData } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'album' } },
        });
        dispatch(setAlbums(albumData.result));

        const { data: playlistData } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'playlist' } },
        });
        dispatch(setPlaylists(playlistData.result));
    } catch (error) {
        dispatch(setError(`failed fetch album and playlist: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchSongsFromAlbum = (albumKey: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'song', 'album.@key': albumKey } },
        });
        dispatch(setSongs(data.result));
    } catch (error) {
        dispatch(setError(`Failed fetch song: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createPlaylist = () => async (dispatch: AppDispatch, getState: () => { playlist: PlaylistState }) => {
    const { playlistName, isPrivate, selectedSongs } = getState().playlist;  // Usando as variáveis corretas do estado

    if (!playlistName || selectedSongs.length === 0) return;

    dispatch(setLoading(true));
    try {
        await api.post('/invoke/createAsset', {
            asset: [
                {
                    '@assetType': 'playlist',
                    name: playlistName,
                    private: isPrivate,
                    songs: selectedSongs.map((key) => ({
                        '@assetType': 'song',
                        '@key': key,
                    })),
                },
            ],
        });

        dispatch(fetchAlbumsAndPlaylists());
    } catch (error) {
        dispatch(setError(`Failed to create playlist: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};


export const updatePlaylist = (playlistKey: string) => async (dispatch: AppDispatch, getState: () => { playlist: PlaylistState }) => {
    const { playlistName, isPrivate, selectedSongs } = getState().playlist;

    if (!playlistName || selectedSongs.length === 0) return;

    dispatch(setLoading(true));

    try {
        await api.post('/invoke/updateAsset', {
            update: {
                '@assetType': 'playlist',
                '@key': playlistKey,
                name: playlistName,
                private: isPrivate,
            },
        });
        dispatch(fetchAlbumsAndPlaylists());
    } catch (error) {
        dispatch(setError(`Failed to update playlist: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deletePlaylist = (key: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await api.post('/invoke/deleteAsset', {
            key: {
                '@assetType': 'playlist',
                '@key': key,
            },
        });
        dispatch(fetchAlbumsAndPlaylists());
    } catch (error) {
        dispatch(setError(`Error deleting playlist: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};
