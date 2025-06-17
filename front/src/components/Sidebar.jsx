import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import assets, { userDummyData } from '../../public/assets';

export default function Sidebar({ setSelectedUser }) {
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  
  // Filter users based on search
  const filteredUsers = userDummyData.filter(user => 
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full bg-white/10 backdrop-blur-lg overflow-hidden">
      <div className="p-4 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-full px-2">
          <img src={assets.search_icon} className="w-4" alt="search" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-sm p-2 w-full"
          />
        </div>
      </div>

      <div className="overflow-y-auto p-2 h-[calc(100%-80px)] scrollbar-hide">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-all"
          >
            <img
              src={user.profilePic || assets.avatar_icon}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-white font-medium">{user.fullName}</h3>
              <p className="text-gray-300 text-sm truncate">{user.bio}</p>
            </div>
            {onlineUsers.includes(user._id) && (
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}