import { Theme } from "./types";

export interface Artist {
    "@key": string;
    id: string;
    name: string;
    country: string;
}

export interface Album {
    "@key": string;
    id: string;
    name: string;
    year: number;
    artist: Artist;
}

export interface Song {
    '@key': string;
    id: string;
    album: Album;
    albumId: string;
    songId: string;
    title: string;
    artist: string;
    name: string;
}

export interface Playlist {
    '@key': string;
    album: Album;
    name: string;
    private: boolean;
    songs: Song[];
}

export interface ArtistState {
    artists: Artist[];
    selectedArtist: string;
    editArtist: Artist | null;
    loading: boolean;
    error: string | null;
}

export interface AlbumState {
    albums: Album[];
    artists: Artist[];
    albumName: string;
    year: number;
    selectedArtist: string;
    editAlbum: Album | null;
    loading: boolean;
    error: string | null;
}

export interface PlaylistState {
    playlists: Playlist[];
    albums: Album[];
    songs: Song[];
    playlistName: string;
    isPrivate: boolean;
    selectedAlbum: string;
    selectedSongs: string[];
    editPlaylist: Playlist | null;
    loading: boolean;
    error: string | null;
    createPlaylistName: string;
    createIsPrivate: boolean;
    createSelectedSongs: string[];
}

export interface SongState {
    songs: Song[];
    songName: string;
    selectedAlbum: string;
    editSong: Song | null;
    loading: boolean;
    error: string | null;
    albums: Album[];
}

export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export interface ButtonAdd {
    href: string;
}

export interface ArtistCardProps {
    name: string;
    country: string;
    imageUrl: string;
    onEdit: () => void;
    onDelete: () => void;
}

export interface HomeCardProps {
    title: string;
    subtitle?: string;
    songs?: Song[];
    items: {
        name: string;
        amount?: string;
        [key: string]: string | undefined;
    }[];
    theme?: {
        background?: string;
        border?: string;
        title?: string;
        subtitle?: string;
        itemText?: string;
        itemSecondaryText?: string;
        itemAmount?: string;
    };
    link?: string;
}

export interface ItemCardProps {
    title: string;
    description: string;
    link: string;
    onClick: () => void;
    onDelete: () => void;
}

export interface PlaylistCardProps {
    title: string;
    state: string;
    totalSongs: string;
    description: string;
    imageUrl: string;
    onClick: () => void;
    onDelete: () => void;
}
