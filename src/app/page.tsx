'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import HomeCard from '@/components/cards/HomeCard';
import { useTheme } from '@/context/ThemeContext';
import { Album, Playlist, Song } from '@/model/interfaces';
import { fetchAlbumsAndArtists } from '@/store/album-reducer/albumActions';
import { fetchArtists } from '@/store/artist-reducer/artistActions';
import { fetchAlbumsAndPlaylists } from '@/store/playlist-reducer/playlistActions';
import { fetchSongsAndAlbums } from '@/store/song-reducer/songActions';

const HomePage: React.FC = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();

    const cardThemeYellow = {
        background: 'bg-yellow-100',
        border: 'border-yellow-400',
        title: 'text-yellow-700',
        subtitle: 'text-yellow-600',
        itemText: 'text-yellow-800',
        itemSecondaryText: 'text-yellow-600',
        itemAmount: 'text-yellow-900',
    };

    const cardThemeLime = {
        background: 'bg-lime-100',
        border: 'border-lime-400',
        title: 'text-lime-700',
        subtitle: 'text-lime-600',
        itemText: 'text-lime-800',
        itemSecondaryText: 'text-lime-600',
        itemAmount: 'text-lime-900',
    };

    const cardThemeTeal = {
        background: 'bg-teal-100',
        border: 'border-teal-400',
        title: 'text-teal-700',
        subtitle: 'text-teal-600',
        itemText: 'text-teal-800',
        itemSecondaryText: 'text-teal-600',
        itemAmount: 'text-teal-900',
    };

    const cardThemeRed = {
        background: 'bg-red-100',
        border: 'border-red-400',
        title: 'text-red-700',
        subtitle: 'text-red-600',
        itemText: 'text-red-800',
        itemSecondaryText: 'text-red-600',
        itemAmount: 'text-red-900',
    };

    // Fetch songs, albums, playlists, and artists when the component mounts
    useEffect(() => {
        dispatch(fetchSongsAndAlbums());
        dispatch(fetchAlbumsAndPlaylists()); // Também busca as playlists
        dispatch(fetchArtists()); // Buscando os artistas
        dispatch(fetchAlbumsAndArtists()); // Buscando os álbuns e artistas
    }, [dispatch]);

    // Select songs, albums, playlists, and artists from Redux store
    const songs = useSelector((state: RootState) => state.songs.songs);
    const albums = useSelector((state: RootState) => state.album.albums); // Select albums
    const playlists = useSelector((state: RootState) => state.playlist.playlists);
    const artists = useSelector((state: RootState) => state.artist.artists);

    // Get the counts
    const totalArtists = artists.length;
    const totalAlbums = albums.length;
    const totalSongs = songs.length;
    const totalPlaylists = playlists.length;

    // Transform songs data into a suitable format for HomeCard
    const songsData = songs.map((song: Song) => {
        // Encontrar o álbum correspondente à música
        const album = albums.find((album: Album) => album.id === song.albumId); // Ajuste para a sua estrutura

        return {
            name: song.name,
            albumName: album ? album.name : 'Unknown Album', // Retorna o nome do álbum ou "Unknown Album"
        };
    });

    // Prepare playlists data with song names
    const playlistsData = playlists.map((playlist: Playlist) => {
        const playlistSongs = playlist.songs.map(() => {

            const song = songs.find((song: Song) => song.id === song.songId);
            return song ? song.name : 'Unknown Song'; // Retorna o nome da música ou 'Unknown Song'
        });

        return {
            name: playlist.name,
            details: playlistSongs.join(', '), // Exibe os nomes das músicas separados por vírgula
            amount: `${playlistSongs.length} songs`, // Exibe a quantidade de músicas
        };
    });

    // Prepare artists data with country
    const artistsData = artists.map((artist) => {
        // Filtra os álbuns que pertencem ao artista, comparando o campo "@key"
        const artistAlbums = albums.filter((album: Album) => album.artist["@key"] === `artist:${artist.id}`);

        return {
            name: artist.name,
            country: artist.country, // Incluindo o país
            amount: `${artistAlbums.length} albums`, // Conta a quantidade de álbuns
        };
    });

    // Prepare albums data with year
    const albumsData = albums.map((album: Album) => ({
        name: album.name,
        year: album.year.toString(), // Adicionando o ano do álbum
    }));

    return (
        <div className={`text-${theme === 'light' ? 'black' : 'white'} min-h-screen`}>
            <main>
                {/* Parallax Section */}
                <div
                    className="relative w-full h-[40vh] lg:h-[70vh] bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: "url('/banner.jpg')" }}
                >
                    <div className="sm:absolute sm:top-0 sm:right-0 p-8 bg-black bg-opacity-30 backdrop-blur-md rounded-xl sm:w-[350px] m-2 items-end">
                        <div className="space-y-2">
                            <p className="text-2xl font-semibold text-yellow-600">
                                <span className="font-extrabold text-2xl text-yellow-300">{totalArtists}</span> Artists castratos
                            </p>
                            <p className="text-2xl font-semibold text-lime-600">
                                Chegamos a <span className="font-extrabold text-2xl text-lime-300">{totalAlbums}</span> Albums
                            </p>
                            <p className="text-2xl font-semibold text-teal-600">
                                Em um Total de <span className="font-extrabold text-2xl text-teal-300">{totalSongs}</span> musics
                            </p>
                            <p className="text-2xl font-semibold text-red-600">
                                Playlists Ativas Agora <span className="font-extrabold text-2xl text-red-300">{totalPlaylists}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className={`${theme === 'light' ? 'bg-[#ffffff]' : 'bg-black'} flex gap-5 p-5 flex-wrap  lg:flex-nowrap justify-center`}>
                    {/* Artists HomeCard */}
                    <HomeCard
                        title="Artists"
                        subtitle="View all"
                        link="/artist"
                        items={artistsData.slice(0, 4)} // Exibindo os primeiros 4 artistas
                        theme={cardThemeYellow} // Passando o tema customizado
                    />

                    {/* Albums HomeCard */}
                    <HomeCard
                        title="Albums"
                        subtitle="View all"
                        link="/album"
                        items={albumsData.slice(0, 4)} // Exibindo os primeiros 4 álbuns
                        theme={cardThemeLime} // Passando o tema customizado
                    />

                    {/* Songs HomeCard */}
                    <HomeCard
                        title="Songs"
                        subtitle="View all"
                        link="/song"
                        items={songsData.slice(0, 4)} // Exibindo as primeiras 4 músicas
                        theme={cardThemeTeal} // Passando o tema customizado
                    />

                    {/* Playlists HomeCard */}
                    <HomeCard
                        title="Playlists"
                        subtitle="View all"
                        link="/playlist"
                        items={playlistsData.slice(0, 4)} // Exibindo as primeiras 4 playlists
                        theme={cardThemeRed} // Passando o tema customizado
                    />
                </div>
            </main>
        </div>
    );
};

export default HomePage;
