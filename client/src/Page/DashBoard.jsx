import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";
import { useAuth } from "../contextApi/AuthContext";

const Dashboard = () => {
  const {logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
        window.location.reload();
      };
  return (
    <div className="h-auto sm:h-screen pb-7"
    style={{
      backgroundImage: 'url(https://asset.cloudinary.com/dj2haoymp/5eab99134a3567daf6864fbed35d7a62)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    >
       <div className="absolute inset-0 bg-black opacity-35  z-0"></div>
       <div className="w-full bg-black bg-opacity-50">
      <div className="container mx-auto px-10 flex justify-between items-center text-white p-4 relative z-30">
        <h1 className="text-xl font-bold">Kanban Board</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-700 rounded-full">
            <FaBell />
          </button>

          <div className="relative group">
            <button className="p-2 bg-gray-700 rounded-full">
              <FaUser />
            </button>
            <div className="absolute right-0  w-48 bg-white shadow-md text-black px-4 py-4 hidden group-hover:block rounded-lg">
              <p>
                <Link to="#" className="text-blue-500">
                  Change Password
                </Link>
              </p>
              <button
                className="cursor-pointer border mt-3 px-5 py-2 rounded-full w-full"
                onClick={handleLogout} 
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <KanbanBoard />
    </div>
  );
};

export default Dashboard;
