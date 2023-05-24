import React, { useState } from 'react';
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
            <select
                className="bg-slate-700 px-4 py-2 rounded-md"
                value={selectedOption}
                onChange={(e) => handleSelect(e.target.value)}
            >
                <option value="">Select an option</option>
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