import React, { useState } from 'react';
import {GetLang, SetLang} from "../Utilities/Lang";
interface DropdownWithSearchProps {
    options: string[];
    onSelect: (option: string) => void;
}
const DropdownWithSearch : React.FC<DropdownWithSearchProps> = ({options, onSelect,}) =>{
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <div className={"flex flex-row w-full"}>
            <input
                className="bg-slate-700 px-4 py-2 rounded-md"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="white" className="w-20 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
            </svg>
            <select
                className="bg-slate-700 px-4 py-2 rounded-md"
                value={selectedOption}
                onChange={(e) => handleSelect(e.target.value)}
            >
                <option value="">{GetLang().Select_an_option}</option>
                {filteredOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownWithSearch;