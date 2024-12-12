import { useState } from 'react';
import UserTable from '../../feature/User/UserTable';
import HealthTable from '../../feature/Health/HealthTable';
import Report from '../../feature/Report/Report';
import DashboardAnalaysis from '../../feature/Dashboard/DashboardAnalaysis';
import ListNewAdmin from './ListNewAdmin';
import DashboardAnalysis from '../../feature/Dashboard/DashboardAnalaysis';
import Bottom from '../../component/Bottem';
import { useAuth } from '../../context/AuthContext';


const DashboardSA = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('Dashborad');
    const { isLoggedIn } = useAuth()

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleContentChange = (content) => {
        setActiveContent(content);
    };



    return (
        <div className="flex">
            <div
                className={`fixed top-0 left-0 z-40 w-64 h-screen p-3 overflow-y-auto transition-transform border-r-2  ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white `}
                aria-labelledby="drawer-navigation-label" >
                <div id="drawer-navigation-label" className="text-base font-semibold flex align-middle items-center text-center gap-4 text-gray-500 ">
                    <div className="bg-[#CB771C] w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                        🐔
                    </div>
                    <div>
                        <p className='text-xl text-black'> doroSAAS</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={toggleDrawer}
                    aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center "
                >
                    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
                <hr className='text-black shadow-lg my-1' />

                <div className=" overflow-y-auto mt-7">
                    <ul className="space-y-2">

                        <li className='flex '>
                            <button
                                onClick={() => handleContentChange('User')}
                                className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'User' ? 'bg-[#CB771C] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                            >
                                <p className='flex items-center  '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 32 32">
                                        <path fill={`${activeContent === 'User' ? "white" : "black"}`} d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z">
                                        </path></svg>
                                </p>
                                <span className="flex-1 ms-3 ">User</span>
                            </button>
                        </li>
                        <li className='flex '>
                            <button
                                className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'User' ? 'bg-[#CB771C] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                            >
                                <Bottom />
                            </button>
                        </li>

                    </ul>
                </div>
            </div>

            <div className={`flex-1 p-4 transition-all duration-300 w-screen h-screen max-h-screen  ${isOpen ? 'ml-64 ' : 'ml-0'}`}>
                <div className="flex justify-between text-right mb-4">
                    <h1 className="text-xl font-semibold">
                        {activeContent === 'User' && "User"}
                        {activeContent === 'Dashborad' && "Dashborad"}
                    </h1>
                    <button
                        className="text-white font-medium rounded-lg "
                        type="button"
                        onClick={toggleDrawer}
                        aria-controls="drawer-navigation"
                    >
                        {isOpen ? <><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="-5 -7 24 24"><path fill="gray" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"></path></svg></> : <><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="-5 -7 24 24"><path fill="black" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"></path></svg></>}
                    </button>
                </div>

                <hr className='text-black shadow-lg ' />

                {activeContent === 'Dashborad' && (
                    <div>
                    </div>
                )}

                {activeContent === 'User' && (
                    <div>
                        <ListNewAdmin />
                    </div>
                )}




            </div>
        </div>
    );
};


export default DashboardSA;