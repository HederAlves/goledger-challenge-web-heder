'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { Playlist } from '@/model/interfaces';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import PlaylistCard from '@/components/cards/PlaylistCard';
import {
    deletePlaylist,
    fetchAlbumsAndPlaylists,
    fetchSongsFromAlbum,
    updatePlaylist
} from '@/store/playlist-reducer/playlistActions';
import { setEditPlaylist, setIsPrivate, setPlaylistName } from '@/store/playlist-reducer/playlistSlice';

const PlaylistPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { playlists, selectedAlbum, editPlaylist } = useSelector((state: RootState) => state.playlist);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistToDelete, setPlaylistToDelete] = useState<Playlist | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(fetchAlbumsAndPlaylists());
    }, [dispatch]);

    useEffect(() => {
        if (selectedAlbum) {
            dispatch(fetchSongsFromAlbum(selectedAlbum));
        }
    }, [selectedAlbum, dispatch]);

    const handleEditClick = (playlist: Playlist) => {
        dispatch(setEditPlaylist(playlist));
        setIsEditModalOpen(true);
    };

    const handleConfirmEdit = () => {
        if (editPlaylist) {

            dispatch(setPlaylistName(editPlaylist.name));
            dispatch(setIsPrivate(editPlaylist.private));

            if (editPlaylist['@key']) {

                dispatch(updatePlaylist(editPlaylist['@key']));
            }

            setIsEditModalOpen(false);
        }
    };

    const handleDeleteClick = (playlist: Playlist) => {
        setPlaylistToDelete(playlist);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (playlistToDelete) {
            dispatch(deletePlaylist(playlistToDelete['@key']));
            setIsModalOpen(false);
            setPlaylistToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setPlaylistToDelete(null);
    };

    return (
        <div className="max-w-4xl h-screen mx-auto pb-6 px-6 pt-32 sm:pt-24">
            <div>
                <div className='flex justify-between'>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-2xl font-bold`}>
                        Playlists
                    </h2>
                    <Link href="/manage"
                        className={`text-${theme === 'light' ? 'black' : 'white'} p-2`}>
                        + Create Playlist
                    </Link>
                </div>
                {playlists.length === 0 ? (
                    <p>No playlists found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {playlists.map((playlist: Playlist) => (
                            <PlaylistCard
                                key={playlist['@key']}
                                title={playlist.name}
                                state={`${playlist.private ? 'Private' : 'Public'}`}
                                totalSongs={`${playlist.songs?.length || 0}`}
                                description={'Manage your songs'}
                                imageUrl={'/alice-in-chains.jpg'}
                                onClick={() => handleEditClick(playlist)}
                                onDelete={() => handleDeleteClick(playlist)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de edição */}
            {isEditModalOpen && editPlaylist && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl mb-4">Edit Playlist</h3>
                        <input
                            type="text"
                            value={editPlaylist.name}
                            onChange={(e) => dispatch(setPlaylistName(e.target.value))}
                            className="mb-4 p-2 w-full border rounded"
                            placeholder="Playlist Name"
                        />
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={editPlaylist.private}
                                onChange={() => {
                                    const updatedPlaylist = { ...editPlaylist, private: !editPlaylist.private };
                                    dispatch(setEditPlaylist(updatedPlaylist));
                                    dispatch(setIsPrivate(updatedPlaylist.private));
                                }}
                            />

                            <label className="ml-2">Private</label>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleConfirmEdit}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-gray-300 p-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmação de exclusão */}
            {isModalOpen && playlistToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl mb-4">Are you sure you want to delete this playlist?</h3>
                        <p className="text-sm text-gray-600 mb-4">{playlistToDelete.name}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleConfirmDelete}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className="bg-gray-300 p-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaylistPage;
