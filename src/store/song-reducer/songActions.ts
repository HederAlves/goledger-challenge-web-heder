import api from '@/service/api';
import { Song, Album } from '@/model/interfaces';
import {
    setSongs,
    setAlbums,
    setLoading,
    setError
} from './songSlice';
import { AppDispatch } from '../store';

export const fetchSongsAndAlbums = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data: songData } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'song' } },
        });

        const { data: albumData } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'album' } },
        });

        const songsWithAlbumNames = songData.result.map((song: Song) => {
            const album = albumData.result.find((album: Album) => album["@key"] === song.album["@key"]);
            return {
                ...song,
                album: album ? {
                    ...song.album,
                    name: album.name,
                    year: album.year || 'Unknown Year',
                } : song.album,
            };
        });

        dispatch(setSongs(songsWithAlbumNames));
        dispatch(setAlbums(albumData.result));
    } catch (error) {
        dispatch(setError(`Error fetching songs and albums: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createSong = (songData: { songName: string; selectedAlbum: string }) => async (dispatch: AppDispatch) => {
    const { songName, selectedAlbum } = songData;
    if (!songName || !selectedAlbum) return;
    dispatch(setLoading(true));
    try {
        await api.post('/invoke/createAsset', {
            asset: [
                {
                    '@assetType': 'song',
                    name: songName,
                    album: {
                        '@assetType': 'album',
                        '@key': selectedAlbum,
                    },
                },
            ],
        });
        dispatch(fetchSongsAndAlbums());
    } catch (error) {
        dispatch(setError(`Error creating song: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateSong = (songData: { songName: string; selectedAlbum: string; editSong: Song }) => async (dispatch: AppDispatch) => {
    const { songName, selectedAlbum, editSong } = songData;
    if (!songName || !selectedAlbum || !editSong) return;
    dispatch(setLoading(true));
    try {
        await api.put('/invoke/updateAsset', {
            update: {
                '@assetType': 'song',
                '@key': editSong["@key"],
                name: songName,
                album: {
                    '@assetType': 'album',
                    '@key': selectedAlbum,
                },
            },
        });
        dispatch(fetchSongsAndAlbums());
    } catch (error) {
        dispatch(setError(`Error updating song: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteSong = (key: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await api.post('/invoke/deleteAsset', {
            key: {
                '@assetType': 'song',
                '@key': key,
            },
        });
        dispatch(fetchSongsAndAlbums());
    } catch (error) {
        dispatch(setError(`Error deleting song: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};
