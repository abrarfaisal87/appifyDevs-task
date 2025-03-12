import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useChatSessions } from "../../hooks/useChatSessions";

const History = () => {
  const { chatSessions, handleSessionSelect, handleDeleteChat } = useChatSessions();

  return (
    <div className="p-6 bg-slate-900 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-white">Chat History</h2>
      </div>
      <div className="space-y-4">
        {chatSessions.map((session) => (
          <div
            key={session.id}
            className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700"
            onClick={() => handleSessionSelect(session.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">Chat Session</p>
                <p className="text-gray-400 text-sm">
                  {new Date(session.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(session.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
