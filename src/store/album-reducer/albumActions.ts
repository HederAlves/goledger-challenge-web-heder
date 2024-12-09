import api from '@/service/api';
import { Album } from '@/model/interfaces';
import { AppDispatch } from '../store';
import { setAlbums, setArtists, setLoading, setError, setAlbumName, setYear, setSelectedArtist, setEditAlbum } from './albumSlice';

export const fetchAlbumsAndArtists = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data: artistData } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'artist' } },
        });
        dispatch(setArtists(artistData.result));

        const { data: albumData } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'album' } },
        });
        dispatch(setAlbums(albumData.result));
    } catch (error) {
        dispatch(setError(`Error fetching albums and artists: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createAlbum = (albumData: { albumName: string; selectedArtist: string; year: number }) => async (dispatch: AppDispatch) => {
    const { albumName, selectedArtist, year } = albumData;
    if (!albumName || !selectedArtist || !year) return;
    dispatch(setLoading(true));
    try {
        await api.post('/invoke/createAsset', {
            asset: [
                {
                    '@assetType': 'album',
                    artist: { '@assetType': 'artist', '@key': selectedArtist },
                    name: albumName,
                    year,
                },
            ],
        });
        dispatch(fetchAlbumsAndArtists());
        dispatch(setAlbumName(''));
        dispatch(setYear(2025));
        dispatch(setSelectedArtist(''));
    } catch (error) {
        dispatch(setError(`Error creating album: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateAlbum = (albumData: { albumName: string; selectedArtist: string; year: number; editAlbum: Album }) => async (dispatch: AppDispatch) => {
    const { albumName, selectedArtist, year, editAlbum } = albumData;
    if (!editAlbum || !albumName || !selectedArtist || !year) return;
    dispatch(setLoading(true));
    try {
        await api.put('/invoke/updateAsset', {
            update: {
                '@assetType': 'album',
                '@key': editAlbum["@key"],
                artist: { '@assetType': 'artist', '@key': selectedArtist },
                name: albumName,
                year,
            },
        });
        dispatch(fetchAlbumsAndArtists());
        dispatch(setAlbumName(''));
        dispatch(setYear(2025));
        dispatch(setSelectedArtist(''));
        dispatch(setEditAlbum(null));
    } catch (error) {
        dispatch(setError(`Error updating album: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteAlbum = (key: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await api.post('/invoke/deleteAsset', {
            key: { '@assetType': 'album', '@key': key },
        });
        dispatch(fetchAlbumsAndArtists());
    } catch (error) {
        dispatch(setError(`Error deleting album: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};
