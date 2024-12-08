import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Bottom = () => {
  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({ firstName: "", id: 0, role: "", token: null });
    navigate("/login");
    // Reload the page
    window.location.reload();
  };

  return (

    <p
      onClick={handleLogout}
      className="flex rounded-lg cursor-pointer transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        className="mr-2"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75"
          clipRule="evenodd"
        ></path>
        <path
          fill="currentColor"
          d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"
        ></path>
      </svg>
      <span className="text-sm">Logout</span>
    </p>

  );
};

export default Bottom;