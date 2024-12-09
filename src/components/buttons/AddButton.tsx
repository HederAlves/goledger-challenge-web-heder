import Link from 'next/link';
import { ButtonAdd } from '@/model/interfaces';

const AddButton: React.FC<ButtonAdd> = ({ href }) => {
    return (
        <Link
            href={href}
            className="
                border-2
                border-gray-200
                shadow-2xl
                flex items-center justify-center
                 w-9 h-9 sm:w-14 sm:h-14 rounded-full
                bg-lime-500 text-white
                hover:bg-orange-500
                transition duration-300 ease-in-out
                top-[60px] sm:top-5 left-[10px] sm:left-[50px] lg:left-[162px] fixed z-50
            "
        >
            <span className=" text-4xl sm:text-6xl mb-[10] sm:mb-[15px] font-extrabold">+</span>
        </Link>
    );
};

export default AddButton;
