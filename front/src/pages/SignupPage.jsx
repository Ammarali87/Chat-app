import { useState } from "react";
import assets from "../../public/assets";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDataSubmitted(true);
    console.log({ fullName, email, password, bio });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Logo */}
      <img
        src={assets.logo_icon}
        alt="logo"
        className="w-[min(30vw,250px)] cursor-pointer"
      />

      {/* Form */}
      <form
        className="border-2 border-gray-400 bg-white/8 p-6 flex flex-col shadow-lg rounded-lg gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="font-medium text-xl">Sign Up</h2>

        {!isDataSubmitted && (
          <>
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              className="p-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="Full Name"
              required
            />
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
            <textarea
              rows={4}
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter Short Bio"
              value={bio}
            />

            <div className="flex items-center text-sm text-gray-400 gap-2">
              <input type="checkbox" required />
              <p>Agree to terms of use & privacy policy</p>
            </div>

            <button
              type="submit"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </>
        )}

        {isDataSubmitted && (
          <p className="text-green-400">Sign up successful! 🎉</p>
        )}
      </form>
    </div>
  );
}
