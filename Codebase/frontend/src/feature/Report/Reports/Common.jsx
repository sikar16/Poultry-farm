import React, { useState } from 'react';
import { reportData } from '../../../demo/demo'; // Adjust the path as necessary

function Common() {
    const totalData = reportData.reduce((totals, row) => {
        totals.birds += row.birds;
        totals.feed += row.feed;
        totals.medicationCost += row.medicationCost;
        totals.supplementCost += row.supplementCost;
        return totals;
    }, { birds: 0, feed: 0, medicationCost: 0, supplementCost: 0 });

    const handlePrint = () => {
        window.print();
    };

    const [selectedTab, setSelectedTab] = useState("broilers");

    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex gap-8 text-gray-600 mt-4 mb-1">
                    <button
                        className={`hover:underline ${selectedTab === "broilers" ? "text-black" : "text-gray-400"}`}
                        onClick={() => setSelectedTab("broilers")}
                    >
                        Broilers
                    </button>
                    <button
                        className={`hover:underline ${selectedTab === "layers" ? "text-black" : "text-gray-400"}`}
                        onClick={() => setSelectedTab("layers")}
                    >
                        Layers
                    </button>
                    <button
                        className={`hover:underline ${selectedTab === "hatchlings" ? "text-black" : "text-gray-400"}`}
                        onClick={() => setSelectedTab("hatchlings")}
                    >
                        Hatchlings
                    </button>
                </div>
                <hr className="my-2 border-gray-300" />

                <div className="pt-6">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md">
                        <thead>
                            <tr className="bg-gray-100 text-black">
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">Number of Birds</th>
                                <th className="py-2 px-4 border-b">Feed Consumed (kg)</th>
                                <th className="py-2 px-4 border-b">Mortality Rate</th>
                                <th className="py-2 px-4 border-b">Medication Cost</th>
                                <th className="py-2 px-4 border-b">Supplement Cost</th>
                                {selectedTab === "broilers" && (
                                    <>
                                        <th className="py-2 px-4 border-b">Eggs Produced</th>
                                        <th className="py-2 px-4 border-b">Eggs Bad</th>
                                    </>
                                )}
                                {selectedTab === "layers" && (
                                    <>
                                        <th className="py-2 px-4 border-b">Layers Produced</th>
                                        <th className="py-2 px-4 border-b">Layers Bad</th>
                                    </>
                                )}
                                {selectedTab === "hatchlings" && (
                                    <>
                                        <th className="py-2 px-4 border-b">Hatchlings Produced</th>
                                        <th className="py-2 px-4 border-b">Hatchlings Bad</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{row.date}</td>
                                    <td className="py-2 px-4 border-b">{row.birds}</td>
                                    <td className="py-2 px-4 border-b">{row.feed}</td>
                                    <td className="py-2 px-4 border-b">{row.mortalityRate}</td>
                                    <td className="py-2 px-4 border-b">{row.medicationCost}</td>
                                    <td className="py-2 px-4 border-b">{row.supplementCost}</td>
                                    {selectedTab === "broilers" && (
                                        <>
                                            <td className="py-2 px-4 border-b">{row.eggsProduced}</td>
                                            <td className="py-2 px-4 border-b">{row.eggsBad}</td>
                                        </>
                                    )}
                                    {selectedTab === "layers" && (
                                        <>
                                            <td className="py-2 px-4 border-b">{row.layersProduced}</td>
                                            <td className="py-2 px-4 border-b">{row.layersBad}</td>
                                        </>
                                    )}
                                    {selectedTab === "hatchlings" && (
                                        <>
                                            <td className="py-2 px-4 border-b">{row.hatchlingsProduced}</td>
                                            <td className="py-2 px-4 border-b">{row.hatchlingsBad}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            <tr className="bg-gray-200 font-bold">
                                <td className="py-2 px-4">Total</td>
                                <td className="py-2 px-4">{totalData.birds}</td>
                                <td className="py-2 px-4">{totalData.feed}</td>
                                <td className="py-2 px-4">-</td>
                                <td className="py-2 px-4">{totalData.medicationCost}</td>
                                <td className="py-2 px-4">{totalData.supplementCost}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-end mt-10'>
                    <button
                        onClick={handlePrint}
                        className="bg-[#CB771C] text-white px-4 py-2 rounded hover:bg-[#b86e12] transition duration-200">
                        Print Report
                    </button>
                </div>
            </div>
        </>
    );
}

export default Common;