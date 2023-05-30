import React from 'react';
interface TableProps {
    data: any[];
}
function Table({ data }: TableProps) {
    return (
        <table className="border-collapse border border-gray-300">
            <thead>
            <tr>
                {data && data.length > 0 &&Object.keys(data[0]).map((key) => (
                    <th className="border border-gray-300 p-2" key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data && data.length > 0 &&data.map((item, index) => (
                <tr key={index}>
                    {Object.values(item).map((value, index) => (
                        <td className="border border-gray-300 p-2" key={index}>{value as React.ReactNode}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;