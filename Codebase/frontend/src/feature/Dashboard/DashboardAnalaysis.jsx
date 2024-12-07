import { FaBirthdayCake, FaTruck, FaEgg, FaArrowUp, FaExclamationCircle, FaMoneyBillWave } from 'react-icons/fa';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import { vaccines, products } from "../../demo/demo"

const dataset = [
    { month: 'January', feed: 280 },
    { month: 'February', feed: 300 },
    { month: 'March', feed: 250 },
    { month: 'April', feed: 320 },
    { month: 'May', feed: 290 },
    { month: 'June', feed: 310 },
    { month: 'July', feed: 340 },
    { month: 'August', feed: 330 },
    { month: 'September', feed: 300 },
    { month: 'October', feed: 320 },
    { month: 'November', feed: 310 },
    { month: 'December', feed: 350 },
];

const valueFormatter = (value) => `${value} kg`;


const chartSetting = {
    yAxis: [
        {
            label: 'Feed Consumption (kg)',
        },
    ],
    series: [{ dataKey: 'feed', label: 'Monthly Feed Consumption', valueFormatter, color: '#e8b57f', }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};

const DashboardAnalysis = () => {

    return (
        <>
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Today's Analysis</h1>
                    <button className="bg-[#CB771C] text-white py-2 px-4 rounded">Export</button>
                </div>
                <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6 ">
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
                        <FaArrowUp className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xl font-semibold">1800</div>
                        <div>Egg sold</div>
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
                    <div className="bg-[#faebdb] p-4 text-center rounded">
                        <FaMoneyBillWave className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xl font-semibold">82000</div>
                        <div>Daily Costs</div>
                    </div>
                </div>
            </div>
            <div className='flex gap-2  py-7 w-full '>
                <div className='w-[60%]'>
                    <h1 className="text-2xl font-medium mb-6">Monthly Feed consume</h1>

                    <BarChart
                        dataset={dataset}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        {...chartSetting}
                    />
                </div>

                <div className="  bg-white rounded-lg shadow-md   w-[50%]">
                    <h1 className="text-2xl font-medium mb-6">Total Products</h1>

                    <table className=" bg-white border border-gray-300 w-[100%]">
                        <thead>
                            <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                                <th className="py-3 px-4 text-left">#</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {products.map(product => (
                                <tr key={product.id} className="border-b border-gray-300 hover:bg-gray-100">
                                    <td className="py-3 px-4">{String(product.id).padStart(2, '0')}</td>
                                    <td className="py-3 px-4">{product.name}</td>
                                    <td className="py-3 px-4">{product.amount}</td>
                                    <td className="py-3 px-4">
                                        <span className="text-orange-500 font-semibold">{product.price}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>



        </>
    );
};

export default DashboardAnalysis;