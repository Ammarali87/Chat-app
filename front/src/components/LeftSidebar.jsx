import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import assets, { imagesDummyData } from '../../public/assets';
import { ChatContext } from '../../context/ChatContext';

export default function LeftSidebar() {
  const { logout } = useContext(AuthContext);

  const {
    selectedUsers,
    setSelectedUsers,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  if (!selectedUsers || !selectedUsers.name) return null;

  return (
    <div className={`w-full relative overflow-y-auto bg-[#8185B2]/10 text-white ${selectedUsers ? 'max-md:hidden' : ''}`}>
      {/* Top User Info */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUsers?.profilePic || assets.avatar_icon}
          alt=""
          className="rounded-full aspect-[1/1] w-20"
        />
        <h1 className="text-xl font-medium mx-auto flex items-center px-10 gap-2">
          <p className="w-2 h-2 rounded-full bg-green-400"></p>
          {selectedUsers?.fullName || selectedUsers?.name}
        </h1>
        <p className="px-10 mx-auto">{selectedUsers?.bio}</p>
      </div>

      <hr className="my-4 border-[#ffffff50]" />

      {/* Media Section */}
      <div className="text-xs px-4">
        <p>Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-2 opacity-80">
          {imagesDummyData.map((image, index) => (
            <div
              key={index}
              onClick={() => window.open(image)}
              className="cursor-pointer rounded"
            >
              <img src={image} className="rounded" alt="" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={logout}
        className="absolute left-1/2 bottom-5 -translate-x-1/2 px-4 py-2 rounded text-sm text-white bg-gradient-to-r from-purple-400 to-violet-600 hover:opacity-80"
      >
        Logout
      </button>
    </div>
  );
}

