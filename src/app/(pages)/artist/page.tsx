'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import ArtistCard from '@/components/cards/ArtistCard';
import { Artist } from '@/model/interfaces';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { deleteArtist, fetchArtists, updateArtist } from '@/store/artist-reducer/artistActions';
import { setEditArtist } from '@/store/artist-reducer/artistSlice';

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { artists, editArtist, loading, } = useSelector((state: RootState) => state.artist);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const handleSubmit = () => {
        if (editArtist) {
            dispatch(updateArtist(name, country, editArtist));
        }
        setName('');
        setCountry('');
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteArtist(id));
    };

    const handleEdit = (artist: Artist) => {
        setName(artist.name);
        setCountry(artist.country);
        dispatch(setEditArtist(artist));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setName('');
        setCountry('');
        dispatch(setEditArtist(null));
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-4xl mx-auto pb-6 px-6 pt-32 sm:pt-24">

            <div>
                <div className='flex justify-between'>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-2xl font-bold`}>
                        Artists
                    </h2>
                    <Link
                        href="/manage"
                        className={`
                            text-${theme === 'light' ? 'black' : 'white'} p-2`}
                    >
                        + Create Artist
                    </Link>
                </div>
                {artists.length === 0 ? (
                    <p>No artists found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artists.map((artist) => (
                            <ArtistCard
                                key={artist["@key"]}
                                name={artist.name}
                                country={artist.country}
                                onEdit={() => handleEdit(artist)}
                                onDelete={() => handleDelete(artist["@key"])}
                            />
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">{editArtist ? 'Edit Artist' : 'New Artist'}</h2>
                        <input
                            type="text"
                            placeholder="Artist Name"
                            className="border p-2 rounded mb-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            className="border p-2 rounded mb-4 w-full"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-500 text-white p-2 rounded"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {editArtist ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
