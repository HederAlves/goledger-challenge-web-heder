import api from '@/service/api';
import { AppDispatch } from '../store';
import { setArtists, setEditArtist, setError, setLoading } from './artistSlice';
import { Artist } from '@/model/interfaces';

export const fetchArtists = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await api.post('/query/search', {
            query: { selector: { '@assetType': 'artist' } },
        });
        dispatch(setArtists(data.result));
    } catch (error) {
        dispatch(setError(`Error fetching artists: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createArtist = (name: string, country: string) => async (dispatch: AppDispatch) => {
    if (!name || !country) return;
    dispatch(setLoading(true));
    try {
        await api.post('/invoke/createAsset', {
            asset: [
                {
                    '@assetType': 'artist',
                    name,
                    country,
                },
            ],
        });
        dispatch(fetchArtists());
    } catch (error) {
        dispatch(setError(`Error creating artist: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateArtist = (name: string, country: string, editArtist: Artist) => async (dispatch: AppDispatch) => {
    if (!editArtist || !name || !country) return;
    dispatch(setLoading(true));
    try {
        await api.put('/invoke/updateAsset', {
            update: {
                '@assetType': 'artist',
                "@key": editArtist["@key"],
                name,
                country,
            },
        });
        dispatch(fetchArtists());
        dispatch(setEditArtist(null));
    } catch (error) {
        dispatch(setError(`Error updating artist: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteArtist = (key: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await api.post('/invoke/deleteAsset', {
            key: { '@assetType': 'artist', '@key': key },
        });
        dispatch(fetchArtists());
    } catch (error) {
        dispatch(setError(`Error deleting artist: ${error}`));
    } finally {
        dispatch(setLoading(false));
    }
};
