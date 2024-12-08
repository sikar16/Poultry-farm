import { useState } from 'react';
import UserTable from '../../feature/User/UserTable';
import HealthTable from '../../feature/Health/HealthTable';
import Report from '../../feature/Report/Report';
import DashboardAnalaysis from '../../feature/Dashboard/DashboardAnalaysis';
import { useAuth } from '../../context/AuthContext';
import Bottom from '../../component/Bottem';
// import DashboardAnalaysis from '../../feature/Dashboard/DashboardAnalaysis';


const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('Dashborad');

    const { setUserData } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token2");
        setUserData({ firstName: "", id: 0, role: "", token: null });
        navigator("/login");

        window.location.reload();
    };
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
                        <p className='text-xl text-black'>Efa Poultry</p>
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
                    {/* <span className="sr-only">Close menu</span> */}
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
                        <li className='flex'>
                            <button
                                onClick={() => handleContentChange('Health')}
                                className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'Health' ? 'bg-[#CB771C] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                            >
                                <p className='flex items-center  '>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16   " height="16   " viewBox="0 0 32 32">
                                        <g fill={`${activeContent === 'Health' ? "white" : "black"}`}>
                                            <path d="M12.155 8.69c.11.15.27.22.44.22c.11 0 .22-.03.32-.11l.01-.007c.08-.051.56-.367 1.25-.283c.3.04.57-.18.61-.47c.03-.3-.18-.57-.48-.61c-1.19-.14-2.02.48-2.05.51a.53.53 0 0 0-.1.75m7.26.22c-.11 0-.23-.04-.33-.11l-.004-.002a1.87 1.87 0 0 0-1.256-.288a.55.55 0 0 1-.13-1.09c1.2-.14 2.02.48 2.05.51c.24.18.28.53.1.77c-.11.14-.27.21-.43.21m-4.31 3.13l.52-1.67c.12-.36.63-.36.75 0l.51 1.67c.1.34-.15.69-.51.69h-.76c-.36 0-.62-.35-.51-.69m.89 1.67c-.54 0-1.04-.13-1.47-.35c-.14-.08-.3.09-.21.23c.36.55.97.91 1.68.91s1.32-.36 1.68-.91c.09-.14-.07-.3-.21-.23c-.43.22-.93.35-1.47.35m-3.73-3.37c.15-.6.7-1.05 1.35-1.05c.68 0 1.24.49 1.37 1.12c.02.14-.09.27-.23.27h-.078a1 1 0 0 0 .028-.23a.877.877 0 0 0-.88-.89a.892.892 0 0 0-.862 1.12h-.428a.28.28 0 0 1-.27-.34m7.47 0c-.15-.6-.7-1.05-1.35-1.05c-.68 0-1.24.49-1.37 1.12c-.02.14.09.27.23.27h.078a1 1 0 0 1-.028-.23c-.01-.49.39-.89.88-.89a.892.892 0 0 1 .862 1.12h.428c.18 0 .31-.17.27-.34" />
                                            <path d="M14.335 10.45a.512.512 0 0 0-.705-.47a.16.16 0 1 1-.24.206a.5.5 0 0 0-.015.504h.9q.06-.12.06-.24M18 9.971a.512.512 0 0 1 .625.719h-.9a.51.51 0 0 1 .031-.53a.16.16 0 1 0 .244-.189" />
                                            <path d="M26.985 31.013H5a1 1 0 0 1-1-1c0-1.8 0-5.529 1.007-8.1a12.08 12.08 0 0 1 5.048-6.138a4.3 4.3 0 0 1-.381-1.383l-.13-1.712a2.65 2.65 0 0 1-.964-2.034a2.6 2.6 0 0 1 .57-1.639l-.434-2.382a2.95 2.95 0 0 1 1.587-3.169l.42-.21q.308-.15.55-.393l1.013-1a2.865 2.865 0 0 1 3.25-.578c.305.096.633.09.933-.019a3.26 3.26 0 0 1 3.4.775l.819.82q.248.237.551.392l.42.21a2.94 2.94 0 0 1 1.559 3.177l-.428 2.347a2.627 2.627 0 0 1-.377 3.71l-.127 1.674a4.5 4.5 0 0 1-.456 1.562a11.97 11.97 0 0 1 4.882 5.992a20.7 20.7 0 0 1 1.27 8.095a1 1 0 0 1-.997 1.003m-10.735-2h9.731a17.3 17.3 0 0 0-1.132-6.373a9.76 9.76 0 0 0-4.974-5.492q.135.51.136 1.062v5.945a1.26 1.26 0 1 1-.982.009V18.21q-.002-.486-.135-.93a4 4 0 0 1-.577.161l-2.037 4.74l-.005.019a.3.3 0 0 0-.015.09h-.01zm-.41-10.443c.782 0 1.464-.427 1.825-1.06h-3.27q-.198 0-.391-.02a2.1 2.1 0 0 0 1.836 1.08m1.755-2.06c.445 0 .865-.104 1.236-.293l.486-.319a3 3 0 0 0 .322-.315c.363-.422.605-.969.668-1.595l.38-5.413a.41.41 0 0 0-.138-.326l-.214-.183a1.67 1.67 0 0 1-.56-1.256v-.86q-.002-.024-.007-.027l-.004-.003l-.01-.005c-.608-.151-1.927-.415-3.77-.415c-1.837 0-3.154.262-3.763.414a.04.04 0 0 0-.016.014a.04.04 0 0 0-.01.022v.87c0 .465-.196.935-.56 1.256l-.008.007l-.182.153a.44.44 0 0 0-.141.35l.38 5.402c.148 1.488 1.307 2.522 2.711 2.522zm-4.234.857a3.7 3.7 0 0 1-.624-.242c-.12.339-.187.704-.187 1.085v1.564a2.69 2.69 0 0 1 2.2 2.646v3.63c0 .361-.29.65-.65.65h-.93a.49.49 0 1 1 0-.98h.6v-3.3a1.71 1.71 0 0 0-3.42 0v3.3h.67a.49.49 0 0 1 0 .98h-1a.65.65 0 0 1-.65-.65v-3.63c0-1.323.952-2.415 2.2-2.646V18.21q0-.535.127-1.033a9.8 9.8 0 0 0-4.828 5.466a20 20 0 0 0-.864 6.37h9.455V25.88h-.01v-3.59a.4.4 0 0 0-.02-.11z" />
                                        </g>
                                    </svg>
                                </p>

                                <span className="flex-1 ms-3 ">Health</span>
                            </button>
                        </li>

                        <li className='flex'>
                            <button
                                onClick={() => handleContentChange('Report')}
                                className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'Report' ? 'bg-[#CB771C] text-white' : 'text-gray-900 hover:bg-gray-200 transition duration-200 ease-in-out'}`}
                            >
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048">
                                        <path fill={`${activeContent === 'Report' ? "white" : "black"}`} d="M1536 1536h-384V384h384zM1280 512v896h128V512zm-256 1024H640V640h384zM768 768v640h128V768zM128 0h1792v1920H128v-384H0v-128h128V640H0V512h128zm1664 1792V128H256v384h128v128H256v768h128v128H256v256z" />
                                    </svg>
                                </p>

                                <span className="flex-1 ms-3">Report</span>

                            </button>
                        </li>

                        <li className='flex'>
                            <button
                                onClick={() => handleContentChange('signout')}
                                className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'signout' ? 'bg-[#CB771C] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
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
                        {activeContent === 'Health' && "Health"}
                        {activeContent === 'User' && "User"}
                        {activeContent === 'Dashborad' && "Dashborad"}
                        {activeContent === 'Report' && "Report"}
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
                        <DashboardAnalaysis />
                    </div>
                )}

                {activeContent === 'User' && (
                    <div>
                        <UserTable />
                    </div>
                )}

                {activeContent === 'Health' && (
                    <div>
                        <HealthTable />
                    </div>
                )}


                {activeContent === 'Report' && (
                    <div>
                        <Report />
                    </div>
                )}


            </div>
        </div>
    );
};


export default Dashboard;