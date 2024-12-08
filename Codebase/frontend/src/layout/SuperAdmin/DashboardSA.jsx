import { useState } from 'react';
import UserTable from '../../feature/User/UserTable';
import HealthTable from '../../feature/Health/HealthTable';
import Report from '../../feature/Report/Report';
import DashboardAnalaysis from '../../feature/Dashboard/DashboardAnalaysis';
import ListNewAdmin from './ListNewAdmin';


const DashboardSA = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('Dashborad');


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
                    <div className="flex items-center justify-center bg-[#CB771C] rounded-full w-12 h-12">
                        <div className="flex  items-center">
                            <span className="text-xl font-bold text-white"></span>
                            <span className="text-xl font-bold text-white"></span>
                        </div>
                    </div>
                    <div>
                        <p className='text-xl text-black'> Poultry SAS</p>
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
                                onClick={() => handleContentChange('Dashborad')}
                                className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'Dashborad' ? 'bg-[#CB771C] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                            >
                                <p className='flex items-center  '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                        <path fill={`${activeContent === 'Dashborad' ? "white" : "black"}`} d="M8 4.5A1.25 1.25 0 1 0 8 2a1.25 1.25 0 0 0 0 2.5"></path>
                                        <path fill={`${activeContent === 'Dashborad' ? "white" : "black"}`} d="M8 4.5c.597 0 1.13.382 1.32.949l.087.26a.22.22 0 0 1-.21.291h-2.39a.222.222 0 0 1-.21-.291l.087-.26a1.39 1.39 0 0 1 1.32-.949zm-3 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z">
                                        </path><path fill={`${activeContent === 'Dashborad' ? "white" : "black"}`} fillRule="evenodd" d="M2.33 1.64c-.327.642-.327 1.48-.327 3.16v6.4c0 1.68 0 2.52.327 3.16a3.02 3.02 0 0 0 1.31 1.31c.642.327 1.48.327 3.16.327h2.4c1.68 0 2.52 0 3.16-.327a3 3 0 0 0 1.31-1.31c.327-.642.327-1.48.327-3.16V4.8c0-1.68 0-2.52-.327-3.16A3 3 0 0 0 12.36.33C11.718.003 10.88.003 9.2.003H6.8c-1.68 0-2.52 0-3.16.327a3.02 3.02 0 0 0-1.31 1.31m6.87-.638H6.8c-.857 0-1.44 0-1.89.038c-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819c-.037.45-.038 1.03-.038 1.89v6.4c0 .857.001 1.44.038 1.89c.036.438.101.663.18.819c.192.376.498.682.874.874c.156.08.381.145.819.18c.45.036 1.03.037 1.89.037h2.4c.857 0 1.44 0 1.89-.037c.438-.036.663-.101.819-.18c.376-.192.682-.498.874-.874c.08-.156.145-.381.18-.82c.037-.45.038-1.03.038-1.89v-6.4c0-.856-.001-1.44-.038-1.89c-.036-.437-.101-.662-.18-.818a2 2 0 0 0-.874-.874c-.156-.08-.381-.145-.819-.18c-.45-.037-1.03-.038-1.89-.038" clipRule="evenodd">
                                        </path>
                                    </svg>
                                </p>
                                <span className="flex-1 ms-3 ">Dashborad</span>
                            </button>
                        </li>
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
                        <p>Dashboard analaysis</p>
                    </div>
                )}

                {activeContent === 'User' && (
                    <div>
                        <ListNewAdmin />
                    </div>
                )}


                {activeContent === 'signout' && (
                    <div>
                        <p>Are you sure to signout</p>
                    </div>
                )}

            </div>
        </div>
    );
};


export default DashboardSA;