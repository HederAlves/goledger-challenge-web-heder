'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { Song } from '@/model/interfaces';
import ItemCard from '@/components/cards/ItemCard';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { deleteSong, fetchSongsAndAlbums, updateSong } from '@/store/song-reducer/songActions';

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { songs, albums } = useSelector((state: RootState) => state.songs);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [songToEdit, setSongToEdit] = useState<Song | null>(null);
    const [songName, setSongNameInput] = useState('');
    const [selectedAlbum, setSelectedAlbumInput] = useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [songToDelete, setSongToDelete] = useState<Song | null>(null);

    const { theme } = useTheme();

    useEffect(() => {
        dispatch(fetchSongsAndAlbums());
    }, [dispatch]);

    const handleDelete = (key: string) => {
        dispatch(deleteSong(key));
        setIsDeleteModalOpen(false);
    };

    const handleEdit = (song: Song) => {
        setSongToEdit(song);
        setSongNameInput(song.name);
        setSelectedAlbumInput(song.album?.name || '');
        setIsEditModalOpen(true);
    };

    const handleUpdate = () => {
        if (songToEdit) {
            const updatedAlbum = albums.find((album) => album.name === selectedAlbum);
            if (!updatedAlbum) return;
            const updatedSong = {
                songName: songName,
                selectedAlbum: selectedAlbum,
                editSong: songToEdit,
            };

            dispatch(updateSong(updatedSong));
            setIsEditModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
    };

    const openDeleteModal = (song: Song) => {
        setSongToDelete(song);
        setIsDeleteModalOpen(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setSongToDelete(null);
    };

    return (
        <div className="max-w-4xl mx-auto pb-6 px-6 pt-32 sm:pt-24">
            <div>
                <div className='flex justify-between'>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-2xl font-bold`}>
                        Songs
                    </h2>
                    <Link
                        href="/manage"
                        className={`
                            text-${theme === 'light' ? 'black' : 'white'} p-2`}
                    >
                        + Create Song
                    </Link>
                </div>

                {songs.length === 0 ? (
                    <p>No songs found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {songs.map((song) => (
                            <ItemCard
                                key={song["@key"]}
                                title={song.name}
                                description={`${song.album?.name || 'Unknown Album'}
                                (${song.album?.year || 'Unknown Year'})`}
                                onClick={() => handleEdit(song)}
                                onDelete={() => openDeleteModal(song)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de Edição */}
            {isEditModalOpen && songToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Edit Song</h3>
                        <div className="mb-4">
                            <label htmlFor="songName" className="block text-sm font-semibold">
                                Song Name
                            </label>
                            <input
                                id="songName"
                                type="text"
                                value={songName}
                                onChange={(e) => setSongNameInput(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="albumName" className="block text-sm font-semibold">Album Name</label>
                            <select
                                id="albumName"
                                value={selectedAlbum}
                                onChange={(e) => setSelectedAlbumInput(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Album</option>
                                {albums.map((album) => (
                                    <option key={album.name} value={album.name}>
                                        {album.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Exclusão */}
            {isDeleteModalOpen && songToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this song?</h3>
                        <p className="mb-4">{songToDelete.name}</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(songToDelete["@key"])}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
