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
        
      } catch (error) {
        toast.error(error.message)
      }
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