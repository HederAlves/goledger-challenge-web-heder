/* eslint-disable @next/next/no-img-element */
import { HomeCardProps } from '@/model/interfaces';
import React from 'react';

const HomeCard: React.FC<HomeCardProps> = ({ title, subtitle, items, theme, link }) => {

    return (
        <div
            className={`
                ${theme?.background || 'bg-white dark:bg-gray-800'} 
                ${theme?.border || 'border border-gray-200 dark:border-gray-700'}
                w-full max-w-[23vw] min-w-60 p-4 rounded-lg shadow-xl sm:p-6 `}
        >
            <div className="flex items-center justify-between mb-4">
                <h5
                    className={`
                        ${theme?.title || 'text-gray-900 dark:text-white'}
                        text-xl font-bold leading-none`}
                >
                    {title}
                </h5>
                {subtitle && link && (
                    <a
                        href={link}
                        className={`
                            ${theme?.subtitle || 'text-blue-600 dark:text-blue-500'}
                            text-sm font-medium hover:underline`}
                    >
                        {subtitle}
                    </a>
                )}
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item, index) => (
                        <li key={index} className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={'song-people.jpg'}
                                        alt={`${item.name} profile`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p
                                        className={`
                                            ${theme?.itemText || 'text-gray-900 dark:text-white'}
                                            text-sm font-medium truncate`}
                                    >
                                        {item.name}
                                    </p>
                                    {/* Renderiza as outras propriedades dinamicamente */}
                                    {Object.keys(item).map((key) =>
                                        key !== 'name' && key !== 'amount' && key !== 'name' ? (
                                            <p
                                                key={key}
                                                className={`
                                                    ${theme?.itemSecondaryText || 'text-gray-500 dark:text-gray-400'}
                                                    text-sm truncate`}
                                            >
                                                {item[key]}
                                            </p>
                                        ) : null
                                    )}
                                </div>
                                {/* Renderiza o 'amount' somente se ele for válido */}
                                {item.amount && item.amount !== '0' && item.amount.trim() !== '' && (
                                    <div
                                        className={`
                                            ${theme?.itemAmount || 'text-gray-900 dark:text-white'}
                                            inline-flex items-center text-base font-semibold `}
                                    >
                                        {item.amount}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomeCard;
