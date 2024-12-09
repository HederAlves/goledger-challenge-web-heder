import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeButton from '../buttons/ThemeButton';
import AddButton from '../buttons/AddButton';

const Header: React.FC<{ hiddenInitially?: boolean; isVisible?: boolean }> = ({
    hiddenInitially = false,
    isVisible = true,
}) => {
    const { theme } = useTheme();
    const pathname = usePathname();
    const isFixed = pathname !== '/';

    return (
        <header
            className={`${isFixed ? 'fixed' : ''} 
            ${theme === 'light' ? 'bg-[#ffffff]' : 'bg-[#811a7c]'} 
            ${hiddenInitially ? (isVisible ? 'translate-y-0' : '-translate-y-full') : ''}
            shadow-lg flex h-20 sm:h-auto top-0 left-0 right-0 p-4 z-50 transition-transform duration-500`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <nav
                    className={`text-${theme === 'light' ? 'black' : 'white'} flex space-x-4 sm:space-x-6 `}
                >
                    <Link href="/">Home</Link>
                    <Link href="/artist">Artists</Link>
                    <Link href="/album">Albums</Link>
                    <Link href="/song">Songs</Link>
                    <Link href="/playlists">Playlist</Link>
                </nav>
                <ThemeButton />
                <AddButton href='/manage' />
            </div>
        </header>
    );
};

export default Header;
