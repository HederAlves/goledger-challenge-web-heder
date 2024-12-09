/* eslint-disable @next/next/no-img-element */
'use client'

import { useTheme } from '@/context/ThemeContext';
import { ArtistCardProps } from '@/model/interfaces';
import { FC, useState } from 'react';

const ArtistCard: FC<ArtistCardProps> = ({ name, country, onEdit, onDelete }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const { theme } = useTheme();

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setShowDeleteConfirmation(false);
    };

    return (
        <div className=
            {`border-${theme === 'light' ? 'violet-900' : 'white'} 
            ${theme === 'light' ? 'bg-white' : 'bg-[#2222]'}
            w-full max-w-sm border rounded-lg shadow-xl`}>
            <div className="flex justify-between px-4 pt-2">
                <button
                    onClick={handleDeleteClick}
                    className="inline-block 
                    text-gray-500 dark:text-gray-400 
                    hover:bg-gray-100 dark:hover:bg-gray-700 
                    focus:ring-4 focus:outline-none 
                    focus:ring-gray-200 dark:focus:ring-gray-700 
                    rounded-lg 
                    text-sm p-1.5 font-bold"
                    type="button"
                >
                    x
                </button>
                <button
                    onClick={onEdit}
                    className="inline-block 
                    text-gray-500 dark:text-gray-400 
                    hover:bg-gray-100 dark:hover:bg-gray-700 
                    focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 
                    rounded-lg 
                    text-sm p-1.5"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
                        <h3 className="text-lg font-medium text-gray-900">
                            Are you sure you want to delete this artist?
                        </h3>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={handleCancelDelete}
                                className="
                                px-4 py-2 
                                text-sm text-gray-500 
                                dark:text-gray-400 
                                hover:bg-gray-200 dark:hover:bg-gray-700 
                                rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="
                                px-4 py-2 
                                text-sm text-white 
                                bg-red-500 hover:bg-red-600 
                                rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center pb-10">
                <img src={'song-people.jpg'}
                    alt="Artist image"
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                />
                <h5 className={`
                    text-${theme === 'light' ? 'black' : 'lime-400'}
                    truncate text-center w-[18vw]
                    p-4 mb-1 text-xl font-medium`}>
                    {name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {country}
                </span>
            </div>
        </div>
    );
};

export default ArtistCard;
