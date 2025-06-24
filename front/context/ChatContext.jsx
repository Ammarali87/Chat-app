import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from '../context/AuthContext.jsx';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;


// Add axios interceptors here  this Cause Error in login if Forget 
      axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }
      );


export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
   
  // const [users, setUsers] = useState(userDummyData); to test add Dummy
  const [users, setUsers] = useState(null);  // null with data 
  const [selectedUsers, setSelectedUsers] = useState(null); // True or False add null
  const [messages, setMessages] = useState([]);
  const [unseenMessages, setUnseenMessages] = useState({});

  const {socket , axios} = useContext(AuthContext)
  

   //  getMessages function
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      } else {
        toast.error(data.message || "Failed to fetch messages");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch messages");
    }
  }; 


  const getUsers = async () => {
    try {
      const {data} = await axios.get(`/api/messages/users`)
      if (data.success) {
        setUsers(data.users)
        setUnseenMessages(data.unseenMessages)
      }   
    } catch (error) {
      toast.error(error.message)
    }
  }
        // Must add await with axios and async 
        // if post add else toat.error
        // from backend setMessages(data.newMessage) but add prevmessages
  const sendMessage = async (messagesData) => {
    try {
      const {data} = await axios.post(`/api/messages/send/${selectedUsers._id}`,messagesData)
      if (data.success) {
        setMessages((prevMessages)=>[...prevMessages,data.newMessage])
      }else{
        toast.error(data.error)
      }
    } catch (error) {
       toast.error(error.message)
    }
  }



// socket.on("newMessage",(newMessage)=>{  })

  const  subscribeToMessages = async () => {
    if(!socket) return ;

    socket.on("newMessage",(newMessage)=>{
    if (selectedUsers && newMessage.senderId === selectedUsers._id) {
    newMessage.seen = true ; 
    setMessages((prevMessages)=> [...prevMessages,newMessage])
    axios.put(`/api/messages/mark/${newMessage._id}`)  
    } else {
      setUnseenMessages((prevUnseenMessages)=>({
        ...prevUnseenMessages, [ newMessage.senderId]:
        prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
       [newMessage.senderId] + 1 : 1 
      })) }
    })

  }

    // not async it's done now 
  const  unSubscribeFromMessages =  () => {
    if(socket) {
      socket.off("newMessage")
    }
  }


  useEffect(() => {
    subscribeToMessages();
    return ()=> unSubscribeFromMessages()
}, [socket,selectedUsers]);

  const value = {
    users,
    selectedUsers,
    setSelectedUsers, 
    messages,
    getMessages,
    unseenMessages,
    socket,
    sendMessage,
    unSubscribeFromMessages,
    subscribeToMessages,
    getUsers
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};



