import { useTheme } from "@/context/ThemeContext";
import React from "react";

const Footer: React.FC = () => {
    const { theme } = useTheme();
    return (
        <footer
            className={`
                ${theme === 'light' ? 'bg-white' : 'bg-black'} 
                text-${theme === 'light' ? 'black' : 'white'} py-4 border-t 
                ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}
        >
            <div className="container mx-auto text-center">
                <p>&copy; 2024 GoTunesLedger by GoLedger. All rights reserved.</p>
                <p className="mt-2">
                    Developed by
                    <a
                        href="https://www.linkedin.com/in/hederalves/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600"
                    >
                        Heder Alves
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
