import LeftSidebar from "../components/LeftSidebar"
import Sidebar from "../components/Sidebar"
import ChatContainer from "../components/ChatContainer"
import { useState } from "react";

export default function HomePage() {

  const [selectedUser , setSelectedUser] = useState(false);
  const [selectedChat , setSelectedChat] = useState(false);
    // use {} with classname if whate temple  not "" 
  return (
    <div className=" flex w-full border h-screen">

<div
  className={`relative w-[50%] mt-2 p-3 mx-auto backdrop-blur-xl border-2 overflow-hidden h-full border-gray-600 grid grid-cols-1 rounded-2xl 
    ${selectedUser 
      ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
      : 'md:grid-cols-2'}`}
>

      <Sidebar/>
      <ChatContainer/>
      <LeftSidebar/>
      </div>
      {/* <Footer/> */}
      </div>
  )
}
