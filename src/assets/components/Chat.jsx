import React, { useEffect, useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../api/apiClient";
import { useChatSessions } from "../../hooks/useChatSessions";

const Chat = () => {
  const { chatSessions, activeSessionId, handleSessionSelect, handleNewChat, handleUpdateSession } =
    useChatSessions();

  const [currentSession, setCurrentSession] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If there's an active session, find it in the chatSessions
    if (activeSessionId) {
      const foundSession = chatSessions.find(s => s.id === activeSessionId);
      setCurrentSession(foundSession || null);
    }
  }, [activeSessionId, chatSessions]); // Add chatSessions to dependencies


  // scrolling to top effect
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [currentSession?.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!currentSession) {
      const newSession = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        messages: [],
      };
      handleNewChat(newSession);
      setCurrentSession(newSession);
    }

    setIsLoading(true);
    const newUserMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    try {
      const updatedSession = currentSession
        ? {
            ...currentSession,
            messages: [...currentSession.messages, newUserMessage],
          }
        : {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            messages: [newUserMessage],
          };

      // Get AI response
      const aiResponse = await sendMessage(updatedSession.messages, message);
      const newAssistantMessage = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      const updatedSessionWithAI = {
        ...updatedSession,
        messages: [...updatedSession.messages, newAssistantMessage],
      };
      
      handleUpdateSession(updatedSessionWithAI);
      setCurrentSession(updatedSessionWithAI);
      handleSessionSelect(updatedSessionWithAI.id);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col">
      {/* Welcome Message */}
      {(!currentSession || currentSession.messages.length === 0) && (
        <div className="mt-16 p-6 transition-opacity duration-300">
          <div className="flex items-center justify-center gap-4">
            <FaFireAlt size={48} className="text-white" />
            <div>
              <h1 className="text-4xl font-semibold">Hi, I am EchoGPT</h1>
              <p className="text-lg mt-2 text-slate-400">
                How can I help you today?
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div
        id="chat-container"
        className={`flex-1 overflow-y-auto p-6 space-y-4 transition-all duration-300 ${
          !currentSession || currentSession.messages.length === 0
            ? "opacity-0"
            : "opacity-100"
        }`}
        style={{
          maxHeight: `calc(100vh - ${
            !currentSession || currentSession.messages.length === 0
              ? "160px"
              : "85px"
          })`,
        }}
      >
        {currentSession?.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md p-4 rounded-xl ${
                msg.role === "user" ? "bg-blue-500" : "bg-slate-700"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-4 rounded-xl max-w-md animate-pulse">
              <p className="text-sm">...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Container */}
      <form onSubmit={handleSendMessage} className="px-10 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-700 text-white placeholder-gray-400 
            p-4 rounded-xl outline-none 
            border border-transparent focus:border-blue-500 
            transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute top-1/2 right-4 -translate-y-1/2 
            transform p-2 hover:bg-slate-600 
            rounded-full focus:outline-none disabled:opacity-50"
          >
            <IoMdSend size={24} className="text-gray-300 hover:text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
