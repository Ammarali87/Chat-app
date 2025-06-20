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
    // selectedUsers, // ✅ تأكد إن دي array أو object حسب نوعها
    setSelectedUsers,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const [search, setSearch] = useState('');

  // Load users once on mount or when onlineUsers change
  useEffect(() => {
    if (getUsers) getUsers();
  }, [onlineUsers]);


  // Filter users by search input
  const filteredUsers = users?.filter(user =>
    user.fullName?.toLowerCase().includes(search.toLowerCase())
  ) || [];
    //  add ? to fullName ,
    //  tolowerCase() input/search it's state not need to .value



    
  return (
    <div className="h-full bg-white/10 backdrop-blur-lg overflow-hidden">
      {/* Search & Logout */}
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
        <button
          onClick={() => {
            logout?.();
            navigate('/login');
          }}
          className="bg-green-500 text-white text-xs px-3 py-1 rounded-full hover:bg-green-600"
        >
          Logout
        </button>
      </div>

      {/* Users List            why ! with users               */}
      <div className="overflow-y-auto p-2 h-[calc(100%-80px)] scrollbar-hide">
        {!users ? (     
          <div className="text-center text-gray-400 py-8">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No users found.</div>
        ) : (
          filteredUsers.map(user => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUsers?.(user);
                setUnseenMessages?.(prev => ({
                  ...prev,
                  [user._id]: 0,
                }));
              }}
              className="relative w-50  flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-all"
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

              <div className="flex flex-col leading-5">
                {onlineUsers?.includes(user._id) ? (
                  <span className="text-green-400 text-xs">Online</span>
                ) : (
                  <span className="text-gray-400 text-xs">Offline</span>
                )}
              </div>

              {unseenMessages?.[user._id] > 0 && (
                <p className="absolute top-4 right-4 
                flex items-center justify-center w-5
                 h-5 text-xs rounded-full bg-violet-500 text-white">
                  {unseenMessages[user._id]}
                </p> 
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}















// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { ChatContext } from '../../context/ChatContext';
// import { useNavigate } from "react-router-dom";
// import assets from '../../public/assets';

// export default function Sidebar() {
//   const { authUser, logout, onlineUsers } = useContext(AuthContext);
//   const {
//     users,
//     getUsers,
//     selectedUsers,
//     setSelectedUsers,
//     unseenMessages,
//     setUnseenMessages,
//   } = useContext(ChatContext);

//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   // Load users when onlineUsers change
//   useEffect(() => {
//     getUsers();
//   }, [onlineUsers]);

//   // Filtered users based on search input
//   const filteredUsers = users
//     ? (search
//         ? users.filter(user =>
//             user.fullName.toLowerCase().includes(search.toLowerCase())
//           )
//         : users)
//     : [];

//   return (
//     <div className="h-full bg-white/10 backdrop-blur-lg overflow-hidden">
//       {/* Search bar */}
//       <div className="p-4 flex items-center gap-2">
//         <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-full px-2">
//           <img src={assets.search_icon} className="w-4" alt="search" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="bg-transparent border-none outline-none text-white text-sm p-2 w-full"
//           />
//         </div>
//         <button
//           onClick={() => {
//             logout();
//             navigate('/login');
//           }}
//           className="bg-green-500 text-white text-xs px-3 py-1 rounded-full hover:bg-green-600"
//         >
//           Logout
//         </button>
//       </div>

//       {/* User list */}
//       <div className="overflow-y-auto p-2 h-[calc(100%-80px)] scrollbar-hide">
//         {!users ? (
//           <div className="text-center text-gray-400 py-8">Loading users...</div>
//         ) : filteredUsers.length === 0 ? (
//           <div className="text-center text-gray-400 py-8">No users found.</div>
//         ) : (
//           filteredUsers.map((user) => (
//             <div
//               key={user._id}
//               onClick={() => {
//                 setSelectedUsers(user);
//                 setUnseenMessages((prev) => ({
//                   ...prev,
//                   [user._id]: 0,
//                 }));
//               }}
//               className="relative flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-all"
//             >
//               <img
//                 src={user.profilePic || assets.avatar_icon}
//                 alt={user.fullName}
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div className="flex-1">
//                 <h3 className="text-white font-medium">{user.fullName}</h3>
//                 <p className="text-gray-300 text-sm truncate">{user.bio}</p>
//               </div>

//               <div className="flex flex-col leading-5">
//                 {onlineUsers.includes(user._id) ? (
//                   <span className="text-green-400 text-xs">Online</span>
//                 ) : (
//                   <span className="text-gray-400 text-xs">Offline</span>
//                 )}
//               </div>

//               {unseenMessages[user._id] > 0 && (
//                 <p className="absolute top-4 right-4 flex items-center justify-center w-5 h-5 text-xs rounded-full bg-violet-500 text-white">
//                   {unseenMessages[user._id]}
//                 </p>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }















// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import assets from '../../public/assets';
// import { ChatContext } from '../../context/ChatContext';
// import {useNavigate} from "react-router-dom"

// export default function Sidebar() {
//   //  can add two param to onClick 
//   // onClick={() => setSelectedUser(user); setUnseenMessages((prev))}
  
//   const { authUser,logout,onlineUsers } = useContext(AuthContext);
//   const [search, setSearch] = useState("");

//   const { users,
//     getUsers , 
//     selectedUsers,
//     setSelectedUsers,
//     unseenMessages,
//     setUnseenMessages,
//     } = useContext(ChatContext)

//      const navigate = useNavigate()
//   // Filter users based on search
//   // const filteredUsers =  search
//   //  ? users.filter(user => 
//   //   user.fullName.toLowerCase().includes(search.toLowerCase())) 
//   // : users  

// const filteredUsers = users
//   ? (search
//       ? users.filter(user => user.fullName.toLowerCase().includes(search.toLowerCase()))
//       : users)
//   : [];
  
//   useEffect(()=>{
//     getUsers();
//   }
//   ,[onlineUsers])
//   return (
//     <div className="h-full bg-white/10 backdrop-blur-lg overflow-hidden">
//       <div className="p-4 flex items-center gap-2">
//         <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-full px-2">
//           <img src={assets.search_icon} className="w-4" alt="search" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="bg-transparent border-none outline-none text-white text-sm p-2 w-full"
//           />
//           <button className='bg-green-400 text-xs rounded-full text-gray-200'
//            onClick={logout}>logout</button>
//         </div>  
//       </div>

//         {/* {filteredUsers.map((user) => (
//           <div
//             key={user._id}
//             onClick={() => {
//               setSelectedUser(user);
//               setUnseenMessages((prev) => ({
//                 ...prev,
//                 [user._id]: 0,
//               }));
//             }}
//             className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-all"
//           >
//             <img
//               src={user.profilePic || assets.avatar_icon}
//               alt={user.fullName}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div className="flex-1">
//               <h3 className="text-white font-medium">{user.fullName}</h3>
//               <p className="text-gray-300 text-sm truncate">{user.bio}</p>
//             </div>

//             <div className=' flex flex-col leading-5'>
//             {onlineUsers.includes(user._id)  
//             ? <span className='text-green-400 text-xs'>Online</span>
//             : <span className='text-green-400 text-xs'>Offline</span>
//           }
//           </div>
//           {unseenMessages[user._id] > 0 && <p className="absolute top-4 items-center flex justify-center w-5 h-5 text-xs rounded-full bg-violet-500/50 ">
//             {unseenMessages[user._id]}</p> }
//           </div>
//         ))} */}

// <div className="overflow-y-auto p-2 h-[calc(100%-80px)] scrollbar-hide">
//   {!users ? (     // Very Important 
//     <div className="text-center text-gray-400 py-8">Loading users...</div>
//   ) : filteredUsers.length === 0 ? (
//     <div className="text-center text-gray-400 py-8">No users found.</div>
//   ) : (
//     filteredUsers.map((user) => (
//       <div
//         key={user._id}
//         onClick={() => {
//           setSelectedUsers(user);
//           setUnseenMessages((prev) => ({
//             ...prev,
//             [user._id]: 0,
//           }));
//         }}
//         className="relative flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-all"
//       >
//         <img
//           src={user.profilePic || assets.avatar_icon}
//           alt={user.fullName}
//           className="w-12 h-12 rounded-full object-cover"
//         />
//         <div className="flex-1">
//           <h3 className="text-white font-medium">{user.fullName}</h3>
//           <p className="text-gray-300 text-sm truncate">{user.bio}</p>
//         </div>
//         <div className='flex flex-col leading-5'>
//           {onlineUsers.includes(user._id)  
//             ? <span className='text-green-400 text-xs'>Online</span>
//             : <span className='text-green-400 text-xs'>Offline</span>
//           }
//         </div>
//         {unseenMessages[user._id] > 0 && (
//           <p className="absolute top-4 right-4 flex items-center justify-center w-5 h-5 text-xs rounded-full bg-violet-500/50 ">
//             {unseenMessages[user._id]}
//           </p>
//         )}
//       </div>
//     ))
//   )}
// </div>

//       {/* </div> */}
//     </div>
//   );
// }