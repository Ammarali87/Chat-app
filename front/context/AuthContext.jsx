import { createContext, useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

//   in front no process.env but this 
const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defalut.baseUrl = backendUrl;

export const AuthContext = createContext();

 export const AuthProvider = ({children})=>{
   
    const [token , setToken] = useState(localStorage.getItem("token"))
    const [authUser , setAuthUser] = useState(null)
    const [ onlineUsers , setOnlineUsers] = useState([])
    const [ socket, setSocket] = useState(null)

    const value = {
      axios,
      authUser,
      onlineUsers,
      socket,
      login,
      logout,
      updatProfile
    } 
   
    const updatProfile = async (body) => {
      try {
        const {data} = axios.put(`/api/auth/update-profile`,body);
        if(data.success){
          setAuthUser(data.user);
          toast.success("Profile updated successfully")
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const login = async (state,credential) => {
      try {
        const {data} = axios.post(`/api/auth/${state}`,credential)
      if(data.success){
          setAuthUser(data.userData);
          connectSocket(data.userData)
          setToken(data.token);
          axios.defaults.headers.common["token"] = data.token;
          localStorage.setItem("token", data.token)
          toast.success("Profile updated successfully")
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    
    }
    const logout = async () => {
          setAuthUser(null);
          setToken(null);
          axios.defaults.headers.common["token"] = null;
          localStorage.removeItem("token");
          setOnlineUsers([]);
          socket.disconnect();
          toast.success("Logout successfully")
        }

    const checkAuth = async()=>{
      try {
        const {date} = axios.get(`/api/auth/checkauth`)
        if (date.success) {
           setAuthUser(data.user) 
          //  setAuthUser(true)  Not true 
           connectSocket(data.user)
        }
      } catch (error) {
       toast.error(error.message)        
      }
    }

    const connectSocket = (userData)=>{
      if(!userData || socket?.connected) return ; 
      const newSocket = io(backendUrl, {
        query: {
          userId : userData._id,
        }
      })
      newSocket.connect;
      setSocket(newSocket)
      
      newSocket.on("getOnlineUsers",(userIds)=>{
       setOnlineUsers(userIds)  
      })
    }

    useEffect(()=>{
    if(token){
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth()
  }  ,[])
    return(

         <AuthContext.Provider value={value}>
            {children}
            </AuthContext.Provider>
        
        )
 }