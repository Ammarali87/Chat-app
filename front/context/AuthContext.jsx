import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

  // When making a request, add the token header:
    // const token = localStorage.getItem("token");
    // await axios.get("/api/some-endpoint", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });


    // or 

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
  

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);


   // In the login function:
      const login = async (state, credentials) => {
        try {
          setLoading(true);
          const { data } = await axios.post(`/api/auth/${state}`, credentials);
          
          if (data.success) {
            setAuthUser(data.user); // Make sure backend sends user data
            setToken(data.token);
            localStorage.setItem("token", data.token);
            axios.defaults.headers.common["token"] = data.token;
            connectSocket(data.user);
            toast.success(state === 'login' ? "Login successful" : "Signup successful");
            return true;
          } else {
            toast.error(data.message || "Authentication failed");
            return false;
          }
        } catch (error) {
          console.error("Login error:", error);
          toast.error(error?.response?.data?.message || "Authentication failed");
          return false;
        } finally {
          setLoading(false);
        }
      };


  const logout = async () => {
    try {
      setAuthUser(null);
      setToken(null);
      axios.defaults.headers.common["token"] = null;
      localStorage.removeItem("token");
      setOnlineUsers([]);
      if (socket) socket.disconnect();
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProfile = async (body) => {
    try {
      setLoading(true);
      const { data } = await axios.put('/api/auth/update-profile', body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/auth/checkauth');
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
      logout();
    }
  };

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id }
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      checkAuth();
    }
  }, [token]);

  const value = {
    authUser,
    onlineUsers,
    socket,
    loading,
    login,
    logout,
    updateProfile,
    axios // you forget this, error was Cannot read undefined (reading 'get')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};