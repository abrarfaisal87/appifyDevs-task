import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [isSideBarOn, setIsSideBarOn] = useState(true);
  const [chatSessions, setChatSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const navigate = useNavigate();

  // Load sessions from localStorage
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem("chatSessions")) || [];
    setChatSessions(savedSessions);
  }, []); 

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
  }, [chatSessions]);

  const handleNewChat = () => {
    const newSession = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      messages: []
    };
    setChatSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    navigate("/chat");
  };

  const handleSessionSelect = (sessionId) => {
    setActiveSessionId(sessionId);
    navigate('/chat');
  };

  const handleDeleteChat = (sessionId) => {
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    if (sessionId === activeSessionId) {
      setActiveSessionId(null);
      navigate('/history');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSideBarOn}
        toggleSideBar={() => setIsSideBarOn(!isSideBarOn)}
        onNewChat={handleNewChat} // Added this prop
      />
      <div className={`flex-1 transition-all duration-300 =`}
      >
        <Outlet context={{
          chatSessions,
          activeSessionId,
          handleSessionSelect,
          handleDeleteChat,
          handleNewChat
        }} />
      </div>
    </div>
  );
};

export default MainLayout;