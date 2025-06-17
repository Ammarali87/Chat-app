// // import { useState } from "react";
// // import assets from "../../public/assets";

// // export default function LoginPage() {
// //   const [currState, setCurrState] = useState("Login");
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [bio, setBio] = useState("");
// //   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setIsDataSubmitted(true);
// //     console.log({ fullName, email, password, bio });
// //   };

// //   return (
// //     <main className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 py-8 backdrop-blur-2xl">
// //       <div className="flex flex-col sm:flex-row items-center gap-8 max-w-4xl w-full">
// //         {/* Logo */}
// //         <img
// //           src={assets.logo_icon}
// //           alt="logo"
// //           className="w-[min(30vw,250px)] cursor-pointer"
// //         />

// //         {/* Form */}
// //         <form
// //           onSubmit={handleSubmit}
// //           className="border-2 border-gray-400 bg-white/80 p-6 flex flex-col shadow-lg rounded-lg gap-6 w-full max-w-md"
// //         >
// //           <h2 className="font-medium flex justify-between items-center">
// //             {currState}
// //             <img
// //               src={assets.arrow_icon}
// //               alt="arrow"
// //               className="w-5 cursor-pointer"
// //               onClick={() =>
// //                 setCurrState(currState === "Login" ? "Sign up" : "Login")
// //               }
// //             />
// //           </h2>

// //           {currState === "Sign up" && !isDataSubmitted && (
// //             <input
// //               type="text"
// //               onChange={(e) => setFullName(e.target.value)}
// //               value={fullName}
// //               className="p-2 border border-gray-400 rounded-md focus:outline-none"
// //               placeholder="Full Name"
// //               required
// //             />
// //           )}

// //           {!isDataSubmitted && (
// //             <>
// //               <input
// //                 type="email"
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 value={email}
// //                 className="p-2 border border-gray-400 rounded-md focus:outline-none"
// //                 placeholder="Email Address"
// //                 required
// //               />
// //               <input
// //                 type="password"
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 value={password}
// //                 className="p-2 border border-gray-400 rounded-md focus:outline-none"
// //                 placeholder="Password"
// //                 required
// //               />
// //             </>
// //           )}

// //           {!isDataSubmitted && currState === "Sign up" && (
// //             <textarea
// //               rows={4}
// //               className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               onChange={(e) => setBio(e.target.value)}
// //               placeholder="Enter Short Bio"
// //               value={bio}
// //             />
// //           )}

// //           <button
// //             type="submit"
// //             className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
// //           >
// //             {currState === "Sign up" ? "Sign Up" : "Login"}
// //           </button>

// //           <div className="flex items-center text-sm text-gray-600 gap-2">
// //             <input type="checkbox" />
// //             <p>Agree to terms of use & privacy policy</p>
// //           </div>

// //           <div className="text-sm text-gray-600 cursor-pointer">
// //             {currState === "Sign up" ? (
// //               <p onClick={() => setCurrState("Login")}>
// //                 Already have an account?{" "}
// //                 <span className="text-blue-500">Login here</span>
// //               </p>
// //             ) : (
// //               <p onClick={() => setCurrState("Sign up")}>
// //                 Create new account?{" "}
// //                 <span className="text-blue-500">Click here</span>
// //               </p>
// //             )}
// //           </div>
// //         </form>
// //       </div>
// //     </main>
// //   );
// // }












// import { useContext, useState } from "react";
// import assets from "../../public/assets";
// import { AuthContext } from '../../context/AuthContext';

// export default function LoginPage() {
//   const [currState, setCurrState] = useState("Login");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [bio, setBio] = useState("");
//   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

//   const { login } = useContext(AuthContext);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(currState.toLowerCase(), { 
//       fullName, 
//       email, 
//       password, 
//       bio 
//     });
//   };



//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   setIsDataSubmitted(true);
//   //   // Handle form data here
//   //   console.log({ fullName, email, password, bio });
//   //   login("Sign up"? "signup":"login",{fullName,email,bio,password})
//   // };

//   return (
//     <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
//       {/* ********* Logo ******** */}
//       <img
//         src={assets.logo_icon}
//         alt="logo"
//         className="w-[min(30vw,250px)] cursor-pointer"
//       />

