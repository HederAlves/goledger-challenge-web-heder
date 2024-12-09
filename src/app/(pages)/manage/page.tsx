'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setAlbumName, setYear, setSelectedArtist, } from '@/store/album-reducer/albumSlice';
import { Song } from '@/model/interfaces';
import { useTheme } from '@/context/ThemeContext';
import { createAlbum, fetchAlbumsAndArtists } from '@/store/album-reducer/albumActions';
import { createSong, fetchSongsAndAlbums } from '@/store/song-reducer/songActions';
import { setSongName } from '@/store/song-reducer/songSlice';
import { setIsPrivate, setPlaylistName, setSelectedAlbum, setSelectedSongs } from '@/store/playlist-reducer/playlistSlice';
import { createArtist } from '@/store/artist-reducer/artistActions';
import { createPlaylist, fetchSongsFromAlbum } from '@/store/playlist-reducer/playlistActions';

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { albums, songName, loading: songLoading } = useSelector((state: RootState) => state.songs);
    const [artistName, setArtistName] = useState('');
    const [country, setCountry] = useState('');
    const { loading: artistLoading } = useSelector((state: RootState) => state.artist);
    const [selectedSongAlbumLocal, setSelectedSongAlbumLocal] = useState<string>('');
    const [selectedPlaylistAlbumLocal, setSelectedPlaylistAlbumLocal] = useState<string>('');
    const { theme } = useTheme();

    const { albumName, year, selectedArtist, artists, loading: albumLoading } = useSelector(
        (state: RootState) => state.album
    );

    const { playlistName, isPrivate, selectedSongs, songs, loading: playlistLoading } = useSelector(
        (state: RootState) => state.playlist
    );

    useEffect(() => {
        dispatch(fetchSongsAndAlbums());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAlbumsAndArtists());
    }, [dispatch]);

    const handleSongSubmit = () => {
        dispatch(createSong({ songName, selectedAlbum: selectedSongAlbumLocal }));
    };

    const handleArtistSubmit = () => {
        dispatch(createArtist(artistName, country));
        setArtistName('');
        setCountry('');
    };

    const handleAlbumSubmit = () => {
        dispatch(createAlbum({ albumName, selectedArtist, year }));
        dispatch(setAlbumName(''));
        dispatch(setYear(2025));
        dispatch(setSelectedArtist(''));
    };

    useEffect(() => {
        if (selectedPlaylistAlbumLocal) {
            dispatch(fetchSongsFromAlbum(selectedPlaylistAlbumLocal));
            dispatch(setSelectedAlbum(selectedPlaylistAlbumLocal));
        }
    }, [selectedPlaylistAlbumLocal, dispatch]);

    const handleSongSelection = (songKey: string) => {
        dispatch(
            setSelectedSongs(
                selectedSongs.includes(songKey)
                    ? selectedSongs.filter((key: string) => key !== songKey)
                    : [...selectedSongs, songKey]
            )
        );
    };

    const handlePlaylistSubmit = () => {
        dispatch(createPlaylist());
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 pt-24 sm:pt-20">
            <h1 className={`
                text-${theme === 'light' ? 'black' : 'white'} 
                text-2xl font-bold text-center`}>
                Create Assets
            </h1>
            <div className="space-y-8">
                {/* Song Form */}
                <div>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-xl font-semibold mb-4`}>
                        Create Song
                    </h2>
                    <input
                        type="text"
                        placeholder="Song Name"
                        className="border p-2 rounded w-full mb-2"
                        value={songName}
                        onChange={(e) => dispatch(setSongName(e.target.value))}
                    />
                    <select
                        className="border p-2 rounded w-full mb-2"
                        value={selectedSongAlbumLocal}
                        onChange={(e) => setSelectedSongAlbumLocal(e.target.value)}
                    >
                        <option value="">Select Album</option>
                        {albums.map((album) => (
                            <option key={album["@key"]} value={album["@key"]}>
                                {album.name} ({album.year})
                            </option>
                        ))}
                    </select>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
                        onClick={handleSongSubmit}
                        disabled={songLoading}
                    >
                        Create Song
                    </button>
                </div>

                {/* Artist Form */}
                <div>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-xl font-semibold mb-4`}>
                        Create Artist
                    </h2>
                    <input
                        type="text"
                        placeholder="Artist Name"
                        className="border p-2 rounded w-full mb-2"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        className="border p-2 rounded w-full mb-2"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
                        onClick={handleArtistSubmit}
                        disabled={artistLoading}
                    >
                        Create Artist
                    </button>
                </div>

                {/* Album Form */}
                <div>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-xl font-semibold mb-4`}>
                        Create Album
                    </h2>
                    <input
                        type="text"
                        placeholder="Album Name"
                        className="border p-2 rounded w-full mb-2"
                        value={albumName}
                        onChange={(e) => dispatch(setAlbumName(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        className="border p-2 rounded w-full mb-2"
                        value={year}
                        onChange={(e) => dispatch(setYear(Number(e.target.value)))}
                    />
                    <select
                        className="border p-2 rounded w-full mb-2"
                        value={selectedArtist}
                        onChange={(e) => dispatch(setSelectedArtist(e.target.value))}
                    >
                        <option value="">Select Artist</option>
                        {artists.map((artist) => (
                            <option key={artist["@key"]} value={artist["@key"]}>
                                {artist.name}
                            </option>
                        ))}
                    </select>

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
                        onClick={handleAlbumSubmit}
                        disabled={albumLoading}
                    >
                        Create Album
                    </button>
                </div>

                {/* Playlist Form */}
                <div>
                    <h2 className={`
                        text-${theme === 'light' ? 'black' : 'white'} 
                        text-xl font-semibold mb-4`}>
                        Create Playlist
                    </h2>
                    <input
                        type="text"
                        placeholder="Playlist Name"
                        className="border p-2 rounded w-full mb-2"
                        value={playlistName}
                        onChange={(e) => dispatch(setPlaylistName(e.target.value))}
                    />
                    <label className="flex items-center space-x-2 mb-2">
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => dispatch(setIsPrivate(e.target.checked))}
                        />
                        <span className='text-orange-500' >Private</span>
                    </label>
                    <select
                        className="border p-2 rounded w-full mb-2"
                        value={selectedPlaylistAlbumLocal}
                        onChange={(e) => setSelectedPlaylistAlbumLocal(e.target.value)}
                    >
                        <option value="">Select Album</option>
                        {albums.map((album) => (
                            <option key={album["@key"]} value={album["@key"]}>
                                {album.name}
                            </option>
                        ))}
                    </select>
                    <div className="mt-4">
                        <h3 className={`
                            text-${theme === 'light' ? 'black' : 'white'}
                             text-xl font-semibold mb-4`}>
                            Select Songs
                        </h3>
                        {songs.length === 0 ? (
                            <p className={`text-${theme === 'light' ? 'black' : 'white'}`}>No songs available for this album.</p>
                        ) : (
                            <ul>
                                {songs.map((song: Song) => (
                                    <li key={song['@key']} className={`text-${theme === 'light' ? 'black' : 'white'} flex items-center space-x-2`}>
                                        <input
                                            type="checkbox"
                                            checked={selectedSongs.includes(song['@key'])}
                                            onChange={() => handleSongSelection(song['@key'])}
                                        />
                                        <span>{song.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 disabled:bg-gray-400"
                        onClick={handlePlaylistSubmit}
                        disabled={playlistLoading}
                    >
                        Create Playlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;

