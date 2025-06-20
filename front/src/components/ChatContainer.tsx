import { useContext, useEffect, useRef, useState } from "react";
import assets from "../../public/assets";
import { formatMassageTime } from "../lib/utils";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import toast from "react-hot-toast";

// interface Message {
//   _id: string;
//   senderId: string;
//   text?: string;
//   image?: string;
//   createdAt: string;
// }

// interface ChatContainerProps {
//   selectedUser: any; // Replace with proper user type
//   setSelectedUser: (user: any) => void;
// }

export default function ChatContainer() {
 
 
  const [message, setMessage] = useState(""); // if text ("")
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input , setInput ] = useState<string>(""); // ("")

  // const {messages ,getMessages, selectedUser,sendMessage, setSelectedUser} =  useContext(AuthContext);
  // const {authUser , onlineUsers} =  useContext(ChatContext);

  const { messages, getMessages, selectedUsers, sendMessage, setSelectedUsers } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  
  useEffect(()=>{
     if (selectedUsers) {
       setMessage(selectedUsers._id)
    }
  },[selectedUsers])


  useEffect(() => {
    if (scrollRef.current && messages) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e:any) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({text: input.trim()})  // create text :input.trim()
    setInput("");
  };

   const handelSendImage = async(e)=>{
     const file = e.target.files[0];
     if(!file || !file.type.startsWith("image/")){
       toast.error("Error Send message")
       return;
      }
      const reader = new FileReader()

      reader.onloadend = async () => {
      await sendMessage({image:reader.result})
       e.target.value = ""
    }
      reader.readAsDataURL(file)
    } 
 

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUsers ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* ------ Header ------ */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          // src={assets.profile_martin}
          src={ selectedUsers.profilePic || assets.profile_martin}
          alt="profile-img"
          className="rounded-full w-8"
        />
        <p className="flex items-center gap-2 text-white flex-1 text-lg">
         {selectedUsers.fullName}
         {onlineUsers.includes(selectedUsers._id) && (
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          )}
        </p>

        <img
          src={assets.arrow_icon}
          onClick={() => setSelectedUsers(null)}
          alt=""
          className="md:hidden max-w-7"
        />
        <img
          src={assets.help_icon}
          onClick={() => setSelectedUsers(null)}
          alt=""
          className="max-md:hidden max-w-5"
        />
      </div>

      {/* ------ Chat Area ------ */}
      <div className="overflow-y-scroll p-3 pb-6 flex flex-col h-[calc(100%-120px)]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.senderId !== authUser._id
                ? "justify-start flex-row-reverse"
                : "justify-end"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="rounded-xl border border-gray-700 overflow-hidden mb-8 max-w-[230px]"
              />
            ) : (
              <p
                className={`p-2 md:text-sm font-light rounded-lg mb-8 bg-violet-500/30 text-white max-w-[200px] ${
                  msg.senderId !== authUser._id
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}

            <div className="text-xs text-center">
              <img
                className="rounded-full w-7"
                src={
                  msg.senderId !== authUser._id
                    ? authUser?.profilePic 
                      || assets.avatar_icon 
                    : selectedUsers.profilePic || assets.avatar_icon
                }
                alt=""
              />
              <p className="text-gray-600">{formatMassageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      {/* ------ Bottom Input ------ */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 rounded-full px-3">
          <input
            type="text"
            onChange={(e)=> setInput(e.target.value)}
              onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(e);
            }}
            placeholder="Send a message"
            className="outline-none rounded-lg border-none flex-1 p-3 text-sm text-white placeholder-gray-400"
          />
          <input type="file"
          onChange={handelSendImage}
          id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              onClick={handleSendMessage}
              alt=""
              className="w-3 mr-2 cursor-pointer"
            />
          </label>
        </div>

        <img src={assets.send_button} onClick={handleSendMessage} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-gray-500 gap-2 max-md:hidden bg-white/10 rounded-xl p-2">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
}














// import { useEffect, useRef } from "react"
// import assets, { userDummyData } from "../../public/assets"
//  // look to import images and the file 
// import {formatMassageTime} from "../lib/utils"

// export default function 
// ChatContainer({setSelectedUsers,selectedUsers}) {
 
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   useEffect(()=>{  
//     if(scrollRef.current){
//       scrollRef.current.scrollIntoView({behavior:"smooth"})
//     }
//   },[])
 
//   return (  selectedUsers ?
//  ( <div className="h-full overflow-scroll relative backdrop-blur-lg ">
//    {/* {     ------  header ------ } */}
//     <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
//        <img src={assets.profile_martin} alt="porfile-img" className="rounded-full w-8" />
//        <p className=" flex items-center gap-2 text-white flex-1  text-lg  ">
//         Martin Johnson 
//        <span className=" w-2 h-2 rounded-full bg-green-400"></span>
//        </p>

//        <img src={assets.arrow_icon} 
//        onClick={()=> setSelectedUser(null)} alt=""
//         className=" md:hidden max-w-7 " />
//           <img src={assets.help_icon} 
//        onClick={()=> setSelectedUser(null)} alt=""
//         className=" max-md:hidden max-w-5 " />
//     </div>   
//    {/* {     ------  Chat area ------ } */}
          
//       <div className=" overflow-y-scroll p3 pb-6 
//       flex flex-col h-[calc(100%_-_120%)] ">
//  {/* h-[calc(100vh_-_80px)] */}
//       {userDummyData.map((msg,index)=>(
//         <div key={index} 
//         className={`flex items-end gap-2 justify-end ${msg.senderId !==
//            "680f50aaf10f3cd28382ecf2" && "flex-row-reverse"}`}>
//             {msg.image ? (
//               <img src={msg.image} alt="" className="rounded-xl border border-gray-700 overflow-gidden mb-8 max-w-[230px ]" />
//             ):
//             ( <p  className={`p-2 md:text-sm font-light rounded-lg mb-8 
//                 bg-violet-500/30 text-white max-w-[200px] ${msg.senderId
//                    !== "680f50aaf10f3cd28382ecf2" ?"rounded-br-none": "rounded-bl-none"}`} >
//                     {msg.text}
//                     </p>
//                     )}
//                     <div className=" text-xs text-center  ">
//                       <img className="rounded-full w-7" src={msg.senderId !== 
//     "680f50aaf10f3cd28382ecf2"? assets.avatar_icon:assets.profile_martin} alt="" />
//       <p className="text-gray-600">{formatMassageTime(msg.createdAt)}</p>
//                     </div>  
//         </div>
//       ))}
//        <div ref={scrollRef} className=""></div>

//       </div>

//    {/* {     ------  bottom area ------ } */}
        
//            <div className="absolute bottom-0 left-0 right-0 flex items-ceter gap-3 p-3">
//             <div className="flex-1 flex items-center bg-gray-100/12 rounded-full  px-3">
//            <input  type="text" placeholder="send a message" className="
//            outline-none rounded-lg border-none flex-1 p-3 text-sm text-white placeholder-gray-400" />
//            <input type="file" id="image" accept="image/png , image/jpeg"  hidden />
//             <label htmlFor="image">
//               <img src={assets.gallery_icon} alt="" className="w-3 mr-2 cursor-pointer" />
//             </label>
//             </div>

//           <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
   
//            </div>
//       </div> )
//       :
//      (  <div className="flex flex-col items-center justify-content-center text-gray-500 g-2
//        max-md:hidden  bg-white/10 rounded-xl p-2 ">
//             <img src={assets.logo_icon}  alt="" className="  max-w-16 " />
//             <p className="text-lg font-medium text-white "> chat anyTime , any where  </p>
//        </div>
//   ))
// }




