/* eslint-disable @next/next/no-img-element */
import { useTheme } from '@/context/ThemeContext';
import { PlaylistCardProps } from '@/model/interfaces';
import React from 'react';

const PlaylistCard: React.FC<PlaylistCardProps> = ({
    title,
    state,
    totalSongs,
    description,
    onClick,
    onDelete
}) => {
    const { theme } = useTheme();
    return (
        <div
            className="flex flex-col items-center h-[250px] 
            bg-white border border-gray-200 rounded-lg shadow 
            md:flex-row md:max-w-xl 
            hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <img
                className="object-cover w-[30px] h-full rounded-t-lg  md:w-48 md:rounded-none md:rounded-s-lg"
                src={'alice-in-chains.jpg'}
                alt={title}
            />
            <div className={`
                ${theme === 'light' ? 'bg-white' : 'bg-black'}
                flex flex-col justify-between p-4
                w-[222px] h-full
                rounded-r-lg leading-normal`}>
                <h5 className={`
                    ${theme === 'light' ? 'text-black' : 'text-lime-400'}
                    mb-2 text-2xl font-bold
                    tracking-tight overflow-hidden
                    truncate w-[200px]`}>
                    {title}
                </h5>
                <p className='text-orange-600'>{state}</p>
                <div className='flex'>
                    <p className='text-gray-700 mr-3'>Total of Songs</p>
                    <p className='text-blue-600'>{totalSongs}</p>
                </div>
                <p className="mb-3 font-normal text-gray-700">{description}</p>
                <div className="flex justify-between">
                    <button
                        onClick={onClick}
                        className="inline-flex items-center 
                        px-3 py-2 
                        text-sm font-medium text-center text-white 
                        bg-blue-700 rounded-lg hover:bg-blue-800 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4">
                            <path fillRule="evenodd"
                                d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={onDelete}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
                    >
                        Delete
                        <svg
                            className="w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 3h12m-2 0v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3m3 0V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1m-4 4v4m3-4v4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCard;
