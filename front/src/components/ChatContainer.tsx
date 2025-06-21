import { useContext, useEffect, useRef, useState } from "react";
import assets from "../../public/assets";
import { formatMassageTime } from "../lib/utils";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import toast from "react-hot-toast";

export default function ChatContainer() {
  const [input, setInput] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, selectedUsers, sendMessage, setSelectedUsers } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return selectedUsers ? (
    <div className="h-full relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img
          src={selectedUsers.profilePic || assets.profile_martin}
          alt="profile-img"
          className="rounded-full w-7 h-7 object-cover"
        />
        <p className="flex items-center gap-2 text-white flex-1 text-base">
          {selectedUsers.fullName}
          {onlineUsers.includes(selectedUsers._id) && (
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          )}
        </p>
        <img
          src={assets.arrow_icon}
          onClick={() => setSelectedUsers(null)}
          alt="Back"
          className="md:hidden w-5 h-5 cursor-pointer"
        />
        <button
          onClick={() => setSelectedUsers(null)}
          className="hidden md:inline-block px-2 py-1 rounded-xl bg-green-500 text-white text-xs"
        >
          X
        </button>
      </div>

      {/* Chat Area */}
      <div className="overflow-y-auto p-4 pb-6 flex flex-col h-[calc(100%-120px)]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.senderId !== authUser._id ? "justify-start flex-row-reverse" : "justify-end"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt="message-img"
                className="rounded-xl border border-gray-700 mb-8 max-w-[200px] object-contain"
              />
            ) : (
              <p
                className={`p-2 text-sm font-light rounded-lg mb-8 bg-violet-500/30 text-white max-w-[180px] ${
                  msg.senderId !== authUser._id ? "rounded-br-none" : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-xs text-center">
              <img
                className="rounded-full w-6 h-6 object-cover"
                src={
                  msg.senderId !== authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUsers.profilePic || assets.avatar_icon
                }
                alt="avatar"
              />
              <p className="text-gray-400 text-[10px]">{formatMassageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      {/* Bottom Input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3 bg-black/30">
        <div className="flex-1 flex items-center bg-gray-700/30 rounded-full px-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            placeholder="Send a message"
            className="outline-none border-none bg-transparent flex-1 p-2 text-sm text-white placeholder-gray-400"
          />
        </div>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleSendImage}
          // style={{ display: "none" }}
        />
        <label htmlFor="image">
          <img
            src={assets.gallery_icon}
            alt="Upload"
            className="w-5 h-5 cursor-pointer"
          /> File 
        </label>
        <img
          src={assets.send_button}
          onClick={handleSendMessage}
          alt="Send"
          className="w-6 h-6 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-gray-500 gap-2 max-md:hidden bg-white/10 rounded-xl p-6">
      <img src={assets.logo_icon} alt="Logo" className="w-14" />
      <p className="text-base font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
}
