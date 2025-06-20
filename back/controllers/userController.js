import User from "../models/User.js"  
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';  // Add this import
import cloudinary from "../config/cloudinary.js"; 
// import upload from "../middleware/upload.js"; 
 // Updated from cloudarny.js
  // in update test in postman make profile img in comment
  
  
//   كل فنكشن تريترن حاجة لازم
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};



//  add async also await to find
// add hashPassword
export const signup = async (req, res, next) => {
  const { fullName, email, password, profilePic, bio } = req.body;
  try {
    //  all day check input you get
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: " Please fill all fileds" });
    }
    //  optional can create var to findOne named user
    // if(!User.findOne({email}))
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password:hashPassword,
      profilePic,
      bio,
    }); // error  add password directly in create must add hashed
    // تذكر ._id
    const token = generateToken(newUser._id);
    //   غلط    (newUser.id)

    res
      .status(201)
      .json({
        message: "User created successfully",
        user: newUser,
        token: token,
      });
  } catch (error) {
    console.error("Error in signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


    //    in login
//   findOne need to {} findOne({})
// check email by findOne
//  check password by bcrypt.compare
 


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Remove password from response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};




 // this work good in post man 
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         const userData = await User.findOne({ email });
//         if (!userData) return res.status(400).json({ message: "Invalid email or password" });
        
//         const isCorrectPassword = await bcrypt.compare(password, userData.password);
//         if (!isCorrectPassword) return res.status(400).json({ message: "Invalid email or password" });

//         const token = generateToken(userData._id);

//         res.status(200).json({  // Changed from 201 to 200
//             message: "Login successful",
//             user: userData,  // Changed from newUser to userData
//             token: token,
//         });
//     } catch (error) {
//         console.error("Error in login", error);
//         res.status(500).json({ message: "Internal server error" });  // Added proper error handling
//     }
// };






// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const userData = await User.findOne({ email });
//     if (!userData) return res.status(400).json({ message: "error" });
   
//     const isCorrectPassword = await bcrypt.compare(password, userData.password);
//     if (!isCorrectPassword) return res.status(400).json({ message: "error" });

//     const token = generateToken(userData._id);

//     res
//       .status(201)
//       .json({
//         message: "User created successfully",
//         user: newUser,
//         token: token,
//       });
//   } catch (error) {
//     console.error("error", error);
//   }
// };

 // log user:req.user 

export const checkAuth = async (req, res) => {  // Changed from cehckAuth to checkAuth
    res.status(200).json({
        success: true,
        message: "Auth successful",
        user: req.user
    }); 
};


export const logout = (req,res)=>{
 // optional
}

  //  any stuff in try  
// export const updateProfile = async (req,res) => {
//   try {
//   const { fullName, profilePic, bio } = req.body;
//   const userId = req.user._id 
//    let updateUser;
//    if(!profilePic){
//     updateUser = await User.findByIdAndUpdate(userId,{ fullName,bio ,profilePic:upload
//     },{new:true})
   
//    }else{  // do not update the email  because i hate findone({})
//     const upload = await cloudarny.uploader.upload(profilePic);
//     updateUser = await User.findByIdAndUpdate(userId,{
//       fullName,bio ,profilePic:upload.secure_url
//     },
//       {new:true})
//    }
//  res.status(201).json({
//         status:"success",
//         message: "User created successfully",
//         user: updateUser,
//       });
//   }catch(error){
//     console.error("Error in updateProfile", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// } 

export const updateProfile = async (req, res) => {
    try {
        const { fullName, profilePic, bio } = req.body;
        const userId = req.user._id;
        
        let updateUser;
        if (!profilePic) {
            updateUser = await User.findByIdAndUpdate(
                userId,
                { 
                    fullName,
                    bio 
                },
                { new: true }
            );
        } else {
            try {
                // Upload image to cloudinary
                const uploadResult = await cloudinary.uploader.upload(profilePic, {
                    folder: "chat-app-profiles",
                });
                
                updateUser = await User.findByIdAndUpdate(
                    userId,
                    {
                        fullName,
                        bio,
                        profilePic: uploadResult.secure_url
                    },
                    { new: true }
                );
            } catch (uploadError) {
              console.log(`API KEY ` , 
  process.env.CLOUDINARY_CLOUD_NAME, 
  process.env.CLOUDINARY_API_KEY,
     process.env.CLOUDINARY_API_SECRET
                
              )
                console.error("Cloudinary upload error:", uploadError);
                return res.status(400).json({ message: "Image upload failed" });
            }
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updateUser,
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};