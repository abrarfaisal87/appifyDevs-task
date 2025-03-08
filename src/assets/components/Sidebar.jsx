import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { CiChat2 } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSideBar, onNewChat }) => {
  const navigate = useNavigate();

  return (
    <nav
      className={`bg-slate-600 h-screen border-r border-r-blue-950 
        relative transition-all duration-300 ease-in-out
        ${isOpen ? "w-56" : "w-20"}
        ${!isOpen && "overflow-hidden"}`}
    >
      <div className="flex flex-col p-5">
        <header
          className={`flex flex-row items-center ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && <h1 className="text-2xl text-white">EchoGPT</h1>}
          {isOpen ? (
            <FaFireAlt size={24} color="white" />
          ) : (
            <FaFireAlt size={32} color="white" />
          )}
        </header>

        {/* New Chat Button */}
        <button
          onClick={() => {
            onNewChat(); 
            navigate("/chat"); 
          }}
          className={`cursor-pointer mt-4
            bg-white text-black flex items-center outline-0
            justify-center gap-2 py-2 rounded
            hover:text-white hover:bg-slate-900 transition-colors ${
              isOpen ? "w-full px-4" : "w-12"
            }`}
        >
          <CiChat2 size={20} />
          {isOpen && "New chat"}
        </button>

        {/* History Button */}
        <div
          onClick={() => navigate("/history")}
          className={`bg-white outline-0 mt-6 py-2 rounded hover:bg-slate-900 
          hover:text-white cursor-pointer flex items-center justify-center gap-2 ${
            isOpen ? "w-full" : "w-12"
          }`}
        >
          <FaHistory size={20} />
          {isOpen && <p className="text-xl">History</p>}
        </div>

        {/* Sidebar Toggle Button */}
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={toggleSideBar}
            className={`hover:text-slate-600 text-white transition-colors duration-300
            ${!isOpen && "translate-x-[-50%]"}`}
          >
            {isOpen ? (
              <GoSidebarCollapse size={28} />
            ) : (
              <GoSidebarExpand size={28} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
