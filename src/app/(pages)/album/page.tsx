'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
    setAlbumName,
    setYear,
    setSelectedArtist,
    setEditAlbum
} from '@/store/album-reducer/albumSlice';
import ItemCard from '@/components/cards/ItemCard';
import { Album } from '@/model/interfaces';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { createAlbum, deleteAlbum, fetchAlbumsAndArtists, updateAlbum } from '@/store/album-reducer/albumActions';

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        albums,
        artists,
        albumName,
        year,
        selectedArtist,
        editAlbum,
        loading,
        error
    } = useSelector((state: RootState) => state.album);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(fetchAlbumsAndArtists());
    }, [dispatch]);

    const handleSubmit = () => {
        if (editAlbum) {
            dispatch(updateAlbum({ albumName, selectedArtist, year, editAlbum }));
        } else {
            dispatch(createAlbum({ albumName, selectedArtist, year }));
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (albumToDelete) {
            dispatch(deleteAlbum(albumToDelete["@key"]));
        }
        setIsDeleteModalOpen(false);
    };

    const openModal = (album: Album) => {
        dispatch(setEditAlbum(album));
        dispatch(setAlbumName(album.name));
        dispatch(setYear(album.year));
        dispatch(setSelectedArtist(album.artist["@key"]));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(setEditAlbum(null));
    };

    const openDeleteModal = (album: Album) => {
        setAlbumToDelete(album);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setAlbumToDelete(null);
    };

    return (
        <div className="max-w-4xl mx-auto pb-6 px-6 pt-32 sm:pt-24">
            {error && <p className="text-red-500">{error}</p>}

            <div>
                <div className='flex justify-between'>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-2xl font-bold`}>
                        Albums
                    </h2>
                    <Link
                        href="/manage"
                        className={`text-${theme === 'light' ? 'black' : 'white'} p-2`}
                    >
                        + Create Album
                    </Link>
                </div>
                {albums.length === 0 ? (
                    <p>No albums found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {albums.map((album) => (
                            <ItemCard
                                key={album["@key"]}
                                title={album.name}
                                description={` Release in - ${album.year}`}
                                onClick={() => openModal(album)}
                                onDelete={() => openDeleteModal(album)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-2xl font-bold mb-4">{editAlbum ? "Edit Album" : "Create Album"}</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Album Name</label>
                            <input
                                type="text"
                                value={albumName}
                                onChange={(e) => dispatch(setAlbumName(e.target.value))}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Year</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => dispatch(setYear(Number(e.target.value)))}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Artist</label>
                            <select
                                value={selectedArtist}
                                onChange={(e) => dispatch(setSelectedArtist(e.target.value))}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select an artist</option>
                                {artists.map((artist) => (
                                    <option key={artist["@key"]} value={artist["@key"]}>
                                        {artist.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                {editAlbum ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete this album?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={closeDeleteModal}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Page;