//       {/* ********* Form ******** */}
//       <form
//         className="border-2 mt-11 border-gray-400 bg-white/8 p-6 flex flex-col shadow-lg rounded-lg gap-6"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="font-medium flex justify-between items-center">
//           {currState}
//           <img
//             src={assets.arrow_icon}
//             alt="arrow"
//             className="w-5 cursor-pointer"
//             onClick={() =>
//               setCurrState
//               (currState === "Login" ? "Sign up" : "Login")
//             }
//           />
//         </h2>

//         {currState === "Sign up" && !isDataSubmitted && (
//           <input
//             type="text"
//             onChange={(e) => setFullName(e.target.value)}
//             value={fullName}
//             className="p-2 border  border-gray-400 rounded-md focus:outline-none"
//             placeholder="Full Name"
//             required
//           />
//         )}

//         {!isDataSubmitted && (
//           <>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="p-2 border border-gray-400 rounded-md focus:outline-none"
//               placeholder="Email Address"
//               required
//             />
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="p-2 border border-gray-400 rounded-md focus:outline-none"
//               placeholder="Password"
//               required
//             />
//           </>
//         )}

//         {!isDataSubmitted && currState === "Sign up" && (
//           <textarea
//             rows={4}
//             className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) => setBio(e.target.value)}
//             placeholder="Enter Short Bio"
//             value={bio}
//           />
//         )}

//         <button
//           type="submit"
//           className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {currState === "Sign up" ? "Sign Up" : "Login"}
//         </button>

//         <div className="flex items-center text-sm text-gray-400 gap-2">
//           <input type="checkbox" />
//           <p>Agree to terms of use & privacy policy</p>
//         </div>

//         <div className="flex items-center text-sm text-gray-400 gap-2 cursor-pointer">
//           {currState === "Sign up" ? (
//             <p onClick={() => { setCurrState("Login") ,
//              setIsDataSubmitted(false)}}>
//               Already have an account? <span className="text-blue-400">Login here</span>
//             </p>
//           ) : (
//             <p onClick={() =>{ setCurrState("Sign up"), 
//             setIsDataSubmitted(false)}}>
//               Create new account? <span className="text-blue-400">Click here</span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }


































import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../public/assets";
import { AuthContext } from '../../context/AuthContext';
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [currState, setCurrState] = useState("Login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const navigate = useNavigate();
  const { login, authUser, loading } = useContext(AuthContext);
  
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      let credentials = {
        email,
        password
      };

      if (currState === "Sign up") {
        if (!fullName) {
          toast.error("Please enter your full name");
          return;
        }
        credentials = {
          ...credentials,
          fullName,
          bio
        };
      }

      await login(
        currState.toLowerCase() === "login" ? "login" : "signup", 
        credentials
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* ********* Logo ******** */}
      <img
        src={assets.logo_icon}
        alt="logo"
        className="w-[min(30vw,250px)] cursor-pointer"
      />

      {/* ********* Form ******** */}
      <form
        className="border-2 mt-11 border-gray-400 bg-white/8 p-6 flex flex-col shadow-lg rounded-lg gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="font-medium flex justify-between items-center">
          {currState}
          <img
            src={assets.arrow_icon}
            alt="arrow"
            className="w-5 cursor-pointer"
            onClick={() =>
              setCurrState
              (currState === "Login" ? "Sign up" : "Login")
            }
          />
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="p-2 border  border-gray-400 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="p-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="p-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="Password"
              required
            />
          </>
        )}

        {!isDataSubmitted && currState === "Sign up" && (
          <textarea
            rows={4}
            className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter Short Bio"
            value={bio}
          />
        )}

            <button
        type="submit"
        disabled={loading}
        className={`p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
      >
        {loading ? 'Please wait...' : currState === "Sign up" ? "Sign Up" : "Login"}
      </button>
        <div className="flex items-center text-sm text-gray-400 gap-2">
          <input type="checkbox" />
          <p>Agree to terms of use & privacy policy</p>
        </div>

        <div className="flex items-center text-sm text-gray-400 gap-2 cursor-pointer">
          {currState === "Sign up" ? (
            <p onClick={() => { setCurrState("Login") ,
             setIsDataSubmitted(false)}}>
              Already have an account? <span className="text-blue-400">Login here</span>
            </p>
          ) : (
            <p onClick={() =>{ setCurrState("Sign up"), 
            setIsDataSubmitted(false)}}>
              Create new account? <span className="text-blue-400">Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}



