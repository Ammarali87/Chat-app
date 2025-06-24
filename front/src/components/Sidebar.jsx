import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useNavigate } from "react-router-dom";
import assets from '../../public/assets';

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AuthContext);
  const {
    users,
    getUsers,
    selectedUsers,
    setSelectedUsers,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers?.();
  }, [onlineUsers]);

  const filteredUsers = users?.filter(user =>
    user.fullName?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="h-full w-60 bg-white/10 backdrop-blur-lg text-sm text-white flex flex-col">
      {/* Top Bar */}
      <div className="p-3 flex items-center gap-2 border-b border-white/20">
        <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-full px-2 py-1">
          <img src={assets.search_icon} className="w-4" alt="search" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-xs w-full"
          />
        </div>
        <button
          onClick={() => {
            logout?.();
            navigate('/login');
          }}
          className="ml-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs hover:bg-green-600"
        >
          Logout
        </button>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-2">
        {!users ? (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No users found.</div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUsers(user);
                setUnseenMessages?.(prev => ({ ...prev, [user._id]: 0 }));
              }}
              className="relative flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
            >
              <img
                src={user.profilePic || assets.avatar_icon}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm leading-tight">{user.fullName}</h3>
                <p className="text-gray-400 text-xs truncate leading-tight">{user.bio}</p>
              </div>
              <div className="text-right">
                {onlineUsers?.includes(user._id) ? (
                  <span className="text-green-400 text-xs">Online</span>
                ) : (
                  <span className="text-red-500 text-xs">Offline</span>
                )}
              </div>
              {unseenMessages?.[user._id] > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 text-xs flex items-center justify-center bg-violet-500 text-white rounded-full">
                  {unseenMessages[user._id]}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}






