import { FaBirthdayCake, FaTruck, FaEgg, FaExclamationCircle } from 'react-icons/fa';

const Dashboard1 = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Analysis</h1>
                    <button
                        onClick={handlePrint}
                        className="bg-[#CB771C] text-white py-2 px-4 rounded"
                    >
                        Export
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#faebdb] p-4 text-center rounded">
                        <FaBirthdayCake className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xl font-semibold">29 Day</div>
                        <div>Ages</div>
                    </div>
                    <div className="bg-[#faebdb] p-4 text-center rounded">
                        <FaTruck className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xl font-semibold">10 kg/day</div>
                        <div>Feed delivery</div>
                    </div>
                    <div className="bg-[#faebdb] p-4 text-center rounded">
                        <FaEgg className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xl font-semibold">2000</div>
                        <div>Egg produced</div>
                    </div>
                    <div className="bg-[#faebdb] p-4 text-center rounded">
                        <FaExclamationCircle className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xl font-semibold">120000</div>
                        <div>Chicks</div>
                    </div>
                    <div className="bg-[#faebdb] p-4 text-center rounded">
                        <FaExclamationCircle className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xl font-semibold">200</div>
                        <div>Chick mortality</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard1;