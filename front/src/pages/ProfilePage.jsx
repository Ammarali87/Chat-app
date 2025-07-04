import { useNavigate } from "react-router-dom";
import { useState ,useContext} from "react";
import assets from "../../public/assets";
import { AuthContext } from '../../context/AuthContext';
import toast from "react-hot-toast";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  const {authUser,updateProfile} = useContext(AuthContext)

  // Uncaught (in promise) The message port closed before a response was received.

  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, bio, selectedImg })
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      });
    navigate("/");  
  };

  return (
    <div className="flex bg-no-repeat items-center justify-center min-h-screen bg-gray-100 bg-cover text-violet-900/66 font-semibold">
      <div className="bg-gray-600 backdrop-blur-2xl text-gray-300 w-5/6 items-center justify-center flex max-sm:flex-col-reverse rounded-lg max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h2 className="text-lg">Profile Page</h2>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <img
              className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
              alt="Avatar"
            />
            <span className="underline">Choose Avatar</span>
            <input
              type="file"
              onChange={(e) => setSelectedImg(e.target.files[0])}
              accept=".png,.jpeg,.jpg"
              required
              id="avatar"
              hidden
            />
          </label>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-md text-black"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 rounded-md text-black"
          ></textarea>

          <button type="submit" className="bg-violet-900/66 text-white p-2 rounded-lg">
            Save Profile Changes
          </button>
        </form>

        <img src={assets.logo_icon} alt="Logo" className="p-4 w-32" />
      </div>
    </div>
  );
}

